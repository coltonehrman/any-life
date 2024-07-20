import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();

export class KindergardenView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${player.education &&
          player.education.kindergarden &&
          player.education.kindergarden.enrolled === true
            ? html`<div class="section-heading">Kindergarden</div>
                <div class="section-heading">Interactions</div>

                ${navItem.print({
                  href: "/game/education/kindergarden/students",
                  headingText: "Students",
                  blurbText: "Interact with students.",
                  icon: "arrow",
                })}
                ${navItem.print({
                  href: "/game/education/kindergarden/faculty",
                  headingText: "Faculty",
                  blurbText: "Interact with your teachers.",
                  icon: "arrow",
                })}`
            : ""}
        </div>

        <div id="popup-result" class="popup"></div>
      `,
    });
  }
}
