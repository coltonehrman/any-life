import { css, html } from "../../utils.js";

import humanizeDuration from "humanize-duration";

export class MissionsView {
  constructor(addCss = () => {}) {
    this.addCss = addCss;
  }

  _addCss() {
    this.addCss(
      "missions",
      css`
        .missions {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        .missions h2 {
          color: white;
          margin-bottom: 2rem;
        }

        .mission {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          background-color: #ffffff;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          width: 100%;
          margin-bottom: 2rem;
        }

        .mission > div {
          flex: 1;
        }

        .mission .details {
          flex: 2;
        }

        .mission .mission-header {
          display: flex;
          align-items: center;
          padding: 2rem;
          margin-bottom: 0;
        }

        .mission .thumbnail {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          margin-right: 10px;
        }

        .mission .info {
          flex-grow: 1;
        }

        .mission .info h3 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }

        .mission .info p {
          margin: 2px 0;
          font-size: 1.25rem;
          color: #666;
        }

        .mission .details p {
          margin: 2px 0;
          font-size: 1.25rem;
          color: #666;
        }

        .mission .rewards {
          display: flex;
          justify-content: space-between;
          margin: 1rem 0;
        }

        .mission .reward-box {
          background-color: #f0f0f0;
          border-radius: 4px;
          padding: 5px;
          width: 32%;
          text-align: center;
        }

        .mission .reward-box p {
          margin: 0;
          font-size: 0.9em;
          color: #666;
        }

        .mission .custom-progress-bar {
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          height: 6px;
          margin-top: 5px;
        }

        .mission .custom-progress-bar > .progress {
          background-color: #007bff;
          height: 6px;
          width: 0;
          transition: width 0.3s;
        }

        .mission .actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
      `
    );
  }

  print({ player, street }) {
    const missions = player.missions.filter((m) => {
      if (street) {
        if (m.street !== street) return false;
      }

      return true;
    });

    if (missions.length === 0) return "";

    this._addCss();

    return html`
      <div class="missions" hx-swap-oob="outerHTML:.missions">
        <h2>Missions</h2>

        ${missions
          .map((mission) => {
            return html`
              <div class="mission">
                <div class="mission-header">
                  <img class="thumbnail" src="${mission.thumbnail}" />

                  <div class="info">
                    <h3>${mission.title}</h3>
                    <p>Given by: <strong>John Doe</strong></p>
                    <p>
                      Time Limit:
                      <strong>${humanizeDuration(mission.timeLimit)}</strong>
                    </p>
                  </div>
                </div>

                <div class="details">
                  <p>${mission.parts[mission.progress].description}</p>

                  ${mission.parts[mission.progress].status?.() ?? ""}

                  <div class="status-chip">
                    ${mission.didStart
                      ? mission.failed
                        ? "Failed"
                        : "In Progress"
                      : "Not Started"}
                  </div>

                  ${!mission.failed
                    ? html`<div class="custom-progress-bar">
                        <div
                          class="progress"
                          style="width: ${mission.progressPercent}%;"
                        ></div>
                      </div>`
                    : ""}
                  ${!mission.failed && mission.didStart
                    ? html`<p>
                        Time Left:
                        <strong
                          >${humanizeDuration(
                            Date.now() - (mission.startedAt + mission.timeLimit)
                          )}</strong
                        >
                      </p>`
                    : ""}

                  <div class="rewards">
                    <div class="reward-box">
                      <p>Cash</p>
                      <p>
                        <strong>${mission.rewards.cash.text}</strong>
                      </p>
                    </div>

                    <div class="reward-box">
                      <p>XP</p>
                      <p>
                        <strong>${mission.rewards.xp}</strong>
                      </p>
                    </div>

                    <div class="reward-box">
                      <p>Street Cred</p>
                      <p>
                        <strong>${mission.rewards.streetCred}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="actions">
                  ${!mission.failed
                    ? html` ${mission.progressPercent >= 100
                          ? html` <a
                              href="/game/mission/${mission.id}/complete"
                              class="button"
                              >Complete</a
                            >`
                          : ""}
                        <a href="${mission.parts[0].goTo}" class="button"
                          >Go to Area</a
                        >`
                    : ""}
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }
}
