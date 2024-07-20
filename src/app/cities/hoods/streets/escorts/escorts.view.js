import { css, html } from "../../../../../utils.js";

import { GamePageView } from "../../../../../views/game.view";

export class EscortsView extends GamePageView {
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

        .escorts-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .escort-image {
          max-height: 250px;
        }

        .escort-card {
          background-color: lightgray;
          padding: 20px;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .escort-details {
          flex: 1;
        }

        .escort-details h2 {
          margin-top: 0;
        }

        .escort-actions {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .escort-actions label {
          margin-bottom: 5px;
        }

        .escort-actions input[type="number"] {
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
            <h1>Escorts</h1>
          </div>
          <div class="escorts-list">
            ${player.escorts
              .filter((p) => p.street === player.location.street)
              .map(
                (escort) => html`
                  <div class="escort-card">
                    <img class="escort-image" src="${escort.image}" />
                    <div class="escort-details">
                      <h2>${escort.name}</h2>
                      <p>
                        <strong>Earnings:</strong> ${escort.earnings.format()}
                      </p>
                    </div>

                    <div class="escort-actions">
                      <form
                        method="POST"
                        action="${escort.street
                          .href}/escorts/${escort.id}/collect"
                      >
                        <button class="button">Collect</button>
                      </form>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `,
    });
  }
}
