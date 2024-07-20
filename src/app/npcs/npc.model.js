import { Chance } from "chance";
import { Money } from "../items/money.model.js";

const chance = new Chance();

class NPC {
  id = crypto.randomUUID();

  looks = chance.integer({ min: 0, max: 100 });
  smarts = chance.integer({ min: 0, max: 100 });
  grades = chance.integer({ min: 0, max: 100 });
  popularity = chance.integer({ min: 0, max: 100 });
  craziness = chance.integer({ min: 0, max: 100 });
  relationship = chance.integer({ min: 0, max: 100 });
  gender = chance.gender();
  age = chance.integer({ min: 0, max: 100 });
  profession = chance.profession({ rank: true });

  mood = chance.pickone([
    "Happy",
    "Sad",
    "Angry",
    "Excited",
    "Bored",
    "Nervous",
    "Confident",
    "Relaxed",
    "Jealous",
    "Grateful",
    "Lonely",
    "Scared",
    "Curious",
    "Surprised",
    "Guilty",
  ]);

  actions = {
    ASK_OUT: false,
    BEFRIEND: true,
    COMPLIMENT: true,
    CONVERSATION: true,
    FLIRT: true,
    SPEND_TIME: true,
    MOVIE_THEATRE: true,
    WATCH_YOUTUBE: true,
    CONCERT: true,
    PARTY: true,
    FIGHT: true,
    MURDER: true,
    ROB: true,
    DISRESPECT: true,
    PRANK: true,
    RUMOR: true,
    GIFT: true,
    INSULT: true,
    MESS: true,
    SPY: true,
    SELL_DRUGS: false,
  };

  parents = [];
  siblings = [];
  children = [];
  spouse = null;

  health = 100;
  cash = Money.random({ min: 0, max: 100 });
  conversations = new WeakMap();
  robbed = false;
  negotiated = false;

  constructor({
    gender,
    name,
    age,
    relation,
    profession,
    icon,
    type,
    dialog,
    location = {},
  } = {}) {
    this.gender = gender ?? this.gender;
    this.name = name ?? chance.name({ gender: this.gender });
    this.relation = relation;
    this.age = age ?? this.age;
    this.profession = profession ?? this.profession;
    this.icon = icon;
    this.type = type;
    this.dialog = dialog;

    this.location = {
      x: chance.integer({ min: 1, max: 85 }) + "%",
      y: chance.integer({ min: 18, max: 72 }) + "%",
      ...location,
    };
  }

  addSpouse(spouse) {
    if (this.gender === "Male") {
      spouse.name = spouse.name.split(" ")[0] + " " + this.name.split(" ")[1];
    }

    if (spouse.gender === "Male") {
      this.name = this.name.split(" ")[0] + " " + spouse.name.split(" ")[1];
    }

    this.spouse = spouse;
    spouse.spouse = this;
  }

  addChild(child) {
    const lastName = this.name.split(" ")[1];
    child.name = `${child.name.split(" ")[0]} ${lastName}`;

    this.children.push(child);
    child.parents.push(this);

    if (this.spouse) {
      child.parents.push(this.spouse);
      this.spouse.children.push(child);
    }

    this.children.forEach((sibling) => {
      if (sibling !== child) {
        sibling.siblings.push(child);
        child.siblings.push(sibling);
      }
    });
  }
}

export default NPC;
