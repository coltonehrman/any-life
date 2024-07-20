import { Chance } from "chance";
import { EmployeesView } from "./employees/employees.view.js";
import { FullTimeJobView } from "./full-time-job.view.js";
import { FullTimeView } from "./full-time.view.js";
import NPC from "../../npcs/npc.model.js";
import express from "express";
import { fullTimeJobs } from "./jobs.data.js";
import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";

const chance = new Chance();

export const fullTimeRouter = express.Router();

fullTimeRouter.get("/", (req, res) => {
  const fullTimeView = new FullTimeView();
  const player = getPlayerById(req.session.playerId);

  return res.send(fullTimeView.print({ player }));
});

fullTimeRouter.get("/job/:id", (req, res) => {
  const fullTimeJobView = new FullTimeJobView();
  const player = getPlayerById(req.session.playerId);
  const job = player.jobs.find((j) => j.id === req.params.id);

  return res.send(fullTimeJobView.print({ player, job }));
});

fullTimeRouter.get("/job/:id/employees", (req, res) => {
  const emoployeesView = new EmployeesView();
  const player = getPlayerById(req.session.playerId);
  const job = player.jobs.find((j) => j.id === req.params.id);

  return res.send(emoployeesView.print({ player, job }));
});

fullTimeRouter.post("/job/:id/work", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const job = player.jobs.find((j) => j.id === req.params.id);

  return res.send(html`
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1>You worked!</h1>
        <p>You worked extra hours at your job.</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  `);
});

fullTimeRouter.post("/:jobId/apply", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const job = fullTimeJobs.find((j) => j.id === req.params.jobId);

  const employee = () =>
    new NPC({
      age: chance.integer({ min: 18, max: 65 }),
    });

  player.jobs.push({
    ...job,
    id: crypto.randomUUID(),
    employees: chance.n(employee, 5),
    type: "Full-Time",
    started: Date.now(),
  });

  return res.send(html`
    <div
      id="popup-result"
      style="display: flex;"
      class="popup-backdrop"
      data-redirect="/game/work"
    >
      <div class="popup-box">
        <h1>Let's go</h1>
        <p>Welcome to your job.</p>

        <div class="popup-stats">
          <p>Job: ${job.job}</p>
          <p>Employer: ${job.employer}</p>
          <p>Salary: ${job.salary.format()}</p>
        </div>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  `);

  return res.send(html`
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1>No dice.</h1>
        <p>Your application has been rejected. Better luck next time.</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  `);
});

fullTimeRouter.post("/job/:id/quit", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const job = player.jobs.find((j) => j.id === req.params.id);

  job.quit = true;

  return res.send(html`
    <div
      id="popup-result"
      style="display: flex;"
      class="popup-backdrop"
      data-redirect="/game/work"
    >
      <div class="popup-box">
        <h1>You quit your job.</h1>
        <p>You no longer work here.</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  `);
});
