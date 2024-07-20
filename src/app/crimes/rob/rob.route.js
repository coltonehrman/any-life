import { Chance } from "chance";
import { Money } from "../../items/money.model.js";
import { StreetView } from "../../cities/hoods/streets/street.view.js";
import { getPlayerById } from "../../player/players.data.js";
import { getStreet } from "../../cities/cities.data.js";
import { html } from "../../../utils.js";

const chance = new Chance();

export function createRobRoute(npcType) {
  return (req, res) => {
    const streetParam = req.params.street;
    const npcId = req.params.npcId;

    const player = getPlayerById(req.session.playerId);
    const street = getStreet(streetParam);
    const npc = street.npcs.find((n) => n.id === npcId);

    if (!npc) return res.status(404).end();

    const streetView = new StreetView({ req, street });

    let result = "fail";
    let lostStreetCred = false;
    let message;

    const currentStreetCred = player.streetCred.get(street) ?? 0;

    if (currentStreetCred <= 0) {
      message = html`You don't have enough street cred to try and rob.`;
    } else {
      lostStreetCred = true;
      player.streetCred.set(street, currentStreetCred - 1);

      if (chance.bool({ likelihood: 50 })) {
        result = "success";
        message = html`You successfully robbed the ${npcType} for
          <b><u>${npc.cash.format()}</u></b
          >.`;

        player.cash = player.cash.add(npc.cash);
        npc.cash = new Money();
      } else {
        message = html`You failed to rob the ${npcType}.`;
      }
    }

    const feedback = html`
      <div class="feedback ${result}" hx-swap-oob="outerHTML:.feedback">
        <p>${message}</p>
        ${lostStreetCred ? html`<p>You lost 1 street cred for this.</p>` : ""}
      </div>
    `;

    return res.send(html` ${streetView.printMap(player)} ${feedback} `);
  };
}
