import { PushersView } from "./pushers.view.js";
import { buyRoute } from "./routes/buy.route.js";
import { collectRoute } from "./routes/collect.route.js";
import express from "express";
import { getPlayerById } from "../../../../player/players.data.js";
import { getStreet } from "../../../cities.data.js";
import { hireRoute } from "./routes/hire.route.js";
import { negotiateRoute } from "./routes/negotiate.route.js";
import { robRoute } from "./routes/rob.route.js";
import { supplyRoute } from "./routes/supply.route.js";

export const pushersRouter = express.Router({ mergeParams: true });

pushersRouter.get("/", indexRoute);

pushersRouter.post("/:npcId/hire", hireRoute);
pushersRouter.post("/:pusherId/collect", collectRoute);
pushersRouter.post("/:pusherId/supply", supplyRoute);
pushersRouter.post("/:npcId/buy", buyRoute);
pushersRouter.post("/:npcId/negotiate", negotiateRoute);
pushersRouter.post("/:npcId/rob", robRoute);

function indexRoute(req, res) {
  const streetParam = req.params.street;
  const player = getPlayerById(req.session.playerId);
  const street = getStreet(streetParam);

  player.updateCollections();

  const pushersView = new PushersView({ req, street });

  return res.send(
    pushersView.print({
      player,
    })
  );
}
