import { MissionsView } from "../../../../missions/missions.view.js";
import { StreetView } from "../street.view.js";
import { getPlayerById } from "../../../../player/players.data.js";
import { getStreet } from "../../../cities.data.js";
import { html } from "../../../../../utils.js";

export function sellRoute(req, res) {
  const streetParam = req.params.street;
  const { npcId } = req.body;

  if (!npcId) return res.status(404).end();

  const player = getPlayerById(req.session.playerId);
  const street = getStreet(streetParam);
  const npc = player.getNPCById(npcId);

  if (!npc) return res.status(404).end();

  const missionsView = new MissionsView();
  const streetView = new StreetView({ req, street });

  player.sellDrugs({ npc });

  const missions = missionsView.print({
    player,
    street,
  });

  return res.send(html`
    ${streetView.printMap(player)} ${missions} ${player.feedback}
  `);
}
