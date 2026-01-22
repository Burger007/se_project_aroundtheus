export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteCard ) {
    this.name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;

     this._id = data._id;
  }

 getId() {
    return this._id;
  }


removeCard() {              
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
      
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
       
    });

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this.name,
        link: this._link,
      });
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }




  
  
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._imageElement = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");

    this._imageElement.src = this._link;
    this._imageElement.alt = this.name;
    this._titleElement.textContent = this.name;

    this._setEventListeners();

    return this._element;
  }
}
