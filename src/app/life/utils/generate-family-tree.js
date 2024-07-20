import { generateChildren, selectMainParent } from "./utils";

import { Chance } from "chance";
import NPC from "../../npcs/npc.model";

const chance = new Chance();

export function generateFamilyTree() {
  const grandFatherA = new NPC({
    gender: "Male",
    age: chance.integer({ min: 65, max: 100 }),
    relation: "Grand Father",
  });

  const grandMotherA = new NPC({
    gender: "Female",
    age: chance.integer({ min: 65, max: 100 }),
    relation: "Grand Mother",
  });

  grandFatherA.addSpouse(grandMotherA);

  const grandParentsAChildren = generateChildren(grandFatherA, {
    min: 16,
    max: 50,
  });

  const grandFatherB = new NPC({
    gender: "Male",
    age: chance.integer({ min: 65, max: 100 }),
    relation: "Grand Father",
  });

  const grandMotherB = new NPC({
    gender: "Female",
    age: chance.integer({ min: 65, max: 100 }),
    relation: "Grand Mother",
  });

  grandFatherB.addSpouse(grandMotherB);

  const grandParentsBChildren = generateChildren(grandFatherB, {
    min: 16,
    max: 50,
  });

  const father = selectMainParent(grandParentsAChildren, "Male");
  father.relation = "Father";
  const mother = selectMainParent(grandParentsBChildren, "Female");
  mother.relation = "Mother";

  father.addSpouse(mother);

  generateChildren(father);

  grandParentsAChildren.forEach((child) => {
    if (child !== father && child !== mother) {
      if (chance.bool({ likelihood: 50 })) {
        const spouse = new NPC({
          age: chance.integer({ min: 16, max: 35 }),
        });

        child.addSpouse(spouse);

        if (chance.bool({ likelihood: 50 })) {
          generateChildren(child);
        }
      }
    }
  });

  grandParentsBChildren.forEach((child) => {
    if (child !== father && child !== mother) {
      if (chance.bool({ likelihood: 50 })) {
        const spouse = new NPC({
          age: chance.integer({ min: 16, max: 35 }),
        });

        child.addSpouse(spouse);

        if (chance.bool({ likelihood: 50 })) {
          generateChildren(child);
        }
      }
    }
  });

  return chance.pickone(father.children);
}
