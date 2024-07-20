import { GamePageView } from "../../views/game.view";
import { html } from "../../utils.js";

export class WeaponsView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      body: html`<div class="ui-container">
        <div class="section-heading">Weapons</div>

        <div class="nav-item" onclick="showPopup('#m16-popup-confirm')">
          <div class="nav-text">
            <span class="nav-heading">M16</span>
            <span class="nav-blurb">$1,300</span>
          </div>
          <span class="nav-arrow">...</span>
        </div>

        <div class="popup-backdrop" id="m16-popup-confirm">
          <div class="popup-box">
            <span class="popup-close-button">&times;</span>
            <div class="popup-header">
              <span class="popup-category">Weapon</span>
            </div>
            <h1 class="popup-title">M16</h1>
            <p class="popup-subtitle">A powerful rifle!</p>
            <div class="popup-details">
              <div class="popup-detail">
                <span class="popup-detail-label">Price:</span> $1,300
              </div>
            </div>
            <button
              class="popup-button"
              hx-post="/game/market/weapons"
              hx-vals='{"item": "M16"}'
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

        <div id="popup-result" class="popup-backdrop"></div>
      </div>`,
    });
  }
}
