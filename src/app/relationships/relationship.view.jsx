import { ACTIONS } from "./actions.data.js";
import { GamePageView } from "../../views/game.view";
import { NavItemView } from "../../views/nav-item.view.js";
import { html } from "../../utils.js";

const navItem = new NavItemView();

export class RelationshipView extends GamePageView {
  constructor() {
    super();
  }

  print({ player, npc }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          <div class="section-heading">Relationship</div>

          <div class="nav-item" onclick="showPopup(event, '#profile-popup')">
            <div class="nav-text">
              <span class="nav-heading">${npc.name} (${
        npc.relation ?? "Acquaintance"
      })</span>
              
              <div class="nav-blurb">
                ${npc.gender} (${npc.age}) - ${npc.cash?.format() ?? "$0"}
              </div>

              <div class="nav-blurb">
                ${npc.dead ? "Dead" : npc.profession ?? "None"}
              </div>

              <div class="nav-blurb">
                Relationship
                <div class="ml-2 progress-track">
                  <div
                    class="progress-fill"
                    style="width: ${npc.relationship}%;"
                  ></div>
                </div>
              </div>
            </div>
            <span class="nav-icon">...</span>
          </div>

          <div
            class="popup popup-backdrop"
            id="profile-popup"
          >
            <div class="popup-box">
              <div class="popup-header">
                <span class="popup-category">Profile</span>
              </div>
              
              <h1 class="popup-title">${npc.name}</h1>
              
              <div class="popup-details">                
                <div class="popup-detail">
                  <span class="popup-detail-label">Occupation:</span>
                  <span class="popup-detail-value">${
                    npc.occupation ?? "None"
                  }</span>
                </div>

                <div class="popup-detail">
                  <span class="popup-detail-label">Age:</span>
                  <span class="popup-detail-value">${npc.age}</span>
                </div>

                <div class="popup-detail">
                  <span class="popup-detail-label">Cash:</span>
                  <span class="popup-detail-value">${
                    npc.cash?.format() ?? "$0"
                  }</span>
                </div>

                <div class="popup-detail">
                  <span class="popup-detail-label">Mood:</span>
                  <span class="popup-detail-value">${
                    npc.mood ?? "Unknown"
                  }</span>
                </div>
              </div>

              <div class="popup-stats">
                <div class="popup-stat">
                  <span class="popup-stat-label">Looks:</span>
                  <div class="progress-track">
                    <div class="progress-fill" style="width: ${
                      npc.looks
                    }%;"></div>
                  </div>
                </div>
                
                <div class="popup-stat">
                  <span class="popup-stat-label">Health:</span>
                  <div class="progress-track">
                    <div class="progress-fill" style="width: ${
                      npc.health
                    }%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <p class="click-to-close">Click anywhere to close this message</p>
          </div>

          <div class="section-heading">Actions</div>

          ${Object.keys(ACTIONS)
            .map(
              (key) => html`
                <div class="accordion-section">
                  <div class="accordion-header">
                    <span>${key}</span>
                    <span class="accordion-icon">▼</span>
                  </div>

                  <div class="accordion-content">
                    ${ACTIONS[key]
                      .map((action) =>
                        navItem.print({
                          attributes: `
                            hx-post="/game/relationship/${npc.id}"
                            hx-vals='{"action": "${action.key}"}'
                            hx-target="#popup-result"
                            hx-swap="outerHTML"
                          `,
                          disabled: npc.dead || npc?.actions?.[action.key] !== true,
                          headingText: action.title,
                          blurbText: action.blurb,
                        })
                      )
                      .join("")}
                  </div>
                </div>
              `
            )
            .join("")}
          </div>

          <div id="popup-result" style="display: none;" class="popup-backdrop">
            <div class="popup-box">
              <h1>Class mates</h1>
              <p>
                You had a conversation with, {NAME}, about whether or not a hot
                dog qualifies as a sandwich.
              </p>

              <div>
                <div>
                  Agreement
                  <div class="progress-track">
                    <div class="progress-fill" style="width: 50%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="popup-bottom-text">Tap anywhere to continue</div>
          </div>
        </div>
      `,
    });
  }
}
