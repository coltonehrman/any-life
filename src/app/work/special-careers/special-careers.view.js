import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { PopupView } from "../../../views/popup.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();
const popup = new PopupView();

export class SpecialCareersView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${navItem.print({
            disabled: player.age < 18,
            onClick: "showPopup('#popup-confirm-film-producer')",
            headingText: "Film Producer",
            blurbText: "Become a Hollywood film producer",
            icon: "check",
          })}
          ${popup.print({
            popupId: "popup-confirm-film-producer",
            type: "confirm",
            headingText: "Film Producer",
            bodyText: "Start your career as a Hollywood film producer today.",
            formAttributes: `
            hx-post="/game/work/special-careers/film-producer/start"
            hx-trigger="submit"
            hx-swap="outerHTML"
            hx-target="#popup-result"
          `,
            formSubmitText: "Start your career",
          })}
          ${navItem.print({
            disabled: player.age < 14,
            onClick: "showPopup('#popup-confirm-boxer')",
            headingText: "Boxing",
            blurbText: "Become a professional boxer",
            icon: "check",
          })}
          ${popup.print({
            popupId: "popup-confirm-boxer",
            type: "confirm",
            headingText: "Boxing Career",
            bodyText: "Start your career as a boxer today.",
            formAttributes: `
              hx-post="/game/work/special-careers/boxing/start"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
            formSubmitText: "Start your career",
          })}
        </div>

        <div class="popup-backdrop" id="popup-result"></div>
      `,
    });
  }
}
