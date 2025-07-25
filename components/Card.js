class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: cardData.name,
        link: this._link,
      });
    });
  }
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._imageElement = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
  }
}
