import { GamePageView } from "../../../views/game.view";
import { Money } from "../../items/money.model";
import { html } from "../../../utils.js";

export const weapons = [
  {
    id: crypto.randomUUID(),
    name: "M16",
    price: new Money({
      dollars: 1300,
    }),
  },
  {
    id: crypto.randomUUID(),
    name: "Glock Gen5",
    price: new Money({
      dollars: 500,
    }),
  },
  {
    id: crypto.randomUUID(),
    name: "M1911",
    price: new Money({
      dollars: 799,
    }),
  },
  {
    id: crypto.randomUUID(),
    name: "Remington 870",
    price: new Money({
      dollars: 300,
    }),
  },
  {
    id: crypto.randomUUID(),
    name: "AK-47",
    price: new Money({
      dollars: 900,
    }),
  },
];

export class WeaponsView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      body: html`<div class="ui-container">
        <div class="section-heading">Weapons</div>

        ${weapons
          .map(
            (weapon) => html`
              <div
                class="nav-item"
                onclick="showPopup('#popup-confirm-${weapon.id}')"
              >
                <div class="nav-text">
                  <span class="nav-heading">${weapon.name}</span>
                  <span class="nav-blurb">${weapon.price.format()}</span>
                </div>
                <span class="nav-arrow">...</span>
              </div>

              <div class="popup-backdrop" id="popup-confirm-${weapon.id}">
                <div class="popup-box">
                  <span class="popup-close-button">&times;</span>
                  <div class="popup-header">
                    <span class="popup-category">Weapon</span>
                  </div>
                  <h1 class="popup-title">${weapon.name}</h1>
                  <p class="popup-subtitle">A powerful rifle!</p>
                  <div class="popup-details">
                    <div class="popup-detail">
                      <span class="popup-detail-label">Price:</span>
                      ${weapon.price.format()}
                    </div>
                  </div>
                  <button
                    class="popup-button"
                    hx-post="/game/market/weapons"
                    hx-vals='{"itemId": "${weapon.id}"}'
                    hx-target="#popup-result"
                    hx-swap="outerHTML"
                  >
                    Buy it
                  </button>
                  <button class="popup-button popup-close-button">
                    Nevermind I can't
                  </button>
                </div>
              </div>
            `
          )
          .join("")}

        <div id="popup-result" class="popup-backdrop"></div>
      </div>`,
    });
  }
}
