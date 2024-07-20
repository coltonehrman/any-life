import { PusherPopupView } from "../../../../../map/popups/pusher.view.js";
import { getPlayerById } from "../../../../../player/players.data.js";
import { getStreet } from "../../../../cities.data.js";
import { html } from "../../../../../../utils.js";

export function hireRoute(req, res) {
  const streetParam = req.params.street;
  const npcId = req.params.npcId;
  const player = getPlayerById(req.session.playerId);
  const street = getStreet(streetParam);
  const npc = street.npcs.find((n) => n.id === npcId);

  if (!npc) return res.status(404).end();

  let message = "You failed to hire the pusher.";
  let result = "fail";

  if (player.hirePusher(npcId)) {
    message = `You hired the pusher.`;
    result = "success";
  }

  const pusherPopup = new PusherPopupView({
    player,
    pusher: npc,
  });

  return res.send(html`
    ${pusherPopup.print()}

    <div class="feedback ${result}" hx-swap-oob="outerHTML:.feedback">
      <p>${message}</p>
    </div>
  `);
}
