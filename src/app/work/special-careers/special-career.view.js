import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { PopupView } from "../../../views/popup.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();
const popup = new PopupView();

export class SpecialCareerView extends GamePageView {
  constructor() {
    super();
  }

  print({ player, career }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${navItem.print({
            headingText: career.title,
            blurbText: "Performance",
            blurbProgress: career.performance,
          })}
          ${career.type === "film-producer"
            ? html`
                ${navItem.print({
                  onClick: "showPopup('#popup-confirm-produce')",
                  headingText: "Production",
                  blurbText: "Produce a film",
                  icon: "check",
                })}

                <div class="section-heading">Activites</div>
                ${navItem.print({
                  headingText: "Directors & Screenwriters",
                  disabled: true,
                  icon: "arrow",
                })}
                ${navItem.print({
                  headingText: "Cast & Crew",
                  disabled: true,
                  icon: "arrow",
                })}
                ${navItem.print({
                  headingText: "Funding",
                  blurbText: "Seek funding",
                })}
                ${navItem.print({
                  headingText: "Filmography",
                  blurbText: "See your filmography",
                  icon: "arrow",
                })}
                ${popup.print({
                  popupId: "popup-confirm-produce",
                  type: "confirm",
                  headingText: "New Film",
                  bodyText: "Release a new film today!",
                  formAttributes: `
                    hx-post="/game/work/special-careers/${career.type}/produce"
                    hx-trigger="submit"
                    hx-swap="outerHTML"
                    hx-target="#popup-confirm-produce"
                  `,
                  details: [
                    ["Market Research Cost", "$2,500"],
                    ["Available Budget", "$2,800,000"],
                  ],
                  formLabel: "Pick your genre:",
                  formSelectName: "genre",
                  formOptions: [
                    {
                      val: "superhero-fiction",
                      text: "Superhero Fiction",
                    },
                    {
                      val: "comedy",
                      text: "Comedy",
                    },
                    {
                      val: "sci-fi",
                      text: "Sci-Fi",
                    },
                    {
                      val: "documentary",
                      text: "Documentary",
                    },
                    {
                      val: "family",
                      text: "Family",
                    },
                  ],
                  formSubmitText: "Practice skill",
                })}
              `
            : ""}
          ${career.type === "boxing"
            ? html`
                ${navItem.print({
                  attributes: html`
                    hx-post="/game/work/part-time/job//work"
                    hx-target="#popup-result" hx-swap="outerHTML"
                  `,
                  headingText: "Performance Enhancer",
                  blurbText: "Get a chemical boost",
                  icon: "check",
                })}
                ${navItem.print({
                  attributes: html`
                    hx-post="/game/work/part-time/job//work"
                    hx-target="#popup-result" hx-swap="outerHTML"
                  `,
                  headingText: "Physical Therapy",
                  blurbText: "Seek treatment for an injury",
                  icon: "check",
                })}
                ${navItem.print({
                  onClick: "showPopup('#practice-confirm')",
                  headingText: "Practice",
                  blurbText: "Practice on your skills",
                  icon: "check",
                })}
                ${popup.print({
                  popupId: "practice-confirm",
                  type: "confirm",
                  headingText: "Practice",
                  bodyText: "Work on you boxing skills.",
                  bodyHtml: html`
                    <div class="popup-progress-container">
                      <div class="popup-progress-row">
                        <span class="popup-progress-label">Swaying</span>
                        <div class="popup-progress">
                          <div
                            class="popup-progress-fill"
                            style="width: 70%;"
                          ></div>
                        </div>
                      </div>
                      <div class="popup-progress-row">
                        <span class="popup-progress-label">Blocking</span>
                        <div class="popup-progress">
                          <div
                            class="popup-progress-fill"
                            style="width: 60%;"
                          ></div>
                        </div>
                      </div>
                      <div class="popup-progress-row">
                        <span class="popup-progress-label">Stance</span>
                        <div class="popup-progress">
                          <div
                            class="popup-progress-fill"
                            style="width: 80%;"
                          ></div>
                        </div>
                      </div>
                      <div class="popup-progress-row">
                        <span class="popup-progress-label">Punching</span>
                        <div class="popup-progress">
                          <div
                            class="popup-progress-fill"
                            style="width: 75%;"
                          ></div>
                        </div>
                      </div>
                      <div class="popup-progress-row">
                        <span class="popup-progress-label">Ducking</span>
                        <div class="popup-progress">
                          <div
                            class="popup-progress-fill"
                            style="width: 65%;"
                          ></div>
                        </div>
                      </div>
                      <div class="popup-progress-row">
                        <span class="popup-progress-label">Footwork</span>
                        <div class="popup-progress">
                          <div
                            class="popup-progress-fill"
                            style="width: 85%;"
                          ></div>
                        </div>
                      </div>
                      <div class="popup-progress-row">
                        <span class="popup-progress-label">Parrying</span>
                        <div class="popup-progress">
                          <div
                            class="popup-progress-fill"
                            style="width: 50%;"
                          ></div>
                        </div>
                      </div>
                    </div>
                  `,
                  formAttributes: `
              hx-post="/game/work/special-careers/boxing/practice"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
                  formLabel: "Pick your focus:",
                  formSelectName: "focus",
                  formOptions: [
                    {
                      val: "footwork",
                      text: "Footwork",
                    },
                  ],
                  formSubmitText: "Practice skill",
                })}
                ${navItem.print({
                  attributes: html`
                    hx-post="/game/work/part-time/job/work"
                    hx-target="#popup-result" hx-swap="outerHTML"
                  `,
                  headingText: "Retire",
                  blurbText: "Hang up those gloves",
                  icon: "check",
                })}
              `
            : ""}
        </div>

        <div class="popup-backdrop" id="popup-result"></div>
      `,
    });
  }
}
