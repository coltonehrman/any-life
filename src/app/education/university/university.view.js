import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();

export class UniversityView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${player.education &&
          player.education.university &&
          player.education.university.enrolled === true
            ? html`<div class="section-heading">University</div>
                ${navItem.print({
                  href: "/game/education/university/courses",
                  headingText: "Courses",
                  blurbText: "View your university courses.",
                  icon: "arrow",
                })}
                ${navItem.print({
                  headingText: "Drop Out",
                  blurbText: "Drop out of university.",
                  onClick: "showPopup('#popup-confirm-dropout')",
                  icon: "check",
                })}

                <div
                  id="popup-confirm-dropout"
                  style="display: none;"
                  class="popup-backdrop"
                >
                  <div class="popup-box">
                    <span class="popup-close-button">&times;</span>
                    <h1>Drop Out</h1>

                    <p>Drop out of college.</p>

                    <button
                      hx-post="/game/education/university/dropout"
                      hx-target="#popup-result"
                      hx-swap="outerHTML"
                      class="popup-button"
                    >
                      Drop out
                    </button>
                  </div>
                </div>

                <div class="section-heading">Interactions</div>

                ${navItem.print({
                  href: "/game/education/university/students",
                  headingText: "Students",
                  blurbText: "Interact with students.",
                  icon: "arrow",
                })}
                ${navItem.print({
                  href: "/game/education/university/faculty",
                  headingText: "Faculty",
                  blurbText: "Interact with your teachers.",
                  icon: "arrow",
                })}

                <div class="section-heading">
                  Extracurricular Activities
                  <p>
                    <small
                      >Join clubs and organizations to build networks.</small
                    >
                  </p>
                </div>

                ${navItem.print({
                  headingText: "Join the Debate Team",
                  blurbText:
                    "Improve your negotiation skills, making deals more favorable.",
                })}
                ${navItem.print({
                  headingText: "Participate in the Entrepreneurship Club",
                  blurbText:
                    "Get access to business ideas and potential investors.",
                })} `
            : ""}
          ${!player.education ||
          !player.education.university ||
          player.education.university.enrolled !== true
            ? html`
                <div class="section-heading">
                  Bachelor's Degree Programs
                  <p>
                    <small>Choose from various majors to specialize in.</small>
                  </p>
                </div>

                ${navItem.print({
                  attributes: `
                    hx-post="/game/education/university/enroll"
                    hx-vals='{"major": "Business"}'
                    hx-trigger="click"
                    hx-target="#popup-result"
                    hx-swap="outerHTML"
                  `,
                  headingText: "Major in Business Administration - $5,000",
                  blurbText:
                    "Gain knowledge to manage your illicit operations more effectively.",
                })}
                ${navItem.print({
                  attributes: `
                    hx-post="/game/education/university/enroll"
                    hx-vals='{"major": "Computer Science"}'
                    hx-trigger="click"
                    hx-target="#popup-result"
                    hx-swap="outerHTML"
                  `,
                  headingText: "Major in Computer Science - $5,000",
                  blurbText:
                    "Learn hacking skills, useful for cybercrimes and evading law enforcement.",
                })}
                ${navItem.print({
                  attributes: `
                    hx-post="/game/education/university/enroll"
                    hx-vals='{"major": "Medical Chemistry"}'
                    hx-trigger="click"
                    hx-target="#popup-result"
                    hx-swap="outerHTML"
                  `,
                  headingText: "Major in Medical Chemistry - $5,000",
                  blurbText:
                    "Gain knowledge on to create and sell your own product.",
                })}
                ${navItem.print({
                  attributes: `
                    hx-post="/game/education/university/enroll"
                    hx-vals='{"major": "Psychology"}'
                    hx-trigger="click"
                    hx-target="#popup-result"
                    hx-swap="outerHTML"
                  `,
                  headingText: "Major in Psychology - $5,000",
                  blurbText:
                    "Learn to manipulate and deceive law enforcement and anyone else who you encounter.",
                })}
              `
            : ""}
        </div>

        <div id="popup-result" class="popup"></div>
      `,
    });
  }
}
