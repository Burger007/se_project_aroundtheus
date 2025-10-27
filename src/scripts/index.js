import Card from "../../components/Card.js";
import FormValidator from "../../components/FormValidator.js"; // Ensure file name case matches!
import Section from "../../components/Section.js";
import PopupWithForm from "../../components/PopupWithForm.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import UserInfo from "../../components/UserInfo.js";

import { initialCards, validationConfig, selectors } from "../../utils/constants.js";

// ===== DOM lookups via selectors (centralized) =====
const cardListEl = document.querySelector(selectors.cardsContainer);
const profileEditButton = document.querySelector(selectors.profileEditButton);
const addCardButton = document.querySelector(selectors.addCardButton);

// Profile text nodes + inputs
const profileTitle = document.querySelector(selectors.profileTitle);
const profileDescription = document.querySelector(selectors.profileDescription);
const profileForm = document.querySelector(selectors.profileForm);
const profileNameInput = document.querySelector(selectors.profileNameInput);
const profileJobInput = document.querySelector(selectors.profileJobInput);

// Add-card form + inputs
const addCardForm = document.querySelector(selectors.addCardForm);
const addTitleInput = document.querySelector(selectors.addTitleInput);
const addLinkInput = document.querySelector(selectors.addLinkInput);

// ===== UserInfo instance =====
const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  jobSelector: selectors.profileDescription,
});

// ===== Image preview popup =====
const imagePreviewPopup = new PopupWithImage({
  popupSelector: selectors.imagePreviewModal,
  imageSelector: selectors.imagePreviewImg,
  captionSelector: selectors.imagePreviewCaption,
});
imagePreviewPopup.setEventListeners();

// helper passed to Card to open image
function openImageModal({ name, link }) {
  imagePreviewPopup.open({ name, link });
}

// ===== Card renderer =====
function createCard(cardData) {
  // Card signature in your project: new Card(cardData, "#card-template", openImageModal)
  const card = new Card(cardData, selectors.cardTemplate, openImageModal);
  return card.generateCard();
}

// ===== Section instance (render list) =====
// Your Section currently uses { items, renderer } in constructor and .renderItems() with no args.
// If that’s how your Section is written, this matches it:
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  selectors.cardsContainer
);
cardSection.renderItems();

// ===== Validators =====
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

// ===== Profile edit popup (form) =====
const profilePopup = new PopupWithForm({
  popupSelector: selectors.profileEditModal,
  handleFormSubmit: (values) => {
    // Make sure your inputs have name="name" and name="job" in HTML:
    // <input id="profile-title-input" name="name" ...>
    // <input id="profile-description-input" name="job" ...>
    userInfo.setUserInfo({ name: values.name, job: values.job });
  },
});
profilePopup.setEventListeners();
profilePopup.resetValidationHook(() => profileFormValidator.resetValidation());

// Pre-fill on open
profileEditButton.addEventListener("click", () => {
  const current = userInfo.getUserInfo();
  profileNameInput.value = current.name;
  profileJobInput.value = current.job;
  profilePopup.open();
});

// ===== Add-card popup (form) =====
const addCardPopup = new PopupWithForm({
  popupSelector: selectors.addCardModal,
  handleFormSubmit: (values) => {
    // Make sure your inputs have name="title" and name="link" in HTML:
    // <input id="form-title-input" name="title" ...>
    // <input id="form-image-input" name="link" ...>
    const newCardEl = createCard({ name: values.title, link: values.link });
    // Insert to the top (prepend)
    cardListEl.prepend(newCardEl);
    addCardFormValidator.resetValidation();
  },
});
addCardPopup.setEventListeners();
addCardPopup.resetValidationHook(() => addCardFormValidator.resetValidation());

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// ===== Remove legacy modal handlers =====
// - Deleted openModal/closeModal/handleEscClose
// - Deleted overlay listeners on .modal (Popup handles it)
// - Close buttons are handled by Popup.setEventListeners()