import { getPlayerById } from "../../../../../player/players.data.js";
import { html } from "../../../../../../utils.js";

export function supplyRoute(req, res) {
  const player = getPlayerById(req.session.playerId);
  const pusherId = req.params.pusherId;
  const supply = Number(req.body["supply-amount"]);

  if (Number.isNaN(supply) || supply <= 0) {
    player.feedback = html`
      <div class="feedback fail">
        <p>Bad value for supply.</p>
      </div>
    `;
  } else {
    if (player.supplyPusherById(pusherId, supply)) {
      player.feedback = html`
        <div class="feedback success">
          <p>You supplied the pusher with drugs.</p>
        </div>
      `;
    } else {
      player.feedback = html`
        <div class="feedback fail">
          <p>You failed to supply the pusher with drugs.</p>
        </div>
      `;
    }
  }

  return res.redirect(req.headers.referer);
}
