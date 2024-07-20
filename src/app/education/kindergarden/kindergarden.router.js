import { Chance } from "chance";
import { FacultyView } from "./faculty/faculty.view.js";
import { KindergardenView } from './kindergarden.view';
import { StudentsView } from "./students/students.view.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";

const chance = new Chance();

export const kindergardenRouter = express.Router();

kindergardenRouter.get("/", function (req, res) {
  const kindergardenView = new KindergardenView();
  const player = getPlayerById(req.session.playerId);

  return res.send(kindergardenView.print({ player }));
});

kindergardenRouter.get("/students", function (req, res) {
  const studentsView = new StudentsView();
  const player = getPlayerById(req.session.playerId);

  return res.send(studentsView.print({ player }));
});

kindergardenRouter.get("/faculty", function (req, res) {
  const faculityView = new FacultyView();
  const player = getPlayerById(req.session.playerId);

  return res.send(faculityView.print({ player }));
});
