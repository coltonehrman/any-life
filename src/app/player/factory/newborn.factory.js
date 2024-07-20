import { Chance } from "chance";

const chance = new Chance();

const newBornScenarios = [
  {
    scenario: "Adopted Baby",
    probability: 10,
    details: [
      {
        type: "Loving Couple",
        description: "Adopted by a loving couple (male and female)",
        probability: 40,
      },
      {
        type: "Single Mother",
        description: "Adopted by a single mother",
        probability: 20,
      },
      {
        type: "Single Father",
        description: "Adopted by a single father",
        probability: 10,
      },
      {
        type: "Two Gay Dads",
        description: "Adopted by two gay dads",
        probability: 15,
      },
      {
        type: "Two Lesbian Moms",
        description: "Adopted by two lesbian moms",
        probability: 15,
      },
    ],
  },
  {
    scenario: "Orphan Baby",
    probability: 5,
    details: [
      {
        type: "Orphanage",
        description: "Raised in an orphanage",
        probability: 40,
      },
      {
        type: "Distant Relative",
        description: "Raised by a distant relative (aunt, uncle, grandparent)",
        probability: 40,
      },
      {
        type: "Family Friend",
        description: "Raised by a close family friend",
        probability: 20,
      },
    ],
  },
  {
    scenario: "Regular Baby",
    probability: 75,
    details: [
      {
        type: "Biological Parents",
        description: "Raised by both biological parents (male and female)",
        probability: 66.7,
      },
      {
        type: "Single Mother",
        description: "Raised by a single mother",
        probability: 13.3,
      },
      {
        type: "Single Father",
        description: "Raised by a single father",
        probability: 6.7,
      },
      {
        type: "Two Gay Dads",
        description: "Raised by two gay dads",
        probability: 6.7,
      },
      {
        type: "Two Lesbian Moms",
        description: "Raised by two lesbian moms",
        probability: 6.7,
      },
    ],
  },
  {
    scenario: "Unconventional Family Structures",
    probability: 5,
    details: [
      {
        type: "Grandparents",
        description: "Raised by grandparents",
        probability: 40,
      },
      {
        type: "Older Siblings",
        description: "Raised by older siblings",
        probability: 20,
      },
      {
        type: "Commune",
        description: "Raised by a commune or collective community",
        probability: 40,
      },
    ],
  },
];

// experimental code
const newBornStructure = () => {
  const newBorn = {
    isAdopted: false,
    isOrphan: false,
    parents: [],
  };

  if (chance.bool({ likelihood: 50 })) {
    // chance of being adopted
    newBorn.isAdopted = true;
  } else {
    if (chance.bool({ likelihood: 50 })) {
      // chance of being an orphan
      newBorn.isOrphan = true;
    }
  }

  const parents = newBorn.parents;
  const type = newBorn.isAdopted
    ? "adoptive"
    : newBorn.isOrphan
    ? "foster"
    : "biological";

  if (chance.bool({ likelihood: 50 })) {
    // chance of having at least 1 mother
    const gender = "Female";

    parents.push({
      gender,
      name: chance.name({ gender }),
      type,
    });

    if (chance.bool({ likelihood: 50 })) {
      // chance of having at least 1 mother & 1 father
      const gender = "Male";

      parents.push({
        gender,
        name: chance.name({ gender }),
        type,
      });
    } else if (chance.bool({ likelihood: 50 })) {
      // chance of having 2 mothers
      const gender = "Female";

      parents.push({
        gender,
        name: chance.name({ gender }),
        type,
      });
    }
  } else if (chance.bool({ likelihood: 50 })) {
    // chance of having at least 1 father
    const gender = "Male";

    parents.push({
      gender,
      name: chance.name({ gender }),
      type,
    });

    if (chance.bool({ likelihood: 50 })) {
      // chance of having 2 fathers
      const gender = "Male";

      parents.push({
        gender,
        name: chance.name({ gender }),
        type,
      });
    }
  }

  console.log(newBorn);

  return {
    ...newBorn,
    parents: {
      father: {
        exists: true,
        name: "Father's Name",
        type: chance.pickone(["biological", "adoptive", "foster"]),
      },
      mother: {
        exists: true,
        name: "Mother's Name",
        type: chance.pickone(["biological", "adoptive", "foster"]),
      },
    },
    guardians: [
      {
        name: "Guardian's Name",
        relationship: chance.pickone([
          "aunt",
          "uncle",
          "grandparent",
          "family friend",
        ]),
        type: chance.pickone(["biological", "adoptive", "foster"]), // needs to be based on relationship
      },
    ],
    familyStructure: chance.pickone([
      "regular",
      "singleMother",
      "singleFather",
      "gayDads",
      "lesbianMoms",
      "grandparents",
      "olderSiblings",
      "commune",
      "orphanage",
      "adopted",
    ]),
    birthCircumstances: {
      location: chance.pickone(["hospital", "home", "taxi", "plane", "zoo"]),
      event: chance.pickone(["normal", "majorEvent", "notableFeatures"]),
      description: "Born in a regular hospital under normal circumstances.", // based on location and event
    },
    initialStats: {
      health: 50,
      happiness: 50,
      resilience: 50,
      luck: 50,
      intelligence: 50,
      adaptability: 50,
      familyRelationship: 50,
    },
  };
};

// experiemental code
export const getScenario = () => {
  const scenario = chance.weighted(
    newBornScenarios,
    newBornScenarios.map((s) => s.probability)
  );

  const detail = chance.weighted(
    scenario.details,
    scenario.details.map((d) => d.probability)
  );

  console.log(detail.type);
};
