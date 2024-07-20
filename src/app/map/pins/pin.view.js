import { Chance } from "chance";
import { html } from "../../../utils.js";

const chance = new Chance();

export class PinView {
  constructor({ x, y, icon, iconTitle, headingText, popup }) {
    this.x = x ?? chance.integer({ min: 1, max: 89 }) + "%";
    this.y = y ?? chance.integer({ min: 12, max: 83 }) + "%";
    this.icon = icon ?? "/public/images/map-pin.svg";
    this.iconTitle = iconTitle;
    this.headingText = headingText;
    this.popup = popup;
  }

  print() {
    return html`
      <div
        style="top: ${this.y}; left: ${this.x};"
        class="map-pin"
        onclick="togglePopup(event)"
      >
        <img class="" src="${this.icon}" />
        <div class="icon-tag">${this.iconTitle}</div>

        ${this.popup.print()}
      </div>
    `;
  }
}
