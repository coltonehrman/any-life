import { CityView } from "./city.view.js";
import { getPlayerById } from "../player/players.data.js";

export function cityRouter(req, res) {
  const player = getPlayerById(req.session.playerId);

  const cityView = new CityView({ req });

  return res.send(cityView.print(player));
}
