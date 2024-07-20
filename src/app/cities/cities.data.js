import { Chance } from "chance";
import { City } from "./city.model.js";
import { DRUGS } from "../drugs/types.js";
import { Escort } from "./hoods/streets/escorts/escort.model.js";
import { Hood } from "./hoods/hood.model.js";
import { Pusher } from "./hoods/streets/pushers/pusher.model.js";
import { Street } from "./hoods/streets/street.model.js";
import { firstStreetGang } from "../gangs/gangs.js";

const chance = new Chance();

export const hoods = [
  new Hood({
    name: "Downtown",
    description:
      "The bustling business district with high-rise buildings, upscale shops, and hidden alleys.",
    mapImage: "/public/hoods/downtown.jpg",
    streets: [
      new Street({
        name: "Wall Street",
        description:
          "The financial heart of Hustleton, filled with bankers and traders. High-risk, high-reward drug deals.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.COCAINE,
            chance: 50,
            weight: 0.5,
          },
          {
            type: DRUGS.LSD,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.HEROIN,
            chance: 10,
            weight: 0.1,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
      new Street({
        name: "Elm Avenue",
        description:
          "A blend of old and new, with trendy cafes and historic buildings. Mid-range transactions with professionals.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 40,
            weight: 0.4,
          },
          {
            type: DRUGS.COCAINE,
            chance: 30,
            weight: 0.3,
          },
          {
            type: DRUGS.LSD,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.HEROIN,
            chance: 10,
            weight: 0.1,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
      new Street({
        name: "Back Alley Row",
        description:
          "Hidden behind the glitz, a series of dark alleys where discreet deals take place. Lower visibility, higher danger.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 10,
            weight: 0.1,
          },
          {
            type: DRUGS.COCAINE,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.LSD,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.HEROIN,
            chance: 50,
            weight: 0.5,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
    ],
  }),
  new Hood({
    name: "Southside",
    description:
      "A diverse, working-class area with a mix of residential blocks and industrial zones.",
    mapImage: "/public/hoods/southside.jpg",
    streets: [
      new Street({
        name: "Iron Street",
        description:
          "Dominated by factories and warehouses. Deals with laborers and blue-collar workers.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 30,
            weight: 0.3,
          },
          {
            type: DRUGS.COCAINE,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.LSD,
            chance: 10,
            weight: 0.1,
          },
          {
            type: DRUGS.HEROIN,
            chance: 40,
            weight: 0.4,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
      new Street({
        name: "Union Boulevard",
        description:
          "A busy thoroughfare with local shops and community centers. Steady, lower-risk deals.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 50,
            weight: 0.5,
          },
          {
            type: DRUGS.COCAINE,
            chance: 10,
            weight: 0.1,
          },
          {
            type: DRUGS.LSD,
            chance: 30,
            weight: 0.3,
          },
          {
            type: DRUGS.HEROIN,
            chance: 10,
            weight: 0.1,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
      new Street({
        name: "Riverside Lane",
        description:
          "Near the docks, known for smuggling operations and rough clientele. High-risk, potentially lucrative deals.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.COCAINE,
            chance: 30,
            weight: 0.3,
          },
          {
            type: DRUGS.LSD,
            chance: 10,
            weight: 0.1,
          },
          {
            type: DRUGS.HEROIN,
            chance: 40,
            weight: 0.4,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
    ],
  }),
  new Hood({
    name: "Westend",
    description:
      "A hip, artistic neighborhood with a mix of creatives and bohemian lifestyle.",
    mapImage: "/public/hoods/westend.jpg",
    streets: [
      new Street({
        name: "Maple Drive",
        description:
          "Tree-lined street with boutique shops and art galleries. Deals with artists and tourists.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 60,
            weight: 0.6,
          },
          {
            type: DRUGS.COCAINE,
            chance: 10,
            weight: 0.1,
          },
          {
            type: DRUGS.LSD,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.HEROIN,
            chance: 10,
            weight: 0.1,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
      new Street({
        name: "Ivy Street",
        description:
          "Known for its nightlife, with clubs and bars. Deals with club-goers and night owls.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 30,
            weight: 0.3,
          },
          {
            type: DRUGS.COCAINE,
            chance: 40,
            weight: 0.4,
          },
          {
            type: DRUGS.LSD,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.HEROIN,
            chance: 10,
            weight: 0.1,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
      new Street({
        name: "The Junction",
        description:
          "A convergence of different cultures and activities, from street performers to open-air markets. Varied, unpredictable deals.",
        drugs: [
          {
            type: DRUGS.WEED,
            chance: 40,
            weight: 0.4,
          },
          {
            type: DRUGS.COCAINE,
            chance: 20,
            weight: 0.2,
          },
          {
            type: DRUGS.LSD,
            chance: 30,
            weight: 0.3,
          },
          {
            type: DRUGS.HEROIN,
            chance: 10,
            weight: 0.1,
          },
        ],
        npcs: [
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Pusher({
            drugType: chance.pickone(Object.values(DRUGS)),
          }),
          new Escort(),
          new Escort(),
          new Escort(),
        ],
        ruledBy: firstStreetGang,
      }),
    ],
  }),
];

export const cities = [
  new City({
    name: "Houston",
    hoods: hoods,
  }),
];

export const getStreet = (name) =>
  cities
    .find((c) => c.hoods.find((h) => h.streets.find((s) => s.name === name)))
    .hoods.find((h) => h.streets.find((s) => s.name === name))
    .streets.find((s) => s.name === name);
export const getHood = (name) =>
  cities
    .find((c) => c.hoods.find((h) => h.name === name))
    .hoods.find((h) => h.name === name);
export const getCity = (name) => cities.find((c) => c.name === name);
