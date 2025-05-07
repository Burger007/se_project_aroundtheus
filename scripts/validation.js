const formElement = document.querySelector(".modal__form");
const formInput = formElement.querySelector(".modal__input");

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

formInput.addEventListener("input", function (evt) {
  console.log(evt.target.validity.valid);
});
