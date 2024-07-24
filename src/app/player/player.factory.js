import {
  getAuntsUncles,
  getCousins,
  getGrandparents,
} from "../life/utils/utils.js";

import { Chance } from "chance";
import { CrimeController } from "../crimes/crime.controller.js";
import { Drugs } from "../drugs/drugs.model.js";
import { Inventory } from "../inventory/inventory.model.js";
import { Money } from "../items/money.model.js";
import { Player } from "./player.model.js";
import { cities } from "../cities/cities.data.js";
import { generateFamilyTree } from "../life/utils/generate-family-tree.js";
import { generateStarterMissions } from "../missions/missions/starter.mission.js";
import { savePlayer } from "../../db/utils.js";

const chance = new Chance();

export class PlayerFactory {
  static new({ playerId } = {}) {
    const streetCred = new Map();

    streetCred.set(cities[0].hoods[2].streets[0], 2);

    const me = generateFamilyTree();

    const player = new Player({
      id: me.id,
      playerId: playerId,
      name: me.name,
      gender: me.gender,
      storyLog: [
        chance.pickone([
          "You were born with a literal silver spoon in your mouth. The doctors are still scratching their heads, but your parents are convinced you’re destined for culinary greatness.",
          "You were born in the back of a taxi during rush hour. The driver now tells the story to every passenger, claiming he delivered 'the future CEO of a ride-sharing empire.'",
          "Minutes after your birth, aliens appeared and abducted you for a quick intergalactic check-up. They returned you safely but left a mysterious glowing mark on your forehead. Your parents are convinced you're destined for greatness beyond Earth.",
          "You were born right in the middle of the annual Cheese Festival, surrounded by mountains of cheddar and rivers of fondue. As your mother went into labor, the local cheese mascot, a giant dancing wheel of brie, rushed over to assist. The festival organizers declared you the 'Cheese Champion' and presented you with a lifetime supply of cheese. Your parents now fondly call you 'Little Gouda' and are convinced you'll grow up with a refined palate and a future in the gourmet food industry.",
          "Your birth took place thousands of feet above ground in a hot air balloon. The balloon was part of a mass ascension event, and as you were born, a flock of doves appeared out of nowhere, circling the balloon in a perfect formation. The pilot, a former circus performer, juggled to keep everyone calm while your parents welcomed you into the world with a breathtaking view of the sunrise. Ever since, your parents have insisted that you're destined to soar to great heights, literally and metaphorically.",
          "You were born during the live finale of a reality TV show. The audience erupted in applause, thinking it was part of the act, and the host declared you the unexpected winner of the grand prize. Your parents are still trying to figure out how to spend the year's supply of diapers.",
          "As you were born, the hospital lights flickered, and a strange wind blew through the room. The doctors swear they saw you levitate for a moment. Your parents are now convinced you're the next superhero in training.",
          "You were born in a creepy old mansion your parents decided to renovate. As you took your first breath, the ghostly residents gave a round of applause. Your parents are sure you'll grow up to have a supernatural connection.",
          "You were born in the middle of a zoo during the annual penguin parade. As your mother went into labor, the penguins formed a perfect circle around her, flapping their wings in encouragement. The zookeeper declared you an honorary penguin, and your parents joke that your first words will be 'waddle waddle.' They believe you'll grow up to be an animal whisperer with a knack for quirky adventures.",
          "You made your grand entrance during a magic show, just as the magician was performing his greatest trick. The audience erupted in applause, thinking it was part of the act, and the magician named you his apprentice. Your parents are convinced you'll have a magical future, filled with illusions and enchantment.",
          "You were born in a bakery on National Doughnut Day, surrounded by the aroma of fresh pastries. As your mother gave birth, the bakers celebrated by creating a giant doughnut in your honor. Your parents now affectionately call you 'Doughnut Delight' and believe you’ll have a sweet and flavorful future ahead.",
          "You were born unexpectedly at your dad's wild bachelor party, with your mom going into labor amidst a sea of confetti and strippers. The DJ announced your arrival over booming bass, and you were crowned 'Party Baby' by a tipsy Elvis impersonator. Your parents joke that you were born to be the life of every party.",
          "You made your debut during a raucous burlesque show, as your mother went into labor just as the feathers and sequins were flying. The headliner paused her act to deliver you, declaring you the 'Burlesque Baby.' Your parents believe you'll grow up with a flair for the dramatic and a natural talent for stealing the spotlight.",
          "You were born in a tattoo parlor while your dad was getting inked, surrounded by buzzing needles and colorful designs. The tattoo artist, in a moment of inspiration, added your tiny footprints to the tattoo. Your parents are convinced you'll grow up with a rebellious spirit and a canvas of stories.",
        ]),
      ],
      age: 0,
      lifeSpan: chance.integer({ min: 60, max: 120 }),
      health: 100,
      lifePoints: 2400,
      cash: new Money({
        thousands: 10,
      }),
      bank: {
        checking: {
          amount: new Money(),
          transactions: [],
        },
        savings: {
          amount: new Money(),
          transactions: [],
        },
      },
      drugs: new Drugs(),
      inventory: new Inventory(),
      location: {
        city: cities[0],
        street: cities[0].hoods[2].streets[0],
        x: chance.integer({ min: 1, max: 85 }) + "%",
        y: chance.integer({ min: 18, max: 72 }) + "%",
      },
      streetCred,
      timeTokens: 24,
      family: {
        grandParents: getGrandparents(me),
        parents: me.parents,
        auntsAndUncles: getAuntsUncles(me),
        cousins: getCousins(me),
        siblings: me.siblings,
        children: me.children,
        spouse: me.spouse,
      },
      contacts: [],
      education: {
        ["PYSCHOLOGY"]: false,
        ["ENGLISH_101"]: false,
        ["AUTO_REPAIR"]: false,
        ["COOKING"]: false,
      },
      crimes: Object.keys(CrimeController.CRIMES).reduce(
        (crimes, crime) => ({
          ...crimes,
          [crime]: {
            last: null,
            committed: 0,
          },
        }),
        {}
      ),
    });

    for (const type of Object.keys(player.family)) {
      if (Array.isArray(player.family[type])) {
        player.family[type] = player.family[type].map((person) => {
          return {
            ...person,
            relationship: chance.integer({ min: 0, max: 100 }),
            actions: {
              ASK_OUT: false,
              BEFRIEND: false,
              COMPLIMENT: true,
              CONVERSATION: true,
              FLIRT: false,
              GIFT: true,
              INSULT: true,
              MESS: true,
              SPY: true,
              SELL_DRUGS: true,
            },
          };
        });
      }
    }

    for (const mission of generateStarterMissions()) {
      player.addMission(mission);
    }

    savePlayer(player);

    return player;
  }
}
