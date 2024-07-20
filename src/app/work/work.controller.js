import Chance from "chance";
import { Money } from "../items/money.model.js";

const chance = new Chance();

export class WorkController {
  static WORK_INTERVAL = 60 * 1000; // 1 minute

  static JOBS = {
    "Pan Handle": {
      chance: 90,
      streetCred: 1,
      rewards: [[1, 10]],
    },
    Beg: {
      chance: 75,
      streetCred: 0,
      rewards: [[10, 25]],
    },
    "Dumpster Dive": {
      chance: 65,
      streetCred: 0,
      rewards: [[10, 25]],
    },
  };

  constructor() {}

  doJob(player, job) {
    if (!WorkController.JOBS.hasOwnProperty(job)) return "That is not a job.";

    const since = Date.now() - player.jobs[job].last;

    if (since && since < WorkController.WORK_INTERVAL) {
      return "You have to wait before doing this job again.";
    }

    let message;

    if (chance.bool({ likelihood: WorkController.JOBS[job].chance })) {
      const reward = Money.random({
        min: WorkController.JOBS[job].rewards[0][0],
        max: WorkController.JOBS[job].rewards[0][1],
      });

      player.cash = player.cash.add(reward);
      message = `You successfully worked ${job} and gained ${reward.format()}.`;
    } else {
      message = `You failed at ${job}.`;
    }

    player.jobs[job].worked++;
    player.jobs[job].last = Date.now();

    return message;
  }
}
