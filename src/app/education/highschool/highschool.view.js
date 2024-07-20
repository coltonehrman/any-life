import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();

export class HighschoolView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          <div class="section-heading">High School</div>
          <div class="section-heading">Interactions</div>

          ${navItem.print({
            href: "/game/education/highschool/students",
            headingText: "Students",
            blurbText: "Interact with students.",
            icon: "arrow",
          })}
          ${navItem.print({
            href: "/game/education/highschool/faculty",
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
