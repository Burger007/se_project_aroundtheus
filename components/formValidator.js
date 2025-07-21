class formValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitSelector = settings.submitSelector;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl, errorMessage) {
    const errorElement = this._form.querySelector("#" + inputEl.id + `-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorElement = this._form.querySelector("#" + inputEl.id + `-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    const hasInvalidInput = this.inputEls.some(
      (input) => !input.validity.valid
    );
    if (hasInvalidInput) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.classList.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.classList.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListerners(formEl, options);
  }
}
const editFormValidator = new FormValidator();
editFormValidator.enableValidation();
