import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { PopupView } from "../../../views/popup.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();
const popup = new PopupView();

export class MilitaryView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${navItem.print({
            disabled: true,
            onClick: "showPopup('#bagger-confirm')",
            headingText: "Army",
            blurbText: "Join the Army",
            icon: "check",
          })}
          ${navItem.print({
            disabled: true,
            onClick: "showPopup('#bagger-confirm')",
            headingText: "Navy",
            blurbText: "Join the Navy",
            icon: "check",
          })}
          ${navItem.print({
            disabled: true,
            onClick: "showPopup('#bagger-confirm')",
            headingText: "Marines",
            blurbText: "Join the Marines",
            icon: "check",
          })}
          ${navItem.print({
            disabled: true,
            onClick: "showPopup('#bagger-confirm')",
            headingText: "Air Force",
            blurbText: "Join the Air Force",
            icon: "check",
          })}
          ${navItem.print({
            disabled: true,
            onClick: "showPopup('#bagger-confirm')",
            headingText: "Space Force",
            blurbText: "Join the Space Force",
            icon: "check",
          })}
        </div>

        <div class="popup-backdrop" id="popup-result"></div>
      `,
    });
  }
}
