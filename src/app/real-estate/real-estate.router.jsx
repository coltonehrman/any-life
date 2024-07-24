import { BillowView } from "./billow/billow.view";
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
      <div
        id="popup-result"
        style="display: flex;"
        class="popup-backdrop"
        data-redirect="/game/real-estate"
      >
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
  const property = billowProperties.find((p) => p.id === req.body.propertyId);

  const downPayment = property.price.multiply(0.2);

  if (player.cash.greaterThanOrEqual(downPayment)) {
    player.cash = player.cash.subtract(downPayment);

    const mortgageTerm = 30; // 30 years
    const mortgageInterestRate = 5; // 5%

    const mortgageBalance = property.price.subtract(downPayment);
    let yearlyMortgagePayment = mortgageBalance.divide(mortgageTerm);

    yearlyMortgagePayment = yearlyMortgagePayment.add(
      mortgageBalance.multiply(mortgageInterestRate / 100)
    );

    player.properties.push({
      ...property,
      id: crypto.randomUUID(),
      mortgage: {
        yearsLeft: mortgageTerm,
        balance: mortgageBalance,
        yearlyMortgagePayment,
      },
    });

    return res.send(html`
      <div
        id="popup-result"
        style="display: flex;"
        class="popup-backdrop"
        data-redirect="/game/real-estate"
      >
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
            You don't have enough cash to put down 20% on this property.
          </p>

          <div class="popup-bottom-text">tap anywhere to continue</div>
        </div>
      </div>
    `);
  }
});
