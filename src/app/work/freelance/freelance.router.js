import { Chance } from "chance";
import { Money } from "../../items/money.model.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";

const chance = new Chance();

export const freelanceRouter = express.Router();

freelanceRouter.post("/:job/ad", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const job = req.params.job;
  const rate = new Money({
    dollars: Number(req.body.offerRate),
  });

  player.timeTokens -= 1;

  if (chance.bool({ likelihood: 50 })) {
    const hoursWorked = chance.integer({ min: 1, max: 8 });
    const earnings = rate.multiply(hoursWorked);

    player.timeTokens -= hoursWorked;
    player.cash = player.cash.add(earnings);

    return res.send(html`
      <div id="popup-result" style="display: flex;" class="popup-backdrop">
        <div class="popup-box">
          <h1>Quick cash</h1>
          <p>
            A lady named Rose hired you as a ${job} for ${hoursWorked} hours.
          </p>

          <div class="popup-stats">
            <p>Earnings: ${earnings.format()}</p>
            <p>Hours: ${hoursWorked} hours</p>
            <p>Hourly Rate: ${rate.format()}</p>
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
        <p>You could not find anyone to hire you. Better luck next time.</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  `);
});
