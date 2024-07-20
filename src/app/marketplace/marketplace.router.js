import { WeaponsView, weapons } from "./weapons/weapons.view.js";

import { FoodView } from "./food/food.view.js";
import { MarketplaceView } from "./marketplace.view.js";
import { electronicsRouter } from './electronics/electronics.router';
import express from "express";
import { getPlayerById } from "../player/players.data.js";
import { html } from "../../utils.js";

const marketplaceView = new MarketplaceView();
const foodView = new FoodView();
const weaponsView = new WeaponsView();

export const marketplaceRouter = express.Router();

marketplaceRouter.get("/market", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(marketplaceView.print(player));
});

marketplaceRouter.get("/market/food", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(foodView.print(player));
});

marketplaceRouter.post("/market/food", (req, res) => {
  const player = getPlayerById(req.session.playerId);

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

marketplaceRouter.get("/market/weapons", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(weaponsView.print(player));
});

marketplaceRouter.post("/market/weapons", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const { itemId } = req.body;

  const weapon = weapons.find((w) => w.id === itemId);

  if (weapon) {
    if (player.cash.greaterThanOrEqual(weapon.price)) {
      player.cash = player.cash.subtract(weapon.price);

      player.items.push({
        id: crypto.randomUUID(),
        type: "WEAPON",
        name: weapon.name,
        cost: weapon.price,
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

marketplaceRouter.use("/market", electronicsRouter)
