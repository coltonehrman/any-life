import { Chance } from "chance";

const chance = new Chance();

export class Hood {
  constructor({ name, description, mapImage, streets }) {
    this.name = name;
    this.description = description;
    this.mapImage = mapImage;
    this.streets = streets;

    this.location = {
      x: chance.integer({ min: 10, max: 90 }) + "%",
      y: chance.integer({ min: 10, max: 90 }) + "%",
    };

    for (const street of this.streets) {
      street.setHood(this);
    }
  }
}
