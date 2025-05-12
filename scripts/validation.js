function enableValidation(options) {
  const formElements = [...document.querySelectorAll(".modal__form")];
  //The "..." is a spread operator it expeting that
  //  whatever is next to it is an array or array like
  // object and makes a copy of it
  formElements.forEach((formElements) => {
    formElements.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // look for all inputs inside of form
    // loop through all the inputs to see if all are valid
    // if input is not valid
    // get validation message
    // add error clas to input
    // display error message
    // disable button
    // if all inputs are valid
    // enable button
    // reset error messages
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

function checkInputValidity() {
  const nameInput = document.querySelector("#profile-title-input");
  const aboutInput = document.querySelector("#profile-description-input");
  const saveButton = document.querySelector("#profile-edit-button");
}
