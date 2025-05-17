function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(options.formSelector)];
  console.log(inputEls);
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEls) => {
    formEls.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(addCardFormElement, options);
    //look for a;; input inside of form
    //loop thorugh all the inputs to see if all are valid
    //if input is not valid, get the valdiation message
    //add error calss to input
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
