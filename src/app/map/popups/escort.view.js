import { css, html } from "../../../utils.js";

export class EscortPopupView {
  constructor({ player, escort }) {
    this.player = player;
    this.escort = escort;
  }

  css = css`
    .map-popup {
      background-color: #ecf0f1;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      width: 300px;
    }

    .map-popup-header {
      background-color: #34495e;
      color: #ecf0f1;
      padding: 10px;
      text-align: center;
    }

    .map-popup-body {
      padding: 20px;
    }

    .map-popup-body img {
      max-width: 100%;
    }

    .attributes {
      margin-bottom: 20px;
    }

    .attribute {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .attribute-label {
      font-weight: bold;
    }

    .actions {
      display: flex;
      flex-direction: column;
    }

    .action-button {
      background-color: #3498db;
      border: none;
      border-radius: 4px;
      color: #ecf0f1;
      cursor: pointer;
      padding: 10px;
      margin-bottom: 10px;
      transition: background-color 0.3s;
    }

    .action-button:hover {
      background-color: #2980b9;
    }

    .rob-button {
      background-color: #f39c12; /* Yellow color for caution */
    }

    .rob-button:hover {
      background-color: #e67e22; /* Darker yellow on hover */
    }

    .service-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
    }

    .service-price {
      font-size: 18px;
      font-weight: bold;
    }

    .service-button {
      background-color: #3498db;
      border: none;
      border-radius: 4px;
      color: #ecf0f1;
      cursor: pointer;
      padding: 10px;
      transition: background-color 0.3s;
    }

    .service-button:hover {
      background-color: #2980b9;
    }

    .close-button {
      background-color: #e74c3c;
      border: none;
      border-radius: 4px;
      color: #ecf0f1;
      cursor: pointer;
      padding: 10px 20px;
      transition: background-color 0.3s;
    }

    .close-button:hover {
      background-color: #c0392b;
    }
  `;

  print() {
    return html`
      <div id="popup-${this.escort.id}" class="escort-popup map-popup">
        <div class="map-popup-header">
          <h2>Escort</h2>
        </div>

        <div class="map-popup-body">
          <img src="${this.escort.image}" />

          <div class="attributes">
            <div class="attribute">
              <span class="attribute-label">Name:</span>
              <span class="attribute-value">${this.escort.name}</span>
            </div>

            <div class="attribute">
              <span class="attribute-label">Health:</span>
              <span class="attribute-value">${this.escort.health}%</span>
            </div>

            ${this.escort.worksFor === this.player
              ? html`<div class="attribute">
                  <span class="attribute-label">Earnings:</span>
                  <span class="attribute-value"
                    >${this.escort.earnings.format()}</span
                  >
                </div>`
              : ""}
          </div>

          <div class="actions">
            ${!this.escort.worksFor
              ? html` <button
                  hx-post="${this.escort.street.href}/escorts/${this.escort
                    .id}/hire"
                  hx-target="#popup-${this.escort.id}"
                  hx-swap="outerHTML"
                  class="action-button"
                >
                  Attempt Hire
                </button>`
              : ""}
            ${this.escort.worksFor === this.player
              ? html`<form
                  method="POST"
                  action="${this.escort.street.href}/escorts/${this.escort
                    .id}/collect"
                >
                  <button class="action-button">Collect</button>
                </form>`
              : ""}
            ${this.escort.worksFor !== this.player
              ? html` <button
                  hx-post="${this.escort.street.href}/escorts/${this.escort
                    .id}/rob"
                  hx-target=".map"
                  hx-swap="outerHTML"
                  class="action-button rob-button"
                >
                  Rob<br /><small>(Lose 1 Street Cred)</small>
                </button>`
              : ""}
          </div>

          <div class="service-section">
            <span class="service-price"
              >${this.escort.earningsPerHour.format()}</span
            >
            <button
              hx-post="${this.escort.street.href}/escorts/${this.escort.id}/pay"
              hx-target="#popup-${this.escort.id}"
              hx-swap="outerHTML"
              class="service-button"
            >
              Pay for Service
            </button>
          </div>
        </div>

        <button class="close-button">Close</button>
      </div>
    `;
  }
}
