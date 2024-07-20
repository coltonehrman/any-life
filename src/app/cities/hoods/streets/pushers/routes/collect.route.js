import { getPlayerById } from "../../../../../player/players.data.js";
import { html } from "../../../../../../utils.js";

export function collectRoute(req, res) {
  const player = getPlayerById(req.session.playerId);
  const pusherId = req.params.pusherId;

  player.collectPusherById(pusherId);

  player.feedback = html`
    <div class="feedback success">
      <p>You collected from the pusher.</p>
    </div>
  `;

  return res.redirect(req.headers.referer);
}
