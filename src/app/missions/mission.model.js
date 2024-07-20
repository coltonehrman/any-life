export class Mission {
  id = crypto.randomUUID();
  stats = {};
  parts = [];
  failed = false;

  constructor({ title, thumbnail, street, next, timeLimit }) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.street = street;
    this.progress = 0;
    this.next = next;
    this.startedAt = null;
    this.timeLimit = timeLimit;
  }

  get didStart() {
    return this.startedAt !== null;
  }

  get isExpired() {
    if (!this.didStart) return false;
    return Date.now() > this.startedAt + this.timeLimit;
  }

  get progressPercent() {
    const partsProgress = this.progress / this.parts.length;
    let currentPartProgress = 0;

    if (this.parts[this.progress].progress) {
      currentPartProgress =
        this.parts[this.progress].progress() / this.parts.length;
    }

    return (partsProgress + currentPartProgress) * 100;
  }

  get currentNPC() {
    const part = this.parts[this.progress];
    return part && part.npc;
  }

  start() {
    this.startedAt = Date.now();
  }

  completePart(player) {
    const partRewards = this.parts[this.progress].rewards;

    for (const reward of partRewards) {
      player.drugs.addDrugWithQuantity(reward.type, reward.quantity);
    }

    if (!this.didStart) {
      this.start();
    }

    this.progress++;
  }
}
