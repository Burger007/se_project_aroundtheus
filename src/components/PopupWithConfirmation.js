import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupConfirmHandler) {
    super(popupSelector);
    this._popupConfirm = this._popupElement.querySelector("#popup-delete");
    this._popupConfirmHandler = popupConfirmHandler;
    this._popupConfirmHandler = this._popupConfirmHandler.bind(this);
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._popupConfirmHandler();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupConfirm.addEventListener("submit", this._handleSubmit);
  }
}
