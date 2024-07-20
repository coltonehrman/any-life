import { GamePageView } from "../../../views/game.view";
import { Money } from "../../items/money.model.js";
import { html } from "../../../utils.js";

export const electronics = [
  {
    id: crypto.randomUUID(),
    name: "iPhone 14",
    price: new Money({
      dollars: 1399,
    }),
  },
];

export class ElectronicsView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      body: html`<div class="ui-container">
        <div class="section-heading">Electronics</div>

        ${electronics
          .map(
            (electronic) => html`
              <div
                class="nav-item"
                onclick="showPopup('#popup-confirm-${electronic.id}')"
              >
                <div class="nav-text">
                  <span class="nav-heading">${electronic.name}</span>
                  <span class="nav-blurb">${electronic.price.format()}</span>
                </div>
                <span class="nav-arrow">...</span>
              </div>

              <div class="popup-backdrop" id="popup-confirm-${electronic.id}">
                <div class="popup-box">
                  <span class="popup-close-button">&times;</span>
                  <div class="popup-header">
                    <span class="popup-category">Electronic</span>
                  </div>
                  <h1 class="popup-title">${electronic.name}</h1>
                  <p class="popup-subtitle"></p>
                  <div class="popup-details">
                    <div class="popup-detail">
                      <span class="popup-detail-label">Price:</span>
                      ${electronic.price.format()}
                    </div>
                  </div>
                  <button
                    class="popup-button"
                    hx-post="/game/market/electronics"
                    hx-vals='{"itemId": "${electronic.id}"}'
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
