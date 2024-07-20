import { Chance } from "chance";
import NPC from "../../npcs/npc.model";

const chance = new Chance();

export function selectMainParent(children, gender) {
  let parent = children.find((child) => child.gender === gender);
  
  if (!parent) {
    parent = new NPC({
      gender,
      age: chance.integer({ min: 16, max: 35 }),
    });

    children[0].parents[0].addChild(parent);
    children.push(parent);
  }

  return parent;
}

export function generateChildren(
  father,
  ageRange = { min: 0, max: 18 }
) {
  const numChildren = chance.integer({ min: 1, max: 5 });
  const children = chance.n(() => {
    return new NPC({
      age: chance.integer(ageRange),
    });
  }, numChildren);
  
  children.forEach((child) => father.addChild(child));
  
  return children;
}

function printPerson(person, indent = 0) {
  const indentStr = "  ".repeat(indent);
  process.stdout.write(
    `${indentStr}${person.name} (${person.age} ${person.gender})`
  );
  if (person.spouse) {
    console.log(
      ` <-> ${person.spouse.name} (${person.spouse.age} ${person.spouse.gender})`
    );
  } else {
    console.log();
  }
  person.children.forEach((child) => printPerson(child, indent + 1));
}

export function getGrandparents(person) {
  const grandparents = new Set();
  person.parents.forEach((parent) => {
    parent.parents.forEach((grandparent) => grandparents.add(grandparent));
  });
  return Array.from(grandparents);
}

export function getSiblings(person) {
  const siblings = new Set();
  person.siblings.forEach((sibling) => siblings.add(sibling));
  return Array.from(siblings);
}

export function getCousins(person) {
  const cousins = new Set();
  person.parents.forEach((parent) => {
    parent.siblings.forEach((auntUncle) => {
      auntUncle.children.forEach((cousin) => cousins.add(cousin));
    });
  });
  return Array.from(cousins);
}

export function getAuntsUncles(person) {
  const auntsUncles = new Set();
  person.parents.forEach((parent) => {
    parent.siblings.forEach((auntUncle) => auntsUncles.add(auntUncle));
  });
  return Array.from(auntsUncles);
}
