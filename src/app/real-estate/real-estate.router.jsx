import { BillowView } from "./billow/billow.view";
import Nano from "nano-jsx-experiment";
import { PopupResult } from "../_shared/components/PopupResult";
import { PropertyView } from "./property/property.view.js";
import { RealEstateController } from "./real-estate.controller";
import { RealEstateView } from "./real-estate.view";
import express from "express";
import { getPlayerById } from "../player/players.data.js";

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

const BuySuccess = Nano.renderSSR(
  <PopupResult
    title="New pad"
    description="You are now the owner of this sweet pad"
    redirect="/game/real-estate"
  />
);

const BuyFail = Nano.renderSSR(
  <PopupResult
    title="Insufficient funds"
    description="You don't have enough cash to purchase this property."
  />
);

realEstateRouter.post("/real-estate/buy", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const realEstateController = new RealEstateController();

  if (realEstateController.buy(player, req.body.propertyId)) {
    return res.send(BuySuccess);
  } else {
    return res.send(BuyFail);
  }
});

realEstateRouter.post("/real-estate/mortgage", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const realEstateController = new RealEstateController();

  if (realEstateController.buyWithMortgage(player, req.body.propertyId)) {
    return res.send(BuySuccess);
  } else {
    return res.send(BuyFail);
  }
});
