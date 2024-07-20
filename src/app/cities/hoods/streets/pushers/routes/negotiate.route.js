import { Money } from "../../../../../items/money.model.js";
import { PusherPopupView } from "../../../../../map/popups/pusher.view.js";
import { getPlayerById } from "../../../../../player/players.data.js";
import { getStreet } from "../../../../cities.data.js";
import { html } from "../../../../../../utils.js";

export function negotiateRoute(req, res) {
  const streetParam = req.params.street;
  const npcId = req.params.npcId;
  const player = getPlayerById(req.session.playerId);
  const street = getStreet(streetParam);
  const npc = street.npcs.find((n) => n.id === npcId);
  const negotiateOffer = Number(req.body["negotiate-offer"]);

  if (!npc) return res.status(404).end();

  if (
    Number.isNaN(negotiateOffer) ||
    negotiateOffer <= 0 ||
    negotiateOffer >= npc.drugPrice.toFloat()
  ) {
    return res.status(500).end();
  }

  let message = "You failed to negotiate.";
  let result = "fail";

  if (
    npc.negotiate(
      player,
      new Money({
        dollars: negotiateOffer,
      })
    )
  ) {
    message = "You successully negotiated.";
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
