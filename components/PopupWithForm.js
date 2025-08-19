import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSelector }) {
    super({ popupSelector });
    this._handleForm = document.querySelector(handleFormSelector);
  }
}

export default PopupWithForm;
