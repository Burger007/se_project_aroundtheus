import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWIthImage.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import { initialCards, validationConfig, selectors } from "../utils/Constants.js";

import "../pages/index.css";




// DOM Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const cardAddPopup = document.querySelector('#add-popup');
const modalAddButton = document.querySelector("#add-card-button");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileForm = document.forms["profileForm"];
const addCardFormElement = cardAddPopup.querySelector("#add-modal");




 


function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", openImageModal);

  return card.generateCard();
}


const popupWithImage = new PopupWithImage('#popup_type_image');
popupWithImage.setEventListeners();

function openImageModal(card) {
  popupWithImage.open(card);
}


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector:'.profile__description'
});


const addCardPopup = new PopupWithForm(
  '#add-popup',
  (formData) => {
    const newCard = renderCard({
      name: formData.title,
      link: formData.image
    });
    cardSection.addItem(newCard);
    addCardPopup.close();
  });
addCardPopup.setEventListeners();


modalAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});







  const popupWithForm = new PopupWithForm(
  '#profile-edit-modal',
  (formData) => {
    
    userInfo.setUserInfo({
      name: formData.title,
      job: formData.description
    });
    
    popupWithForm.close();
  });
  
  popupWithForm.setEventListeners(); 

  profileEditButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;

  profileFormValidator.resetValidation();
  popupWithForm.open();
});
 
 
const api = new Api ({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers:{
    authorization:"1b0a9c48-0195-4c7c-8c0d-f5778470ca43",
    "Content-Type":"application/json"
  }
  
})

//initial card render
let cardSection;

api.getCardList()

  .then((cards) => {
    

     cardSection = new Section(
      
      {
        items: cards,
        renderer: (item) => renderCard(item),
        
      },
      ".cards__list"
    );

    cardSection.renderItems();
    
  })
  .catch(console.error);
  
  









//FormVadlidation Setpup
const profileFormValidator = new FormValidator(validationConfig, profileForm, selectors);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement, selectors);
addCardFormValidator.enableValidation();
