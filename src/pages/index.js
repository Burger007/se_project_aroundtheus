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

function renderCard(cardData, userId) {
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
  api
    .changeLikeCardStatus(cardID, like)
    .then((updatedCardData) => {
      cardInstance.setLikes(updatedCardData.isLiked);
    })
    .catch((err) => console.error(err));
}

const popupWithImage = new PopupWithImage("#popup_type_image");
popupWithImage.setEventListeners();

function openImageModal(card) {
  popupWithImage.open(card);
}

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image"
});

const addCardPopup = new PopupWithForm("#add-popup", (formData) => {
  addCardPopup.renderLoading(true);
  const cardData = {
    name: formData.title,
    link: formData.image,
  };

  api
    .addCard(cardData)
    .then((card) => {
      cardSection.addItem(renderCard(card, user._id));
      addCardPopup.close();
    })
    .catch((error) => console.log(error))
    .finally(() => addCardPopup.renderLoading(false));
});
addCardPopup.setEventListeners();

modalAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

const popupWithForm = new PopupWithForm("#profile-edit-modal", (formData) => {
  popupWithForm.renderLoading(true);
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
    .catch((err) => console.log(err))
    .finally(() => popupWithForm.renderLoading(false));
});

let cardToDelete;
let user;
const deletePopup = new PopupWithConfirmation("#delete-confirm-modal", () => {
  
  api
    .removeCard(cardToDelete.getId())
    .then(() => {
      cardToDelete.removeCard();
      console.log("Removing card");
      deletePopup.close();
    })
    .catch((err) => console.log(err))
    
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

api
  .getAppInfo()
  .then(([cards, userData]) => {
    user = userData;
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => renderCard(item, user._id),
      },
      ".cards__list",
    );

    cardSection.renderItems();

    userInfo.setUserInfo({
      name: user.name,
      job: user.about,
      avatar: user.avatar
    });
   
  })
 .catch((err) => console.error(err));

const avatarEditPopup = new PopupWithForm("#avatar-edit-modal", (formData) => {
  avatarEditPopup.renderLoading(true);
  api
    .setUserAvatar({ avatar: formData.avatar })
    .then((userData) => {
    userInfo.setUserInfo({
  name: userData.name,
  job: userData.about,
  avatar: userData.avatar
});
      avatarEditPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => avatarEditPopup.renderLoading(false));
});
avatarEditPopup.setEventListeners();

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

const avatarFormValidator = new FormValidator(
  validationConfig,
  document.forms["avatarForm"],
  selectors,
);
avatarFormValidator.enableValidation();

document
  .querySelector(".profile__avatar-edit-button")
  .addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarEditPopup.open();
  });
