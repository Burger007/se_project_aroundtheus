export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    changeLikeStatus,
    userId,
  ) {

  
    this.name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this.changeLikeStatus = changeLikeStatus;

    this._likes = data.likes || [] 
    
    this._id = data._id;
    this._userId = userId;
  }

  setLikes(isLiked) {
  this._isLiked = isLiked;
  this._likeButton.classList.toggle(
    "card__like-button_active",
    this._isLiked  
  );
}

  isLiked() {
   return this._isLiked;
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
    this.changeLikeStatus(this._id, !this.isLiked(), this);
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
    this.setLikes(this.isLiked());
    return this._element;
  }
}
