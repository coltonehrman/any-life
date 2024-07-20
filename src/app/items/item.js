import { Chance } from "chance";

const chance = new Chance();

class Item {
  constructor({ name, value, type }) {
    this.name = name;
    this.value = value;

    if (value.min && value.max) {
      this.value = chance.integer({ min: value.min, max: value.max });
    }

    this.type = type;
  }

  reward(player) {
    player.inventory.addItem(this);
  }
}

export default Item;
