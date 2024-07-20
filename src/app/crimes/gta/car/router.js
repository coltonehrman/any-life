import {
  cars,
  generateRandomCars,
  getCarById,
  removeCarById,
} from "../../../cars/cars.data.js";

import { Chance } from "chance";
import GTACarView from "./view.js";
import express from "express";
import { getPlayerById } from "../../../player/players.data.js";
import { html } from "../../../../utils.js";

const router = express.Router();

const chance = new Chance();

router.get("/:carId", function (req, res) {
  const gtaCarView = new GTACarView({ req });
  const player = getPlayerById(req.session.playerId);

  const car = getCarById(req.params.carId);

  return res.send(
    gtaCarView.print({
      player,
      car: car,
    })
  );
});

router.get("/:carId/chop", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const car = player.inventory.getItemById(req.params.carId);

  const chopPrice = car.value.multiply((car.condition / 100) * 0.75);

  player.feedback = html`
    <div class="feedback success">
      <p>
        You successfully chopped the <b><u>${car.name}</u></b> for
        <b><u>${chopPrice.format()}</u></b
        >.
      </p>
    </div>
  `;

  player.cash = player.cash.add(chopPrice);
  player.inventory.removeItemById(car.id);

  return res.redirect("/game/gta/storage");
});

router.get("/:carId/rob", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const car = getCarById(req.params.carId);

  let result = "fail";
  let message = html`You failed to rob the <b><u>${car.name}</u></b
    >.`;

  if (chance.bool({ likelihood: 50 })) {
    result = "success";
    message = html`You successfully robbed the <b><u>${car.name}</u></b
      >!`;

    player.inventory.addItem(car);
    removeCarById(car.id);
    cars.push(...generateRandomCars(1));
  }

  player.feedback = html`
    <div class="feedback ${result}">
      <p>${message}</p>
      ${result === "success"
        ? html`
            <p>You have 10min to chop it and get rid of it.</p>
            <p>
              <a class="button" href="/game/gta/storage">Go to Chop</a>
            </p>
          `
        : ""}
    </div>
  `;

  return res.redirect("/game/gta");
});

export default router;
