import Chance from "chance";
import { Crime } from "./crime.model.js";
import { Money } from "../items/money.model.js";

const chance = new Chance();

const Burglary = new Crime({
  key: "Burglary",
  thumbnail: "/public/images/robbery.jpg",
  interval: 5 * 60 * 1000, // 10 minutes
  chance: 25,
  streetCred: 25,
  rewards: [
    Money.random({
      min: 10,
      max: 1000,
    }),
  ],
});

const Mug = new Crime({
  key: "Mug",
  thumbnail: "/public/images/mugging.jpg",
  interval: 2.5 * 60 * 1000, // 2.5 minutes
  chance: 35,
  streetCred: 10,
  rewards: [
    Money.random({
      min: 5,
      max: 500,
    }),
  ],
});

const Heist = new Crime({
  key: "Heist",
  thumbnail: "/public/images/heist.jpg",
  interval: 1 * 60 * 60 * 1000, // 1 hour
  chance: 5,
  streetCred: 100,
  rewards: [
    Money.random({
      min: 5000,
      max: 10000,
    }),
  ],
});

export class CrimeController {
  static CRIME_INTERVAL = 60 * 1000; // 1 minute

  static CRIMES = {
    [Burglary.key]: Burglary,
    [Mug.key]: Mug,
    [Heist.key]: Heist,
    Smuggle: {
      thumbnail: "/public/images/robbery.jpg",
      chance: 50,
      streetCred: 50,
      rewards: [[10, 100]],
    },
    Espionage: {
      thumbnail: "/public/images/robbery.jpg",
      chance: 50,
      streetCred: 50,
      rewards: [[10, 100]],
    },
    "Crack Safe": {
      thumbnail: "/public/images/robbery.jpg",
      chance: 50,
      streetCred: 50,
      rewards: [[10, 100]],
    },
    "Cyber Crime": {
      thumbnail: "/public/images/robbery.jpg",
      chance: 50,
      streetCred: 50,
      rewards: [[10, 100]],
    },
    Blackmail: {
      thumbnail: "/public/images/robbery.jpg",
      chance: 50,
      streetCred: 50,
      rewards: [[10, 100]],
    },
    "Kidnap for Ransom": {
      thumbnail: "/public/images/robbery.jpg",
      chance: 50,
      streetCred: 50,
      rewards: [[10, 100]],
    },
  };

  constructor() {}

  commitCrime(player, crime) {
    if (!CrimeController.CRIMES.hasOwnProperty(crime))
      return "That is not a crime.";

    let message;

    const controller = CrimeController.CRIMES[crime];

    if (!controller.commit) {
      const since = Date.now() - player.crimes[crime].last;

      if (since && since < CrimeController.CRIME_INTERVAL) {
        return "You have to wait before committing this crime again.";
      }

      message = `You failed to commit ${crime}`;

      if (chance.bool({ likelihood: controller.chance })) {
        const reward = Money.random({
          min: controller.rewards[0][0],
          max: controller.rewards[0][1],
        });

        player.cash = player.cash.add(reward);
        message = `You successfully committed ${crime} and gained ${reward.format()}.`;
      }

      player.crimes[crime].committed++;
      player.crimes[crime].last = Date.now();
    } else {
      message = controller.commit(player);
    }

    return message;
  }
}
