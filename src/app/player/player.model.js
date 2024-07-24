import { Chance } from "chance";
import { Money } from "../items/money.model.js";
import { NPCS } from "../npcs/types.js";
import { html } from "../../utils.js";

const chance = new Chance();

export class Player {
  createdAt = Date.now();
  inJail = false;
  npcs = [];
  missions = [];
  pushers = [];
  escorts = [];
  storyLog = [];
  family = null;
  lastActive = Date.now();
  happiness = 100;
  health = 100;
  age = 0;
  lifeSpan = 100;
  lifePoints = 0;
  lifeChoices = [];
  education = {};
  jobs = [];
  careers = [];
  contacts = [];
  items = [];
  properties = [];

  constructor({
    id,
    playerId,
    name,
    health = 100,
    cash,
    bank,
    age,
    lifeSpan,
    drugs,
    inventory,
    location,
    family,
    contacts,
    crimes,
    streetCred,
    lifePoints,
    storyLog,
    education,
  }) {
    this.id = id;
    this.playerId = playerId;
    this.name = name;
    this.health = health;
    this.cash = cash;
    this.bank = bank;
    this.age = age;
    this.lifeSpan = lifeSpan ?? this.lifeSpan;
    this.lifePoints = lifePoints;
    this.drugs = drugs;
    this.inventory = inventory;
    this.location = location;
    this.crimes = crimes;
    this.family = family;
    this.contacts = contacts;
    this.streetCred = streetCred;
    this.storyLog = storyLog;
    this.education = education;
  }

  get allConnections() {
    const family = [];

    for (const type of Object.keys(this.family)) {
      if (Array.isArray(this.family[type])) {
        for (const member of this.family[type]) {
          family.push(member);
        }
      } else if (this.family[type]) {
        family.push(this.family[type]);
      }
    }

    return family
      .concat(this.contacts)
      .concat(this.education?.kindergarden?.students ?? [])
      .concat(this.education?.kindergarden?.faculty ?? [])
      .concat(this.education?.elementary?.students ?? [])
      .concat(this.education?.elementary?.faculty ?? [])
      .concat(this.education?.middleschool?.students ?? [])
      .concat(this.education?.middleschool?.faculty ?? [])
      .concat(this.education?.highschool?.students ?? [])
      .concat(this.education?.highschool?.faculty ?? [])
      .concat(this.education?.university?.students ?? [])
      .concat(this.education?.university?.faculty ?? [])
      .concat(
        this.jobs
          .filter((j) => j.type === "Full-Time")
          .flatMap((j) => j.employees) ?? []
      );
  }

  addMission(mission) {
    this.missions.push(mission);
  }

  completeMission(mission) {
    const cost = mission.costToComplete();
    const cashReward = mission.rewards.cash.calculate();

    if (this.cash.greaterThanOrEqual(cost)) {
      this.cash = this.cash.subtract(cost);
      this.cash = this.cash.add(cashReward);

      const currentStreetCred = this.streetCred.get(mission.street) ?? 0;

      this.streetCred.set(
        mission.street,
        currentStreetCred + mission.rewards.streetCred
      );

      this.missions = this.missions.filter((m) => m !== mission);

      if (mission.next) {
        this.missions.push(mission.next);
      }

      return true;
    }

    return false;
  }

  getNPCById(id) {
    return this.npcs.find((n) => n.id === id);
  }

  addNPC(npc) {
    const currentStreetCred = Math.min(
      this.streetCred.get(this.location.street) ?? 0,
      50
    );

    if (npc.type === NPCS.FIEND) {
      npc.buyingDrugs.price = npc.buyingDrugs.price.divide(
        (100 - currentStreetCred) / 100
      );
    }

    this.npcs.push(npc);
  }

  removeNPCById(id) {
    const i = this.npcs.findIndex((n) => n.id === id);

    if (i !== -1) {
      this.npcs.splice(i, 1);
    }
  }

  goToJail() {
    this.inJail = Date.now();
  }

  hustle() {
    if (this.inJail) return false;

    return true;
  }

