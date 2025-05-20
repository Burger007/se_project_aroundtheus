//enabeling validity by calling enableValidation by calling enableValidation()
//pass all the settings on call

function showInputError(ormEl, inputEl, options) {
  const errorMessageEl = 
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function setEventListerners(formEl, options) {
  const { inputSelector } = options;

  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, options, inputEl);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListerners(formEl, options);
    //look for all input inside of form
    //loop thorugh all the inputs to see if all are valid
    //if input is not valid, get the valdiation message
    //add error class to input
    //display error message
    //disbale button
    //if all inputs are valind = ensable button
    //reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
