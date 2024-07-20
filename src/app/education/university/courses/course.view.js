import { GamePageView } from "../../../../views/game.view";
import { NavItemView } from "../../../../views/nav-item.view.js";
import { html } from "../../../../utils.js";

const navItem = new NavItemView();

export class CourseView extends GamePageView {
  constructor() {
    super();
  }

  print({ player, course, progress, level, disabled, courseHeadingText }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          <div class="section-heading">${courseHeadingText}</div>

          <div class="progress-section">
            <div class="progress-label">
              <span>Progress</span><span id="course-level">Level ${level}</span>
            </div>

            <div class="progress-track">
              <div
                id="course-progress"
                class="progress-fill"
                style="width: ${progress}%;"
              ></div>
            </div>
          </div>

          ${navItem.print({
            attributes: html`
              hx-post="/game/education/university/courses/${course}/study"
              hx-target="#popup-result" hx-swap="outerHTML"
            `,
            headingText: "Study",
            blurbText: html`Study to gain 10% progress<br /><small
                >(Costs 1 time token)</small
              >`,
            disabled,
            icon: "check",
          })}
          ${navItem.print({
            attributes: html`
              hx-post="/game/education/university/courses/${course}/tutor"
              hx-target="#popup-result" hx-swap="outerHTML"
            `,
            headingText: "Tutor",
            blurbText: html`Pay a tutor $50 to gain 20% progress<br /><small
                >(Costs 1 time token)</small
              >`,
            disabled,
            icon: "check",
          })}
        </div>

        <div id="popup-result" class="popup-backdrop"></div>
      `,
    });
  }
}
