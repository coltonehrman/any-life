import { Chance } from "chance";

const chance = new Chance();

export class Crime {
  constructor({ key, thumbnail, interval, chance, streetCred, rewards }) {
    this.key = key;
    this.thumbnail = thumbnail;
    this.interval = interval;
    this.chance = chance;
    this.streetCred = streetCred;
    this.rewards = rewards;
  }

  commit(player) {
    const since = Date.now() - player.crimes[this.key].last;

    if (since && since < this.interval) {
      return "You have to wait before committing this crime again.";
    }

    let message = `You failed to commit ${this.key}.`;

    if (chance.bool({ likelihood: this.chance })) {
      const reward = chance.pickone(this.rewards);

      reward.reward(player);

      let messagePrefix = reward.name
        ? `a ${reward.name}`
        : `${reward.format()}`;

      message = `You successfully committed ${this.key} and recieved ${messagePrefix}.`;
    }

    player.crimes[this.key].committed++;
    player.crimes[this.key].last = Date.now();

    return message;
  }
}
