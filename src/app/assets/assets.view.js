import { GamePageView } from "../../views/game.view";
import { html } from "../../utils.js";

export class AssetsView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      body: html`<div class="ui-container">
        <div class="section-heading">Possessions</div>
        ${player.items
          .map(
            (item) => html`
              <a href="/game/assets/${item.id}" class="nav-item">
                <div class="nav-text">
                  <span class="nav-heading">${item.name}</span>
                  <span class="nav-blurb">View your possession</span>
                </div>
                <span class="nav-arrow">→</span>
              </a>
            `
          )
          .join("")}
      </div>`,
    });
  }
}
