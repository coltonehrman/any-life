import { Chance } from "chance";
import { DRUGS } from "../../drugs/types.js";
import { MissionFactory } from "../mission.factory.js";
import { cities } from "../../cities/cities.data.js";

const chance = new Chance();

export const generateStarterMissions = () => {
  const weedMission = MissionFactory.newDrugMission({
    npcName: chance.name(),
    drug: DRUGS.WEED,
    quantity: 10,
    cashRewardPercentage: 20,
    streetCredReward: 1,
    street: cities[0].hoods[2].streets[0],
    next: MissionFactory.newDrugMission({
      npcName: chance.name(),
      drug: DRUGS.WEED,
      quantity: 25,
      cashRewardPercentage: 20,
      streetCredReward: 1,
      street: cities[0].hoods[2].streets[0],
      next: MissionFactory.newDrugMission({
        npcName: chance.name(),
        drug: DRUGS.WEED,
        quantity: 50,
        cashRewardPercentage: 20,
        streetCredReward: 2,
        street: cities[0].hoods[2].streets[0],
        next: MissionFactory.newDrugMission({
          npcName: chance.name(),
          drug: DRUGS.WEED,
          quantity: 100,
          cashRewardPercentage: 25,
          streetCredReward: 2,
          street: cities[0].hoods[2].streets[0],
          next: MissionFactory.newDrugMission({
            npcName: chance.name(),
            drug: DRUGS.WEED,
            quantity: 250,
            cashRewardPercentage: 30,
            streetCredReward: 3,
            street: cities[0].hoods[2].streets[0],
            next: MissionFactory.newDrugMission({
              npcName: chance.name(),
              drug: DRUGS.WEED,
              quantity: 500,
              cashRewardPercentage: 50,
              streetCredReward: 4,
              street: cities[0].hoods[2].streets[0],
            }),
          }),
        }),
      }),
    }),
  });

  const lsdMission = MissionFactory.newDrugMission({
    npcName: chance.name(),
    drug: DRUGS.LSD,
    quantity: 10,
    cashRewardPercentage: 20,
    streetCredReward: 1,
    street: cities[0].hoods[1].streets[1],
    next: MissionFactory.newDrugMission({
      npcName: chance.name(),
      drug: DRUGS.LSD,
      quantity: 25,
      cashRewardPercentage: 20,
      streetCredReward: 1,
      street: cities[0].hoods[1].streets[1],
      next: MissionFactory.newDrugMission({
        npcName: chance.name(),
        drug: DRUGS.LSD,
        quantity: 50,
        cashRewardPercentage: 20,
        streetCredReward: 2,
        street: cities[0].hoods[1].streets[1],
        next: MissionFactory.newDrugMission({
          npcName: chance.name(),
          drug: DRUGS.LSD,
          quantity: 100,
          cashRewardPercentage: 25,
          streetCredReward: 2,
          street: cities[0].hoods[1].streets[1],
          next: MissionFactory.newDrugMission({
            npcName: chance.name(),
            drug: DRUGS.LSD,
            quantity: 250,
            cashRewardPercentage: 30,
            streetCredReward: 3,
            street: cities[0].hoods[1].streets[1],
            next: MissionFactory.newDrugMission({
              npcName: chance.name(),
              drug: DRUGS.LSD,
              quantity: 500,
              cashRewardPercentage: 50,
              streetCredReward: 4,
              street: cities[0].hoods[1].streets[1],
            }),
          }),
        }),
      }),
    }),
  });

  const heroinMission = MissionFactory.newDrugMission({
    npcName: chance.name(),
    drug: DRUGS.HEROIN,
    quantity: 10,
    cashRewardPercentage: 20,
    streetCredReward: 1,
    street: cities[0].hoods[0].streets[2],
    next: MissionFactory.newDrugMission({
      npcName: chance.name(),
      drug: DRUGS.HEROIN,
      quantity: 25,
      cashRewardPercentage: 20,
      streetCredReward: 1,
      street: cities[0].hoods[0].streets[2],
      next: MissionFactory.newDrugMission({
        npcName: chance.name(),
        drug: DRUGS.HEROIN,
        quantity: 50,
        cashRewardPercentage: 20,
        streetCredReward: 2,
        street: cities[0].hoods[0].streets[2],
        next: MissionFactory.newDrugMission({
          npcName: chance.name(),
          drug: DRUGS.HEROIN,
          quantity: 100,
          cashRewardPercentage: 25,
          streetCredReward: 2,
          street: cities[0].hoods[0].streets[2],
          next: MissionFactory.newDrugMission({
            npcName: chance.name(),
            drug: DRUGS.HEROIN,
            quantity: 250,
            cashRewardPercentage: 30,
            streetCredReward: 3,
            street: cities[0].hoods[0].streets[2],
            next: MissionFactory.newDrugMission({
              npcName: chance.name(),
              drug: DRUGS.HEROIN,
              quantity: 500,
              cashRewardPercentage: 50,
              streetCredReward: 4,
              street: cities[0].hoods[0].streets[2],
            }),
          }),
        }),
      }),
    }),
  });

  const cocaineMission = MissionFactory.newDrugMission({
    npcName: chance.name(),
    drug: DRUGS.COCAINE,
    quantity: 10,
    cashRewardPercentage: 20,
    streetCredReward: 1,
    street: cities[0].hoods[0].streets[0],
    next: MissionFactory.newDrugMission({
      npcName: chance.name(),
      drug: DRUGS.COCAINE,
      quantity: 25,
      cashRewardPercentage: 20,
      streetCredReward: 1,
      street: cities[0].hoods[0].streets[0],
      next: MissionFactory.newDrugMission({
        npcName: chance.name(),
        drug: DRUGS.COCAINE,
        quantity: 50,
        cashRewardPercentage: 20,
        streetCredReward: 2,
        street: cities[0].hoods[0].streets[0],
        next: MissionFactory.newDrugMission({
          npcName: chance.name(),
          drug: DRUGS.COCAINE,
          quantity: 100,
          cashRewardPercentage: 25,
          streetCredReward: 2,
          street: cities[0].hoods[0].streets[0],
          next: MissionFactory.newDrugMission({
            npcName: chance.name(),
            drug: DRUGS.COCAINE,
            quantity: 250,
            cashRewardPercentage: 30,
            streetCredReward: 3,
            street: cities[0].hoods[0].streets[0],
            next: MissionFactory.newDrugMission({
              npcName: chance.name(),
              drug: DRUGS.COCAINE,
              quantity: 500,
              cashRewardPercentage: 50,
              streetCredReward: 4,
              street: cities[0].hoods[0].streets[0],
            }),
          }),
        }),
      }),
    }),
  });

  return [weedMission, lsdMission, heroinMission, cocaineMission];
};
