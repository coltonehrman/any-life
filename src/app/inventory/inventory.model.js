export class Inventory {
  _items = [];

  constructor() {}

  addItem(item) {
    this._items.push(item);
  }

  getItemById = (id) => this._items.find((i) => i.id === id);

  removeItemById = (id) =>
    (this._items = this._items.filter((i) => i.id !== id));
}
