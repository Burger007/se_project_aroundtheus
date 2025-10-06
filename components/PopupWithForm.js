//The popupWithForm class is a child class of the popup class
import Popup from "./Popup.js";
class popupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

//index.js

//const newCardPopup = new popupWithForm("#add-popup", () => {});
//newCardPopup.open()

//newCardPopup.close();
