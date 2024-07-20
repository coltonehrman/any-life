import { Chance } from "chance";
import { Money } from "../../items/money.model.js";
import { PartTimeJobView } from "./part-time-job.view.js";
import { PartTimeView } from "./part-time.view.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";
import { partTimeJobs } from "./jobs.data.js";

const chance = new Chance();

export const partTimeRouter = express.Router();

partTimeRouter.get("/", (req, res) => {
  const partTimeView = new PartTimeView();
  const player = getPlayerById(req.session.playerId);

  return res.send(partTimeView.print({ player }));
});

partTimeRouter.get("/job/:id", (req, res) => {
  const partTimeJobView = new PartTimeJobView();
  const player = getPlayerById(req.session.playerId);
  const job = player.jobs.find((j) => j.id === req.params.id);

  return res.send(partTimeJobView.print({ player, job }));
});

partTimeRouter.post("/job/:id/work", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const job = player.jobs.find((j) => j.id === req.params.id);

  const earnings = job.hourlyPay.multiply(job.weeklyHours);

  player.cash = player.cash.add(earnings);
  job.hoursWorkedThisWeek += job.weeklyHours;
  player.timeTokens -= job.weeklyHours;

  return res.send(html`
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1>You worked!</h1>
        <p>
          You worked ${job.weeklyHours} hours at your job and made
          ${earnings.format()}
        </p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  `);
});

partTimeRouter.post("/:jobId/apply", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const job = partTimeJobs.find((j) => j.id === req.params.jobId);

  player.jobs.push({
    ...job,
    id: crypto.randomUUID(),
    type: "Part-Time",
    hourlyPay: new Money({
      dollars: job.hourlyRate,
    }),
    weeklyHours: 8,
    hoursWorkedThisWeek: 0,
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
          <p>Hourly Rate: $${job.hourlyRate}</p>
          <p>Weekly Hours: ${job.weeklyHours}</p>
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
