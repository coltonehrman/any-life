import { Chance } from "chance";

const chance = new Chance();

export class Street {
  hood = null;
  stats = {
    drugs: {
      sold: 0,
      bought: 0,
    },
  };

  constructor({ name, description, drugs, ruledBy, npcs = [] }) {
    this.name = name;
    this.description = description;
    this.drugs = drugs;
    this.ruledBy = ruledBy;
    this.npcs = npcs;

    this.npcs.forEach((n) => (n.street = this));

    this.location = {
      x: chance.integer({ min: 10, max: 90 }) + "%",
      y: chance.integer({ min: 10, max: 90 }) + "%",
    };
  }

  get href() {
    return `/game/city/hoods/${this.hood.name}/streets/${this.name}`;
  }

  buyDrugs(amount) {
    this.stats.drugs.bought += Number(amount);
  }

  sellDrugs(amount) {
    this.stats.drugs.sold += Number(amount);
  }

  setHood(hood) {
    this.hood = hood;
  }
}
