import { Chance } from "chance";

const chance = new Chance();
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export class Money {
  static random(range) {
    return new Money({
      dollars: chance.integer(range),
    });
  }

  static convertToString(money) {
    let totalDollars =
      money.millions * 1_000_000 +
      money.thousands * 1_000 +
      money.hundreds * 100 +
      money.dollars;

    let string = `${totalDollars}.${money.cents.toString().padStart(2, "0")}`;

    while (string.length > 0 && string[0] === "0") {
      string = string.slice(1);
    }

    return string.startsWith(".") ? "0" + string : string;
  }

  static convertToFloat(money) {
    return parseFloat(Money.convertToString(money));
  }

  constructor({
    millions = 0,
    thousands = 0,
    hundreds = 0,
    dollars = 0,
    cents = 0,
  } = {}) {
    this.millions = millions;
    this.thousands = thousands;
    this.hundreds = hundreds;
    this.dollars = dollars;
    this.cents = cents;
    this._adjust();
  }

  format() {
    return `${currencyFormatter.format(Money.convertToFloat(this))}`;
  }

  toFloat() {
    return parseFloat(Money.convertToString(this));
  }

  add(otherMoney) {
    const newMoney = new Money({
      millions: this.millions + otherMoney.millions,
      thousands: this.thousands + otherMoney.thousands,
      hundreds: this.hundreds + otherMoney.hundreds,
      dollars: this.dollars + otherMoney.dollars,
      cents: this.cents + otherMoney.cents,
    });

    return newMoney;
  }

  subtract(otherMoney) {
    const newMoney = new Money({
      millions: this.millions - otherMoney.millions,
      thousands: this.thousands - otherMoney.thousands,
      hundreds: this.hundreds - otherMoney.hundreds,
      dollars: this.dollars - otherMoney.dollars,
      cents: this.cents - otherMoney.cents,
    });

    return newMoney;
  }

  multiply(factor) {
    const totalCents = this.toCents() * factor;

    const millions = Math.floor(totalCents / 1_000_000_00);
    const thousands = Math.floor((totalCents % 1_000_000_00) / 1_000_00);
    const hundreds = Math.floor((totalCents % 1_000_00) / 10_000);
    const dollars = Math.floor((totalCents % 10_000) / 100);
    const cents = Math.floor(totalCents % 100);

    const newMoney = new Money({
      millions,
      thousands,
      hundreds,
      dollars,
      cents,
    });

    return newMoney;
  }

  divide(factor) {
    if (factor === 0) {
      throw new Error("Division by zero is not allowed.");
    }

    const totalCents = this.toCents() / factor;

    const millions = Math.floor(totalCents / 1_000_000_00);
    const thousands = Math.floor((totalCents % 1_000_000_00) / 1_000_00);
    const hundreds = Math.floor((totalCents % 1_000_00) / 10_000);
    const dollars = Math.floor((totalCents % 10_000) / 100);
    const cents = Math.floor(totalCents % 100);

    const newMoney = new Money({
      millions,
      thousands,
      hundreds,
      dollars,
      cents,
    });

    return newMoney;
  }

  greaterThanOrEqual(otherMoney) {
    if (this.millions !== otherMoney.millions) {
      return this.millions > otherMoney.millions;
    }
    if (this.thousands !== otherMoney.thousands) {
      return this.thousands > otherMoney.thousands;
    }
    if (this.hundreds !== otherMoney.hundreds) {
      return this.hundreds > otherMoney.hundreds;
    }
    if (this.dollars !== otherMoney.dollars) {
      return this.dollars > otherMoney.dollars;
    }
    return this.cents >= otherMoney.cents;
  }

  lessThanOrEqual(otherMoney) {
    if (this.millions !== otherMoney.millions) {
      return this.millions < otherMoney.millions;
    }
    if (this.thousands !== otherMoney.thousands) {
      return this.thousands < otherMoney.thousands;
    }
    if (this.hundreds !== otherMoney.hundreds) {
      return this.hundreds < otherMoney.hundreds;
    }
    if (this.dollars !== otherMoney.dollars) {
      return this.dollars < otherMoney.dollars;
    }
    return this.cents <= otherMoney.cents;
  }

  toCents() {
    return (
      (this.millions * 1_000_000 +
        this.thousands * 1_000 +
        this.hundreds * 100 +
        this.dollars) *
        100 +
      this.cents
    );
  }

  reward(player) {
    player.cash = player.cash.add(this);
  }

  _adjust() {
    while (this.cents < 0) {
      this.cents += 100;
      this.dollars -= 1;
    }

    this.dollars += Math.floor(this.cents / 100);
    this.cents %= 100;

    while (this.dollars < 0) {
      this.dollars += 100;
      this.hundreds -= 1;
    }

    this.hundreds += Math.floor(this.dollars / 100);
    this.dollars %= 100;

    while (this.hundreds < 0) {
      this.hundreds += 10;
      this.thousands -= 1;
    }

    this.thousands += Math.floor(this.hundreds / 10);
    this.hundreds %= 10;

    while (this.thousands < 0) {
      this.thousands += 1000;
      this.millions -= 1;
    }

    this.millions += Math.floor(this.thousands / 1000);
    this.thousands %= 1000;
  }
}
