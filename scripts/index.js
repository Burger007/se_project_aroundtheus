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

//DOM
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeButton = document.querySelector(".modal__close");
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

const profileFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = cardAddPopup.querySelector("#add-modal");
const cardListEl = document.querySelector(".cards__list");

const cardTitleInput = cardAddPopup.querySelector("#form-title-input");
const cardUrlInput = cardAddPopup.querySelector("#form-image-input");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Use the functions to open modals
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

modalAddButton.addEventListener("click", () => {
  openModal(cardAddPopup);
});

function closeProfileModal() {
  closeModal(profileEditModal);
}

cardAddCloseButton.addEventListener("click", () => {
  closeModal(cardAddPopup);
});

closeButton.addEventListener("click", closeProfileModal);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeBtutton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  //add click lisinter to the cardEmange element
  //open modal with previewImageModal

  likeBtutton.addEventListener("click", () => {
    likeBtutton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.addEventListener("click", () =>
    openImageModal(cardData.link, cardData.name)
  );
  return cardElement;
}

//Event Handler
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeProfileModal(profileEditButton);
}

//Form Listner
function renderCard(data) {
  const cardElement = getCardElement(data);
  cardListEl.prepend(cardElement);
}
function handlAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });

  closeModal(cardAddPopup);
}

//edit profile listiner
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

console.log(addCardFormElement);
//Form listner
addCardFormElement.addEventListener("submit", handlAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

const previewModal = document.querySelector("#popup_type_image");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

function openImageModal(imageSrc, caption) {
  previewModalImage.src = imageSrc;
  previewModalImage.alt = caption;
  previewModalCaption.textContent = caption;

  openModal(previewModal);
}

//open Modal Iamgage

function openModal(modal) {
  modal.classList.add("modal_opened");
}

//close Moal
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => {
    console.log("Close button clicked");
    closeModal(previewModal);
  });
});
