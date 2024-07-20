import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";

export function missionCollect(req, res) {
  const { missionId } = req.params;
  const player = getPlayerById(req.session.playerId);
  const mission = player.missions.find((m) => m.id === missionId);

  if (!mission) return res.redirect(req.headers.referer);

  mission.completePart(player);

  player.feedback = html`
    <div class="feedback success">
      <p>You have collected the drugs for this mission!</p>
    </div>
  `;

  return res.redirect(req.headers.referer);
}
