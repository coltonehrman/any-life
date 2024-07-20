import { DRUGS, DRUG_PRICES } from "../../../../drugs/types.js";

import { Chance } from "chance";
import { Money } from "../../../../items/money.model.js";
import NPC from "../../../../npcs/npc.model.js";

const chance = new Chance();

export class Pusher extends NPC {
  drugSupply = 0;
  drugsPerMinute = 1;
  drugType = null;
  drugPrice = null;
  playerNegotiatedPrices = new WeakMap();
  earnings = new Money();
  worksFor = null;
  lastCollected = Date.now();
  lastEarningsCalculated = Date.now();
  street = null;

  constructor({ name = chance.name(), drugType, street }) {
    super({ name });

    this.drugType =
      drugType ||
      chance.pickone([DRUGS.WEED, DRUGS.COCAINE, DRUGS.HEROIN, DRUGS.LSD]);

    this.drugPrice = new Money({
      dollars: DRUG_PRICES[this.drugType].max,
    });

    this.street = street;
  }

  negotiate(player, offer) {
    if (this.playerNegotiatedPrices.has(player)) {
      return;
    }

    let newPrice = this.drugPrice;

    if (chance.bool({ likelihood: 50 })) {
      newPrice = offer;
    }

    this.playerNegotiatedPrices.set(player, newPrice);

    return newPrice !== this.drugPrice;
  }
}
