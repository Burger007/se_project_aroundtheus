export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const selectors = {
  cardTemplate: "#card-template",
  cardsContainer: ".cards__list",

  profileEditButton: "#profile-edit-button",
  profileEditModal: "#profile-edit-modal",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  profileForm: "form[name='profileForm']",
  profileNameInput: "#profile-title-input",
  profileJobInput: "#profile-description-input",

  addCardButton: ".profile__add-button",
  addCardModal: "#add-popup",
  addCardForm: "#add-modal",
  addTitleInput: "#form-title-input",
  addLinkInput: "#form-image-input",

  imagePreviewModal: "#popup_type_image",
  imagePreviewImg: ".modal__image",
  imagePreviewCaption: ".modal__caption",

  closeButtons: ".modal__close",
  modals: ".modal",
};
