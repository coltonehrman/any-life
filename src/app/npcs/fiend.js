import { Chance } from "chance";
import { DRUG_PRICES } from "../drugs/types.js";
import { Money } from "../items/money.model.js";
import NPC from "./npc.model.js";

const chance = new Chance();

class Fiend extends NPC {
  constructor({ type, drugs }) {
    super({ type });

    const quantity = chance.integer({ min: 1, max: 10 });

    const drugType = chance.weighted(
      drugs.map((d) => d.type),
      drugs.map((d) => d.weight)
    );

    this.buyingDrugs = {
      type: drugType,
      price: Money.random(DRUG_PRICES[drugType]),
      quantity,
    };
  }
}

export default Fiend;
