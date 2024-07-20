import { css, html } from "../../../../../utils.js";

import { GamePageView } from "../../../../../views/game.view";

export class PushersView extends GamePageView {
  constructor({ req, street }) {
    super();

    this._req = req;
    this.street = street;
  }

  print({ player }) {
    this.addCss(
      "pushers",
      css`
        .main-content {
          margin: 2rem;
        }

        .main-content .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0;
          margin-bottom: 2rem;
        }

        .header h1 {
          margin: 0;
        }

        .pushers-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .pusher-card {
          background-color: lightgray;
          padding: 20px;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .pusher-details {
          flex: 1;
        }

        .pusher-details h2 {
          margin-top: 0;
        }

        .pusher-actions {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pusher-actions label {
          margin-bottom: 5px;
        }

        .pusher-actions input[type="number"] {
          width: 100px;
          padding: 5px;
          margin-bottom: 10px;
        }
      `
    );

    return super.print({
      player,
      body: html`
        <div class="main-content">
          <div class="header">
            <h1>Drug Pushers</h1>
          </div>
          <div class="pushers-list">
            ${player.pushers
              .filter((p) => p.street === player.location.street)
              .map(
                (pusher) => html`
                  <div class="pusher-card">
                    <div class="pusher-details">
                      <h2>${pusher.name}</h2>
                      <p>
                        <strong>Earnings:</strong> ${pusher.earnings.format()}
                      </p>
                      <p><strong>Drug Type:</strong> ${pusher.drugType}</p>
                      <p><strong>Supply:</strong> ${pusher.drugSupply}g</p>
                    </div>

                    <div class="pusher-actions">
                      <label for="supply-drugs">Supply Drugs:</label>

                      <form
                        method="POST"
                        action="${player.location.street
                          .href}/pushers/${pusher.id}/supply"
                      >
                        <input type="hidden" name="id" value="${pusher.id}" />
                        <input
                          type="number"
                          id="supply-drugs"
                          name="supply-amount"
                          value="0"
                          min="0"
                        />

                        <button class="button">Supply</button>
                      </form>

                      <form
                        method="POST"
                        action="${player.location.street
                          .href}/pushers/${pusher.id}/collect"
                      >
                        <button class="button">Collect</button>
                      </form>
                    </div>
                  </div>
                `
              )}
          </div>
        </div>
      `,
    });
  }
}
