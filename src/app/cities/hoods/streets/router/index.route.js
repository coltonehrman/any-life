import { StreetView } from "../street.view.js";
import { getPlayerById } from "../../../../player/players.data.js";
import { getStreet } from "../../../cities.data.js";

export function indexRoute(req, res) {
  const streetParam = req.params.street;
  const player = getPlayerById(req.session.playerId);
  const street = getStreet(streetParam);

  if (!player.location.street || player.location.street !== street) {
    // changing streets, replace NPCs
    player.npcs = [];
  }

  player.updateCollections();

  const streetView = new StreetView({ req, street });

  return res.send(
    streetView.print({
      player,
    })
  );
}
