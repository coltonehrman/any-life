import { Chance } from "chance";
import { EducationView } from "./education.view.js";
import { communityCollegeRouter } from "./community-college/community-college.router.js";
import { elementaryRouter } from "./elementary/elementary.router";
import express from "express";
import { getPlayerById } from "../player/players.data.js";
import { highschoolRouter } from "./highschool/highschool.router";
import { kindergardenRouter } from "./kindergarden/kindergarden.router";
import { middleschoolRouter } from "./middleschool/middleschool.router";
import { universityRouter } from "./university/university.router.js";

const chance = new Chance();

export const educationRouter = express.Router();

educationRouter.get("/education", function (req, res) {
  const educationView = new EducationView();
  const player = getPlayerById(req.session.playerId);

  return res.send(educationView.print({ player }));
});

educationRouter.use("/education/community-college", communityCollegeRouter);
educationRouter.use("/education/university", universityRouter);
educationRouter.use("/education/kindergarden", kindergardenRouter);
educationRouter.use("/education/elementary", elementaryRouter);
educationRouter.use("/education/middleschool", middleschoolRouter);
educationRouter.use("/education/highschool", highschoolRouter);
