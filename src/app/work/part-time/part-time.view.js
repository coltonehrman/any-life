import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { PopupView } from "../../../views/popup.view.js";
import { html } from "../../../utils.js";
import { partTimeJobs } from "./jobs.data.js";

const navItem = new NavItemView();
const popup = new PopupView();

export class PartTimeView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${partTimeJobs
            .map(
              (j) => html`
                ${navItem.print({
                  onClick: `showPopup('#popup-confirm-${j.id}')`,
                  headingText: j.job,
                  blurbText: `$${j.hourlyRate}/hour`,
                  icon: "check",
                })}
                ${popup.print({
                  popupId: `popup-confirm-${j.id}`,
                  type: "confirm",
                  headingText: j.job,
                  bodyText: "Apply for this part-time position today!",
                  formAttributes: `
                    hx-post="/game/work/part-time/${j.id}/apply"
                    hx-trigger="submit"
                    hx-swap="outerHTML"
                    hx-target="#popup-result"
                  `,
                  details: [
                    ["Job", j.job],
                    ["Employer", j.employer],
                    ["Hourly Rate", "$" + j.hourlyRate],
                    ["Weekly Hours", j.weeklyHours],
                  ],
                  formSubmitText: "Apply for this position",
                })}
              `
            )
            .join("")}
        </div>

        <div class="popup-backdrop" id="popup-result"></div>
      `,
    });
  }
}
