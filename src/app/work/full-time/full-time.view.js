import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { PopupView } from "../../../views/popup.view.js";
import { fullTimeJobs } from "./jobs.data.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();
const popup = new PopupView();

export class FullTimeView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${fullTimeJobs
            .map(
              (j) => html`
                ${navItem.print({
                  onClick: `showPopup('#popup-confirm-${j.id}')`,
                  headingText: j.job,
                  blurbText: `${j.salary.format()}`,
                  icon: "check",
                })}
                ${popup.print({
                  popupId: `popup-confirm-${j.id}`,
                  type: "confirm",
                  headingText: j.job,
                  bodyText: "Apply for this full-time position today!",
                  formAttributes: `
                    hx-post="/game/work/full-time/${j.id}/apply"
                    hx-trigger="submit"
                    hx-swap="outerHTML"
                    hx-target="#popup-result"
                  `,
                  details: [
                    ["Occupation", j.job],
                    ["Employer", j.employer],
                    ["Salary", j.salary.format()],
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
