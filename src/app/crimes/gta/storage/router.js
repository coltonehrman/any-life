import { Car } from "../../../cars/car.model.js";
import GTAStorageView from "./view.js";
import express from "express";
import { getPlayerById } from "../../../player/players.data.js";

const router = express.Router();

router.get("/", function gtaCarRouter(req, res) {
  const gtaStorageView = new GTAStorageView({ req });
  const player = getPlayerById(req.session.playerId);

  return res.send(
    gtaStorageView.print({
      player,
      cars: player.inventory._items.filter((i) => i instanceof Car),
    })
  );
});

export default router;
