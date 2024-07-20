import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();

export class ElementaryView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${player.education &&
          player.education.elementary &&
          player.education.elementary.enrolled === true
            ? html`<div class="section-heading">Elementary</div>
                <div class="section-heading">Interactions</div>

                ${navItem.print({
                  href: "/game/education/elementary/students",
                  headingText: "Students",
                  blurbText: "Interact with students.",
                  icon: "arrow",
                })}
                ${navItem.print({
                  href: "/game/education/elementary/faculty",
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
