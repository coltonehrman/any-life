import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();

export class FullTimeJobView extends GamePageView {
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
              hx-post="/game/work/full-time/job/${job.id}/work"
              hx-target="#popup-result" hx-swap="outerHTML"
            `,
            headingText: "Work",
            blurbText: "Put in some hours at your job",
          })}
          ${navItem.print({
            href: `/game/work/full-time/job/${job.id}/employees`,
            headingText: "Co-Workers",
            blurbText: "Interact with your co-workers",
            icon: "arrow",
          })}
          ${navItem.print({
            attributes: html`
              hx-post="/game/work/full-time/job/${job.id}/quit"
              hx-target="#popup-result" hx-swap="outerHTML"
            `,
            headingText: "Quit",
            blurbText: "Quit your job",
          })}
        </div>

        <div class="popup-backdrop" id="popup-result"></div>
      `,
    });
  }
}
