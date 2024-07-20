import { css, html } from "../../../utils.js";

export class PusherPopupView {
  constructor({ player, pusher }) {
    this.player = player;
    this.pusher = pusher;
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

    .map-popup-header h2 {
      margin-top: 1rem;
    }

    .map-popup-body {
      margin-top: 1rem;
      margin-bottom: 1rem;
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

    .attribute-value {
      background-color: #f0f0f0;
      border-radius: 4px;
      padding: 2px 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

    .negotiate-section,
    .supply-section,
    .buy-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
    }

    .negotiate-input,
    .supply-input,
    .buy-input {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 5px;
      font-size: 1.75rem;
      flex: 1;
      max-width: 75%;
    }

    .negotiate-button,
    .supply-button,
    .buy-button {
      background-color: #3498db;
      border: none;
      border-radius: 4px;
      color: #ecf0f1;
      cursor: pointer;
      padding: 10px;
      transition: background-color 0.3s;
      margin-left: 1rem;
      width: 100%;
    }

    .negotiate-button:hover,
    .supply-button:hover,
    .buy-button:hover {
      background-color: #2980b9;
    }

    .close-button {
      background-color: #e74c3c;
      border: none;
      border-radius: 4px;
      width: 100%;
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
      <div
        id="popup-${this.pusher.id}"
        class="pusher-popup map-popup"
      >
        <div class="map-popup-header">
          <h2>Drug Pusher</h2>
        </div>

        <div class="map-popup-body">
          <div class="attributes">
            <div class="attribute">
              <span class="attribute-label">Name:</span>
              <span class="attribute-value">${this.pusher.name}</span>
            </div>

            <div class="attribute">
              <span class="attribute-label">Earnings:</span>
              <span class="attribute-value"
                >${this.pusher.earnings.format()}</span
              >
            </div>

            <div class="attribute">
              <span class="attribute-label">Supply:</span>
              <span class="attribute-value">${this.pusher.drugSupply}g</span>
            </div>

            <div class="attribute">
              <span class="attribute-label">Drug Type:</span>
              <span class="attribute-value">${this.pusher.drugType}</span>
            </div>

            <div class="attribute">
              <span class="attribute-label">Drug Price:</span>
              <span class="attribute-value drug-price"
                >${this.pusher.playerNegotiatedPrices
                  .get(this.player)
                  ?.format() ?? this.pusher.drugPrice.format()}</span
              >
            </div>
          </div>

          <div class="actions">
            ${!this.pusher.worksFor
              ? html`<button
                  hx-post="${this.pusher.street.href}/pushers/${this.pusher
                    .id}/hire"
                  hx-target="#popup-${this.pusher.id}"
                  hx-swap="outerHTML"
                  class="action-button"
                >
                  Attempt Hire
                </button>`
              : ""}
            ${this.pusher.worksFor === this.player
              ? html`<form
                  method="POST"
                  action="${this.pusher.street.href}/pushers/${this.pusher
                    .id}/collect"
                >
                  <button class="action-button">Collect</button>
                </form>`
              : ""}
            ${this.pusher.worksFor !== this.player
              ? html`<button
                  hx-post="${this.pusher.street.href}/pushers/${this.pusher
                    .id}/rob"
                  hx-target=".map"
                  hx-swap="outerHTML"
                  class="action-button rob-button"
                >
                  Rob<br /><small>(Lose 1 Street Cred)</small>
                </button>`
              : ""}
            ${this.pusher.worksFor !== this.player &&
            !this.pusher.playerNegotiatedPrices.has(this.player)
              ? html`<div class="negotiate-section">
                  <input
                    type="number"
                    class="negotiate-input"
                    placeholder="Offer Price"
                    min="0"
                    name="negotiate-offer"
                  />
                  <button
                    hx-post="${this.pusher.street.href}/pushers/${this.pusher
                      .id}/negotiate"
                    hx-include="#popup-${this.pusher
                      .id} [name='negotiate-offer']"
                    hx-target="#popup-${this.pusher.id}"
                    hx-swap="outerHTML"
                    class="negotiate-button"
                  >
                    Negotiate
                  </button>
                </div>`
              : ""}
            ${this.pusher.worksFor === this.player
              ? html`<form
                  method="POST"
                  action="${this.pusher.street.href}/pushers/${this.pusher
                    .id}/supply"
                  class="supply-section"
                >
                  <input
                    type="number"
                    class="supply-input"
                    placeholder="Quantity"
                    name="supply-amount"
                    min="0"
                  />
                  <button class="supply-button">Supply</button>
                </form>`
              : ""}
            ${this.pusher.worksFor !== this.player
              ? html`<div class="buy-section">
                  <input
                    type="number"
                    name="buy-amount"
                    class="buy-input"
                    placeholder="Quantity"
                    min="0"
                  />
                  <button
                    hx-post="${this.pusher.street.href}/pushers/${this.pusher
                      .id}/buy"
                    hx-include="#popup-${this.pusher.id} [name='buy-amount']"
                    hx-target="#popup-${this.pusher.id}"
                    hx-swap="outerHTML"
                    class="buy-button"
                  >
                    Buy
                  </button>
                </div>`
              : ""}
          </div>
        </div>

        <button class="close-button">Close</button>
      </div>
    `;
  }
}
