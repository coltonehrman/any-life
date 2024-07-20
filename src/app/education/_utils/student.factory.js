import { Chance } from "chance";
import NPC from "../../npcs/npc.model";

const chance = new Chance();

export const universityStudent = () => {
  const student = new NPC({
    age: chance.integer({ min: 14, max: 55 }),
    relation: "Class Mate",
    profession: "University Student",
  });

  return student;
};
