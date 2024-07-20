import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { PopupView } from "../../../views/popup.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();
const popup = new PopupView();

export class PartTimeJobView extends GamePageView {
  constructor() {
    super();
  }

  print({ player, job }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${navItem.print({
            attributes: html`
              hx-post="/game/work/part-time/job/${job.id}/work"
              hx-target="#popup-result" hx-swap="outerHTML"
            `,
            headingText: "Work",
            blurbText: "Put in some hours at your job",
            icon: "check",
          })}
        </div>

        <div class="popup-backdrop" id="popup-result"></div>
      `,
    });
  }
}
