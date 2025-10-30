import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWIthImage.js";
import PopupWithForm from "../components/PopupWithForm.js"


import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// DOM Elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");

const cardAddPopup = document.querySelector("#add-popup");
const modalAddButton = document.querySelector(".profile__add-button");
const cardAddCloseButton = document.querySelector("#card-add-close-button");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const nameInput = document.querySelector("#profile-title-input");
const jobInput = document.querySelector("#profile-description-input");

const saveAddButton = document.querySelector("#add-button");

const profileForm = document.forms["profileForm"];
const addCardFormElement = cardAddPopup.querySelector("#add-modal");
const cardListEl = document.querySelector(".cards__list");

const cardTitleInput = cardAddPopup.querySelector("#form-title-input");
const cardUrlInput = cardAddPopup.querySelector("#form-image-input");

// Image Preview Modal
const previewModal = document.querySelector("#popup_type_image");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

//close modal by pressing "ESC" btn
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// Open Modals



modalAddButton.addEventListener("click", () => {
  openModal(cardAddPopup);
});

// Close Profile Modal
function closeProfileModal() {
  closeModal(profileEditModal);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", openImageModal);

  return card.generateCard();
}



// adding New Card

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link });

  closeModal(cardAddPopup);
  addCardFormElement.reset();
  addCardFormValidator.resetValidation();
}

// Add Event Listeners

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

const popupWithImage = new PopupWithImage('#popup_type_image');

function openImageModal(card) {
  popupWithImage.open(card);
}


const popupWithForm = new PopupWithForm(
  '#profile-edit-modal',
  (formData) => {
    console.log('Form submitted', formData);
    popupWithForm.close();
  });
  popupWithForm.setEventListeners(); 

profileEditButton.addEventListener('click', () => {
 
 

  profileFormValidator.resetValidation();

  popupWithForm.open();
});

// Render Initial Cards
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(popup);
  });
});

//initial card render
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

//FormVadlidation Setpup
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();
