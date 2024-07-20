import { Chance } from "chance";

const chance = new Chance();

export class City {
  constructor({ name, hoods }) {
    this.name = name;
    this.hoods = hoods;

    this.location = {
      x: chance.integer({ min: 10, max: 90 }) + "%",
      y: chance.integer({ min: 10, max: 90 }) + "%",
    };
  }
}
