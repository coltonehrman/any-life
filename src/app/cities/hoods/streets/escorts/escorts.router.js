import { EscortsView } from "./escorts.view.js";
import { collectRoute } from "./routes/collect.route.js";
import express from "express";
import { getPlayerById } from "../../../../player/players.data.js";
import { getStreet } from "../../../cities.data.js";
import { hireRoute } from "./routes/hire.route.js";
import { payRoute } from "./routes/pay.route.js";
import { robRoute } from "./routes/rob.route.js";

export const escortsRouter = express.Router({ mergeParams: true });

escortsRouter.get("/", indexRoute);
escortsRouter.post("/:npcId/collect", collectRoute);
escortsRouter.post("/:npcId/hire", hireRoute);
escortsRouter.post("/:npcId/pay", payRoute);
escortsRouter.post("/:npcId/rob", robRoute);

function indexRoute(req, res) {
  const streetParam = req.params.street;
  const player = getPlayerById(req.session.playerId);
  const street = getStreet(streetParam);

  player.updateCollections();

  const escortsView = new EscortsView({ req, street });

  return res.send(
    escortsView.print({
      player,
    })
  );
}
