import { getPlayerById } from "../../../../../player/players.data.js";
import { html } from "../../../../../../utils.js";

export function collectRoute(req, res) {
  const player = getPlayerById(req.session.playerId);
  const npcId = req.params.npcId;

  player.collectEscortById(npcId);

  player.feedback = html`
    <div class="feedback success">
      <p>You collected from the escort.</p>
    </div>
  `;

  return res.redirect(req.headers.referer);
}
