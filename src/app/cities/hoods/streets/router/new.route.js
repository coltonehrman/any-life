import { Chance } from "chance";
import Fiend from "../../../../npcs/fiend.js";
import { NPCS } from "../../../../npcs/types.js";
import { StreetView } from "../street.view.js";
import { getPlayerById } from "../../../../player/players.data.js";
import { getStreet } from "../../../cities.data.js";
import { html } from "../../../../../utils.js";

const chance = new Chance();

export function newRoute(req, res) {
  const streetParam = req.params.street;
  const player = getPlayerById(req.session.playerId);
  const street = getStreet(streetParam);

  const streetView = new StreetView({ req, street });

  if (player.hustle()) {
    player.npcs = [];

    chance.n(() => {
      player.addNPC(
        new Fiend({
          type: NPCS.FIEND,
          drugs: player.location.street.drugs,
        })
      );
    }, chance.integer({ min: 0, max: 3 }));

    // if (chance.bool({ likelihood: 100 })) {
    //   player.npcs.push(
    //     new Mission({
    //       drugs: player.street.drugs,
    //     })
    //   );
    // }

    const feedback = html`
      <div class="feedback success" hx-swap-oob="outerHTML:.feedback">
        <p>You hustled to find some more clients to sell drugs to.</p>
      </div>
    `;

    return res.send(`${streetView.printMap(player)}${feedback}`);
  }
}
