import { Mission } from "./mission.model.js";
import NPC from "../npcs/npc.model.js";
import { html } from "../../utils.js";

export class MissionFactory {
  static newDrugMission({
    drug,
    quantity,
    street,
    cashRewardPercentage,
    streetCredReward,
    npcName,
    next,
  }) {
    const mission = new Mission({
      title: `Push ${quantity}g of ${drug}`,
      thumbnail: `/public/icons/${drug}.png`,
      street,
      next,
      timeLimit: 60 * 60 * 1000, // 1 hour
    });

    const part1 = {
      description: `Collect Drugs from ${npcName} in ${street.name}.`,
      npc: new NPC({
        name: npcName,
        icon: "/public/images/mission-icon.png",
        dialog: `Here are the ${quantity}g of ${drug} for you.`,
        location: {
          street: street,
        },
      }),
      rewards: [
        {
          type: drug,
          quantity,
        },
      ],
      goTo: `/game/city/hoods/${street.hood.name}/streets/${street.name}`,
    };

    const part2 = {
      description: `Sell ${quantity}g of ${drug} on the streets.`,
      status: function () {
        return html`
          <p>Sold ${this.stats[drug]?.sold ?? 0}g / ${quantity}g of ${drug}</p>
          <p>Earned ${this.stats[drug]?.earned?.format() ?? "$0.00"}</p>
        `;
      }.bind(mission),
      progress: function () {
        return (this.stats[drug]?.sold ?? 0) / quantity;
      }.bind(mission),
      goTo: `/game/city/hoods/${street.hood.name}/streets/${street.name}`,
    };

    mission.parts = [part1, part2];

    mission.costToComplete = function () {
      const averageSalePrice = this.stats[drug].earned.divide(
        this.stats[drug].sold
      );
      const totalSales = averageSalePrice.multiply(quantity);

      return totalSales;
    }.bind(mission);

    mission.rewards = {
      cash: {
        text: `${cashRewardPercentage}%`,
        calculate: function () {
          const averageSalePrice = this.stats[drug].earned.divide(
            this.stats[drug].sold
          );
          const totalSales = averageSalePrice.multiply(quantity);
          const reward = totalSales.multiply(cashRewardPercentage / 100);

          return reward;
        }.bind(mission),
      },
      xp: 10000, // 10k
      streetCred: streetCredReward,
    };

    return mission;
  }
}
