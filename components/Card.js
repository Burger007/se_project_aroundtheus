class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // ...
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
}
