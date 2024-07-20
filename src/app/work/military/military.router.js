import { Chance } from "chance";
import { MilitaryView } from "./military.view.js";
import { Money } from "../../items/money.model.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";

const chance = new Chance();

export const militaryRouter = express.Router();

militaryRouter.get("/", (req, res) => {
  const militaryView = new MilitaryView();
  const player = getPlayerById(req.session.playerId);

  return res.send(militaryView.print({ player }));
});

militaryRouter.get("/job/:id", (req, res) => {
  const partTimeJobView = new PartTimeJobView();
  const player = getPlayerById(req.session.playerId);
  const job = player.jobs.find((j) => j.id === req.params.id);

  return res.send(partTimeJobView.print({ player, job }));
});

militaryRouter.post("/job/:id/work", (req, res) => {
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

militaryRouter.post("/:job/apply", function (req, res) {
  const player = getPlayerById(req.session.playerId);

  player.timeTokens -= 1;

  if (chance.bool({ likelihood: 50 })) {
    player.jobs.push({
      id: crypto.randomUUID(),
      title: "Grocery Bagger",
      hourlyPay: new Money({
        dollars: 14,
      }),
      weeklyHours: 8,
      hoursWorkedThisWeek: 0,
      started: Date.now(),
    });

    return res.send(html`
      <div id="popup-result" style="display: flex;" class="popup-backdrop">
        <div class="popup-box">
          <h1>Let's go</h1>
          <p>Welcome to your job.</p>

          <div class="popup-stats">
            <p>Job: Grocery Bagger</p>
            <p>Employer: Wuyts Grocery</p>
            <p>Hourly Rate: $14</p>
            <p>Weekly Hours: 8</p>
          </div>
        </div>

        <div class="popup-bottom-text">Tap anywhere to continue</div>
      </div>
    `);
  }

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
