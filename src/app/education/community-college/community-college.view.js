import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();

export class CommunityCollegeView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${player.education &&
          player.education.type === "COMMUNITY_COLLEGE" &&
          player.education.enrolled === true
            ? html`<div class="section-heading">Current</div>
                ${navItem.print({
                  href: "/game/education/class/courses",
                  headingText: "Community College",
                  blurbText: "Grades",
                  blurbProgress: player.education.grades,
                  icon: "arrow",
                })}
                </div>`
            : ""}

          <div class="section-heading">
            Basic classes
            <p>
              <small
                >Start with general education courses to build a strong
                foundation.</small
              >
            </p>
          </div>

          ${navItem.print({
            disabled: player.education["PYSCHOLOGY"],
            attributes: `
              hx-post="/game/education/community-college/take-course"
              hx-vals='{"course": "PYSCHOLOGY"}'
              hx-trigger="click"
              hx-target="#popup-result"
              hx-swap="outerHTML"
            `,
            headingText: "Take Introduction to Psychology - $0",
            blurbText:
              "Learn the basics of human behavior and mind, improving your charisma and understanding of people's motives.",
          })}
          ${navItem.print({
            disabled: player.education["ENGLISH_101"],
            attributes: `
              hx-post="/game/education/community-college/take-course"
              hx-vals='{"course": "ENGLISH_101"}'
              hx-trigger="click"
              hx-target="#popup-result"
              hx-swap="outerHTML"
            `,
            headingText: "Attend English 101 - $0",
            blurbText:
              "Improve your communication skills, making your interactions more effective and persuasive.",
          })}

          <div class="section-heading">
            Technical Skills Program
            <p>
              <small>Get hands-on training in various trades.</small>
            </p>
          </div>

          ${navItem.print({
            disabled: player.education["AUTO_REPAIR"],
            attributes: `
              hx-post="/game/education/community-college/take-course"
              hx-vals='{"course": "AUTO_REPAIR"}'
              hx-trigger="click"
              hx-target="#popup-result"
              hx-swap="outerHTML"
            `,
            headingText: "Learn Basic Auto Repair - $500",
            blurbText:
              "Gain skills to fix vehicles, which can be useful for your hustle operations.",
          })}
          ${navItem.print({
            disabled: player.education["COOKING"],
            attributes: `
              hx-post="/game/education/community-college/take-course"
              hx-vals='{"course": "COOKING"}'
              hx-trigger="click"
              hx-target="#popup-result"
              hx-swap="outerHTML"
            `,
            headingText: "Take a Cooking Class - $500",
            blurbText:
              "Learn to cook gourmet meals, improving health stats and impressing dates.",
          })}

          <div id="popup-result" class="popup-backdrop"></div>
        </div>
      `,
    });
  }
}
