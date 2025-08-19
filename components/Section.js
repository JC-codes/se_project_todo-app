class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const todoElement = this._renderer(item);
      if (this._container) {
        this._container.append(todoElement);
      } else {
        console.error("Container not found:", this._container);
      }
    });
  }

  addItem(item) {
    const todoElement = this._renderer(item);
    if (this._container) {
      this._container.append(todoElement);
    } else {
      console.error("Container not found:", this._container);
    }
  }
}

export default Section;
