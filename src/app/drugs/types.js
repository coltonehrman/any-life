import { Chance } from "chance";

const chance = new Chance();

export const DRUGS = {
  WEED: "WEED",
  COCAINE: "COCAINE",
  LSD: "LSD",
  HEROIN: "HEROIN",
};

export const DRUG_PRICES = {
  [DRUGS.WEED]: { min: 100, max: 150 },
  [DRUGS.COCAINE]: { min: 700, max: 900 },
  [DRUGS.LSD]: { min: 300, max: 400 },
  [DRUGS.HEROIN]: { min: 500, max: 700 },
};
