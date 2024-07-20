import { ElectronicsView, electronics } from "./electronics.view";

import express from "express";
import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";

const electronicsView = new ElectronicsView();

export const electronicsRouter = express.Router();

electronicsRouter.get("/electronics", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(electronicsView.print(player));
});

electronicsRouter.post("/electronics", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const { itemId } = req.body;

  const electronic = electronics.find((w) => w.id === itemId);

  if (electronic) {
    if (player.cash.greaterThanOrEqual(electronic.price)) {
      player.cash = player.cash.subtract(electronic.price);

      player.items.push({
        id: crypto.randomUUID(),
        type: "ELECTRONIC",
        name: electronic.name,
        cost: electronic.price,
      });
    }
  }

  return res.send(html`
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1 class="popup-title">That Hit The Spot</h1>
        <p class="popup-subtitle">
          You enjoyed a Chinese Takeout from Fast-Food.
        </p>
        <p class="popup-description">
          It reminded you of your favorite childhood meal.
        </p>

        <div class="progress-section">
          <div class="progress-label">
            <span>Your Enjoyment</span><span>80%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: 80%;"></div>
          </div>
        </div>

        <div class="popup-bottom-text">tap anywhere to continue</div>
      </div>
    </div>
  `);
});