  sellDrugs({ npc }) {
    let result = "fail";
    let message = `You don't have enough drugs to sell.`;

    const { type, price, quantity } = npc.buyingDrugs;

    if (this.drugs.hasDrugTypeAmount(type, quantity)) {
      const totalPrice = price.multiply(quantity);

      this.cash = this.cash.add(totalPrice);
      this.drugs.removeDrugsWithQuantity(type, quantity);

      this.removeNPCById(npc.id);
      this.location.street.sellDrugs(quantity);

      result = "success";
      message = html`You successfully sold <b><u>${quantity}g</u></b> of
        <b><u>${type}</u></b> for <b><u>${totalPrice.format()}</u></b
        >!`;

      for (const mission of this.missions) {
        if (mission.didStart) {
          if (!mission.stats[type]) {
            mission.stats[type] = {
              sold: 0,
              earned: 0,
            };
          }

          mission.stats[type].sold += quantity;
          mission.stats[type].earned = mission.stats[type].earned
            ? mission.stats[type].earned.add(totalPrice)
            : totalPrice;
        }
      }
    }

    this.feedback = html`
      <div class="feedback ${result}" hx-swap-oob="outerHTML:.feedback">
        <p>${message}</p>
      </div>
    `;
  }

  hirePusher(pusherId) {
    const pusher = this.location.street.npcs.find((n) => n.id === pusherId);

    if (pusher && !pusher.worksFor) {
      pusher.worksFor = this;

      this.contacts.push({
        id: pusher.id,
        npc: pusher,
        relationship: chance.integer({ min: 0, max: 100 }),
        relation: "Pusher",
        relationType: "NPC",
      });

      this.pushers.push(pusher);
      return true;
    }
  }

  supplyPusherById(id, amount) {
    const pusher = this.pushers.find((p) => p.id === id);

    if (pusher) {
      if (this.drugs.hasDrugTypeAmount(pusher.drugType, amount)) {
        this.drugs.removeDrugsWithQuantity(pusher.drugType, amount);

        pusher.drugSupply += amount;

        return true;
      }
    }

    return false;
  }

  collectPusherById(id) {
    const pusher = this.pushers.find((p) => p.id === id);

    if (pusher) {
      this.cash = this.cash.add(pusher.earnings);
      pusher.earnings = new Money();
      pusher.lastCollected = Date.now();
    }
  }

  hireEscort(escortId) {
    const escort = this.location.street.npcs.find((n) => n.id === escortId);

    if (escort && !escort.worksFor) {
      escort.worksFor = this;

      this.contacts.push({
        id: escort.id,
        npc: escort,
        relationship: chance.integer({ min: 0, max: 100 }),
        relation: "Escort",
        relationType: "NPC",
      });

      this.escorts.push(escort);
      return true;
    }
  }

  collectEscortById(id) {
    const escort = this.escorts.find((p) => p.id === id);

    if (escort) {
      this.cash = this.cash.add(escort.earnings);
      escort.earnings = new Money();
      escort.lastCollected = Date.now();
    }
  }

  updateCollections() {
    for (const pusher of this.pushers) {
      if (pusher.drugSupply) {
        const timeElapsedMs = Date.now() - pusher.lastEarningsCalculated;
        const timeElapsedMinutes = timeElapsedMs / (1000 * 60);
        const wholeMinutesTimeElapsed = Math.floor(timeElapsedMinutes);

        if (wholeMinutesTimeElapsed > 0) {
          const totalDrugsSold = Math.min(
            pusher.drugSupply,
            pusher.drugsPerMinute * wholeMinutesTimeElapsed
          );

          const additionalEarnings = pusher.drugPrice.multiply(totalDrugsSold);

          pusher.drugSupply -= totalDrugsSold;

          pusher.lastEarningsCalculated +=
            wholeMinutesTimeElapsed * (1000 * 60);

          pusher.earnings = pusher.earnings.add(additionalEarnings);
        }
      }
    }

    for (const escort of this.escorts) {
      const timeElapsedMs = Date.now() - escort.lastEarningsCalculated;
      const timeElapsedHours = timeElapsedMs / (1000 * 60 * 60);
      const wholeHoursTimeElapsed = Math.floor(timeElapsedHours);

      if (wholeHoursTimeElapsed > 0) {
        const additionalEarnings = escort.earningsPerHour.multiply(
          wholeHoursTimeElapsed
        );

        escort.lastEarningsCalculated +=
          wholeHoursTimeElapsed * (1000 * 60 * 60);
        escort.earnings = escort.earnings.add(additionalEarnings);
      }
    }
  }

  findFamilyMemberById(id) {
    for (const type of Object.keys(this.family)) {
      if (Array.isArray(this.family[type])) {
        for (const member of this.family[type]) {
          if (member.id === id) return member;
        }
      } else if (this.family[type]) {
        if (this.family[type].id === id) return this.family[type];
      }
    }

    return null;
  }
}
