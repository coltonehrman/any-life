import { PusherPopupView } from "../../../../../map/popups/pusher.view.js";
import { getPlayerById } from "../../../../../player/players.data.js";
import { getStreet } from "../../../../cities.data.js";
import { html } from "../../../../../../utils.js";

export function buyRoute(req, res) {
  const streetParam = req.params.street;
  const npcId = req.params.npcId;
  const player = getPlayerById(req.session.playerId);
  const street = getStreet(streetParam);
  const npc = street.npcs.find((n) => n.id === npcId);
  const buyAmount = Number(req.body["buy-amount"]);

  if (!npc) return res.status(404).end();

  if (Number.isNaN(buyAmount) || buyAmount <= 0) {
    return res.status(500).end();
  }

  let message = "You don't have enough cash to purchase these drugs.";
  let result = "fail";

  const drugPrice = npc.playerNegotiatedPrices.get(player) ?? npc.drugPrice;
  const totalPrice = drugPrice.multiply(buyAmount);

  if (totalPrice.lessThanOrEqual(player.cash)) {
    player.cash = player.cash.subtract(totalPrice);
    player.drugs.addDrugWithQuantity(npc.drugType, buyAmount);
    npc.earnings = npc.earnings.add(totalPrice.multiply(0.15));

    message = `You purchased ${buyAmount} of drugs for ${totalPrice.format()}.`;
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
