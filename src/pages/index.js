import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import { validationConfig, selectors } from "../utils/Constants.js";

import "../pages/index.css";

// DOM Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const cardAddPopup = document.querySelector("#add-popup");
const modalAddButton = document.querySelector("#add-card-button");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input",
);

const profileForm = document.forms["profileForm"];
const addCardFormElement = cardAddPopup.querySelector("#add-modal");

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    openImageModal,
    handleDeleteCard,
    changeLikeStatus,
    userId,
  );

  return card.generateCard();
}

function changeLikeStatus(cardID, like, cardInstance) {
  return api.changeLikeCardStatus(cardID, like).then((updatedCardData) => {
    if (cardInstance) {
      cardInstance.setLikes(updatedCardData.likes);
    }
  });
}

const popupWithImage = new PopupWithImage("#popup_type_image");
popupWithImage.setEventListeners();

function openImageModal(card) {
  popupWithImage.open(card);
}

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const popupWithForm = new PopupWithForm("#profile-edit-modal", (formData) => {
  api
    .setUserInfo({
      name: formData.title,
      about: formData.description,
    })
    .then((user) => {
      userInfo.setUserInfo({
        name: user.name,
        job: user.about,
      });

      popupWithForm.close();
    })
    .catch((err) => console.log(err));
});

let cardToDelete;
const deletePopup = new PopupWithConfirmation("#delete-confirm-modal", () => {
  api
    .removeCard(cardToDelete.getId())
    .then(() => {
      cardToDelete.removeCard();
      console.log("Removing card");
      deletePopup.close();
    })
    .catch((err) => console.log(err));
});
deletePopup.setEventListeners();

function handleDeleteCard(card) {
  cardToDelete = card;
  deletePopup.open();
}

popupWithForm.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;

  profileFormValidator.resetValidation();
  popupWithForm.open();
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "1b0a9c48-0195-4c7c-8c0d-f5778470ca43",
    "Content-Type": "application/json",
  },
});

// card render
let cardSection;
let userId;

api
  .getAppInfo()
  .then(([cards, user]) => {
    userId = user._id;

    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => renderCard(item),
      },
      ".cards__list",
    );

    cardSection.renderItems();

    // Move the addCardPopup setup HERE:
    const addCardPopup = new PopupWithForm("#add-popup", (formData) => {
      const cardData = {
        name: formData.title,
        link: formData.image,
      };

      api
        .addCard(cardData)
        .then((card) => {
          cardSection.addItem(renderCard(card));
        })
        .catch((error) => console.log(error));

      addCardPopup.close();
    });
    addCardPopup.setEventListeners();

    modalAddButton.addEventListener("click", () => {
      addCardFormValidator.resetValidation();
      addCardPopup.open();
    });

    userInfo.setUserInfo({
      name: user.name,
      job: user.about,
    });
  })
  .catch(console.error);

//FormVadlidation Setpup
const profileFormValidator = new FormValidator(
  validationConfig,
  profileForm,
  selectors,
);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationConfig,
  addCardFormElement,
  selectors,
);
addCardFormValidator.enableValidation();