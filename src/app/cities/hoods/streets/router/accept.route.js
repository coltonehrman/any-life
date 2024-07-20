import { getPlayerById } from "../../../../player/players.data.js";
import { html } from "../../../../../utils.js";

export function acceptRoute(req, res) {
  const { mission } = req.query;

  if (!mission) return res.redirect(req.headers.referer);

  const player = getPlayerById(req.session.playerId);
  const npc = player.getNPCById(mission);

  if (!npc) return res.redirect(req.headers.referer);

  player.addMission(npc);
  player.drugs.addDrugWithQuantity(npc.drugType, npc.quantity);
  player.removeNPCById(npc.id);

  player.feedback = html`
    <div class="feedback success">
      <p>
        You have accepted the mission to push <b><u>${npc.quantity}g</u></b> of
        <b><u>${npc.price.multiply(npc.quantity)}</u></b
        >.
      </p>
    </div>
  `;

  return res.redirect(req.headers.referer);
}
