import { ElementaryView } from "./elementary.view.js";
import { FacultyView } from "./faculty/faculty.view.js";
import { StudentsView } from "./students/students.view.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";

export const elementaryRouter = express.Router();

elementaryRouter.get("/", function (req, res) {
  const elementaryView = new ElementaryView();
  const player = getPlayerById(req.session.playerId);

  return res.send(elementaryView.print({ player }));
});

elementaryRouter.get("/students", function (req, res) {
  const studentsView = new StudentsView();
  const player = getPlayerById(req.session.playerId);

  return res.send(studentsView.print({ player }));
});

elementaryRouter.get("/faculty", function (req, res) {
  const faculityView = new FacultyView();
  const player = getPlayerById(req.session.playerId);

  return res.send(faculityView.print({ player }));
});
