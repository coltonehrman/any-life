import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();

export class MiddleschoolView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          <div class="section-heading">Middle School</div>
          <div class="section-heading">Interactions</div>

          ${navItem.print({
            href: "/game/education/middleschool/students",
            headingText: "Students",
            blurbText: "Interact with students.",
            icon: "arrow",
          })}
          ${navItem.print({
            href: "/game/education/middleschool/faculty",
            headingText: "Faculty",
            blurbText: "Interact with your teachers.",
            icon: "arrow",
          })}
        </div>

        <div id="popup-result" class="popup"></div>
      `,
    });
  }
}
