import { HoodView } from "./hood.view.js";
import { getHood } from "../cities.data.js";
import { getPlayerById } from "../../player/players.data.js";

export function hoodRouter(req, res) {
  const player = getPlayerById(req.session.playerId);
  const hood = getHood(req.params.hood);

  const hoodView = new HoodView({ req });

  return res.send(hoodView.print(player, hood));
}
