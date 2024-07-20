import { FacultyView } from "./faculty/faculty.view.js";
import { MiddleschoolView } from "./middleschool.view.js";
import { StudentsView } from "./students/students.view.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";

export const middleschoolRouter = express.Router();

middleschoolRouter.get("/", function (req, res) {
  const middleschoolView = new MiddleschoolView();
  const player = getPlayerById(req.session.playerId);

  return res.send(middleschoolView.print({ player }));
});

middleschoolRouter.get("/students", function (req, res) {
  const studentsView = new StudentsView();
  const player = getPlayerById(req.session.playerId);

  return res.send(studentsView.print({ player }));
});

middleschoolRouter.get("/faculty", function (req, res) {
  const faculityView = new FacultyView();
  const player = getPlayerById(req.session.playerId);

  return res.send(faculityView.print({ player }));
});
