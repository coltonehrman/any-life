import { FacultyView } from "./faculty/faculty.view.js";
import { HighschoolView } from "./highschool.view";
import { StudentsView } from "./students/students.view.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";

export const highschoolRouter = express.Router();

highschoolRouter.get("/", function (req, res) {
  const highschoolView = new HighschoolView();
  const player = getPlayerById(req.session.playerId);

  return res.send(highschoolView.print({ player }));
});

highschoolRouter.get("/students", function (req, res) {
  const studentsView = new StudentsView();
  const player = getPlayerById(req.session.playerId);

  return res.send(studentsView.print({ player }));
});

highschoolRouter.get("/faculty", function (req, res) {
  const faculityView = new FacultyView();
  const player = getPlayerById(req.session.playerId);

  return res.send(faculityView.print({ player }));
});
