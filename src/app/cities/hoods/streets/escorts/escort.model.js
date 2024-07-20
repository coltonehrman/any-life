import { Chance } from "chance";
import { Money } from "../../../../items/money.model.js";
import NPC from "../../../../npcs/npc.model.js";

const chance = new Chance();

export class Escort extends NPC {
  earnings = new Money();
  earningsPerHour = new Money({
    dollars: 100,
  });
  lastEarningsCalculated = Date.now();
  lastCollected = Date.now();
  worksFor = null;
  street = null;
  clients = 0;
  image = `/public/images/escort-${chance.integer({ min: 1, max: 4 })}.png`;

  constructor({ name = chance.name({ gender: "female" }), street } = {}) {
    super({ name });
    this.street = street;
  }
}
