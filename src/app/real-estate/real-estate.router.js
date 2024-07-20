import { BillowView } from "./billow/billow.view.js";
import { Money } from "../items/money.model.js";
import { PropertyView } from "./property/property.view.js";
import { RealEstateView } from "./real-estate.view";
import { billowProperties } from "./billow/properties.data.js";
import express from "express";
import { getPlayerById } from "../player/players.data.js";
import { html } from "../../utils.js";

const realEstateView = new RealEstateView();
const billowView = new BillowView();
const propertyView = new PropertyView();

export const realEstateRouter = express.Router();

realEstateRouter.get("/real-estate", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(realEstateView.print({ player }));
});

realEstateRouter.get("/real-estate/property/:id", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const property = player.properties.find((p) => p.id === req.params.id);

  return res.send(propertyView.print({ player, property }));
});

realEstateRouter.get("/real-estate/billow", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(billowView.print({ player }));
});

realEstateRouter.post("/real-estate/buy", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const property = billowProperties.find((p) => p.id === req.body.propertyId);

  if (player.cash.greaterThanOrEqual(property.price)) {
    player.cash = player.cash.subtract(property.price);
    
    player.properties.push({
      ...property,
      id: crypto.randomUUID(),
    });

    return res.send(html`
      <div id="popup-result" style="display: flex;" class="popup-backdrop" data-redirect="/game/real-estate">
        <div class="popup-box">
          <h1 class="popup-title">New pad</h1>

          <p class="popup-description">
            You are now the owner of this sweet pad.
          </p>

          <div class="popup-bottom-text">tap anywhere to continue</div>
        </div>
      </div>
    `);
  } else {
    return res.send(html`
      <div id="popup-result" style="display: flex;" class="popup-backdrop">
        <div class="popup-box">
          <h1 class="popup-title">Insufficient funds</h1>

          <p class="popup-description">
            You don't have enough cash to purchase this property.
          </p>

          <div class="popup-bottom-text">tap anywhere to continue</div>
        </div>
      </div>
    `);
  }
});

realEstateRouter.post("/real-estate/mortgage", (req, res) => {
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

realEstateRouter.post("/market/weapons", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const { item } = req.body;

  if (item === "M16") {
    player.cash = player.cash.subtract(
      new Money({
        dollars: 1300,
      })
    );

    player.items.push({
      id: crypto.randomUUID(),
      type: "WEAPON",
      name: "M16",
      cost: new Money({
        dollars: 1300,
      }),
    });
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
