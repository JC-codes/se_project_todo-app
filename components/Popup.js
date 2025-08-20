class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(".popup__close");
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  _isPopupOrCloseBtn = (target) => {
    return (
      target.classList.contains("popup") ||
      target.classList.contains("popup__close")
    );
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (this._isPopupOrCloseBtn(evt.target)) {
        this.close();
      }
    });
  }
}

export default Popup;
