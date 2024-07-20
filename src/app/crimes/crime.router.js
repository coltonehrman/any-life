import { CrimeController } from "./crime.controller.js";
import { CrimesView } from "./crimes.view.js";
import { getPlayerById } from "../player/players.data.js";
import { html } from "../../utils.js";

const crimeController = new CrimeController();

export function crimeRouter(req, res) {
  const crimesView = new CrimesView();

  const player = getPlayerById(req.session.playerId);
  if (req.query.commit) {
    const message = crimeController.commitCrime(player, req.query.commit);

    player.feedback = html`
      <div class="feedback ${message.includes("fail") ? "fail" : "success"}">
        <p>${message}</p>
      </div>
    `;
  }

  return res.send(crimesView.print({ player }));
}
