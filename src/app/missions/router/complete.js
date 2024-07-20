import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";

export function missionComplete(req, res) {
  const { missionId } = req.params;
  const player = getPlayerById(req.session.playerId);
  const mission = player.missions.find((m) => m.id === missionId);

  if (!mission) return res.redirect(req.headers.referer);

  if (player.completeMission(mission)) {
    player.feedback = html`
      <div class="feedback success">
        <p>You have successfully completed the mission!</p>
        <p>
          Returned ${mission.costToComplete().format()} and recieved
          ${mission.rewards.cash.calculate().format()}!
        </p>
      </div>
    `;
  } else {
    player.feedback = html`
      <div class="feedback fail">
        <p>You could not complete the mission.</p>
      </div>
    `;
  }

  return res.redirect(req.headers.referer);
}
