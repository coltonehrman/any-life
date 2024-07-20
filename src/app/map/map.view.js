import { css, html } from "../../utils.js";

import { Chance } from "chance";
import { Mission } from "../missions/mission.model.js";
import { MissionPopup } from "./popups/mission.js";
import { NPCS } from "../npcs/types.js";
import { PinView } from "./pins/pin.view.js";

export class MapView {
  constructor(addCss) {
    this.addCss = addCss;

    this.missionPopup = new MissionPopup();
  }

  _addCss() {
    this.addCss(
      "map",
      css`
        .map {
          position: relative;
          width: 100%;
        }

        @media screen and (max-width: 600px) {
          .map {
            margin-left: -2rem;
            width: calc(100% + 4rem);
          }
        }

        .map-overlay {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }

        .map-pin {
          position: absolute;
          text-align: center;
          cursor: pointer;
        }

        .map-pin .icon {
          background-color: white;
          border-radius: 50%;
        }

        .map-pin .icon-tag {
          text-decoration: none;
          background-color: white;
          color: black;
          border-radius: 5px;
          padding: 1rem;
          font-weight: bold;
          margin-top: 0.5rem;
          text-align: center;
        }

        @media screen and (max-width: 600px) {
          .map-pin .icon-tag {
            display: none;
          }
        }

        .map-pin > img,
        .map-pin > a > img {
          max-height: 50px;
          max-width: 50px;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-timing-function: ease-in-out;
          animation-iteration-count: 3;
          filter: drop-shadow(0px 2px 8px black) drop-shadow(0px 2px 8px black);
        }

        .map-popup {
          display: none;
          cursor: default;
          position: absolute;
          top: -50px;
          left: -50px;
          width: auto;
          min-width: 300px;
          background-color: #ffffff;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 10px;
          z-index: 1000;
        }

        @media screen and (max-width: 600px) {
          .map-popup {
            position: fixed;
            top: 1rem;
            left: 1rem;
            right: 1rem;
            max-height: 90%;
            max-width: 100% !important;
            width: calc(100% - 2rem) !important;
            overflow-y: scroll;
          }
        }

        .map-popup .header .title {
          font-weight: bold;
          font-size: 2rem;
        }

        .map-popup h3 {
          font-size: 1.75rem;
          margin-bottom: 10px;
          color: #333;
        }

        .map-popup p {
          font-family: "Kameron", sans-serif;
          font-size: 1.5rem;
          font-weight: normal;
          color: #666;
          text-align: center;
        }

        .map-popup .header {
          padding: 2rem;
        }

        .map-popup .section {
          margin-bottom: 20px;
        }

        .map-popup .section p {
          font-size: 1.75rem;
        }

        .map-popup .button {
          width: 100%;
          text-align: center;
        }

        .map-popup.fiend-popup {
          width: 300px;
        }

        .map-popup.fiend-popup .section {
          background-color: #f9f9f9;
          border-radius: 4px;
          padding: 10px;
          border: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0;
        }

        ${this.missionPopup.css}

        .drug-to-sell {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: lightgray;
          padding: 1rem;
          font-weight: bold;
        }

        .default-popup.left {
          left: calc(-25vw - 15px);
        }

        .default-popup .icon {
          font-size: 2rem;
        }

        .default-popup .header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .default-popup .body {
          display: flex;
          flex-direction: column;
        }

        .default-popup .body .button {
          display: inline-block;
          color: white;
          padding: 10px;
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
          transition: background-color 0.3s;
        }

        .default-popup .body .button:hover {
          background-color: #0056b3;
        }
      `
    );
  }

  _printFiendPopup({ rootPath, npc }) {
    const offer = npc.buyingDrugs;

    return html`
      <div id="popup-${npc.id}" class="fiend-popup map-popup">
        <div class="header">
          <span class="title">${offer.type}</span>
        </div>
        <div class="body">
          <div class="section">
            <h3>Quantity</h3>
            <p>${offer.quantity}g</p>
          </div>

          <div class="section">
            <h3>Price per Gram</h3>
            <p>${offer.price.format()}/g</p>
          </div>

          <div class="section">
            <h3>Total Price</h3>
            <p>${offer.price.multiply(offer.quantity).format()}</p>
          </div>

          <div>
            <p>
              Can I get <strong>${offer.quantity}g</strong> of
              <strong>${offer.type}</strong> for
              <strong>${offer.price.multiply(offer.quantity).format()}</strong>
              @ <strong>${offer.price.format()}/g</strong>?
            </p>
          </div>

          <button
            class="button"
            hx-post="${rootPath}/sell"
            hx-vals='{"npcId": "${npc.id}"}'
            hx-target=".map"
            hx-swap="outerHTML"
          >
            Sell
          </button>

          <button class="close-button button">Close</button>
        </div>
      </div>
    `;
  }

  _printMissionPopup({ rootPath, npc }) {
    return html`
      <div class="map-popup mission-popup">
        <div class="body">
          <div class="drug-to-sell">
            <span>${npc.drugType}</span>
            <span>${npc.quantity}g</span>
          </div>

          <p>
            I need you to push <b><u>${npc.quantity}g</u></b> of
            <b><u>${npc.drugType}</u></b> for me @
            <b><u>${npc.price.format()}/g</u></b> for a total of
            <b><u>${npc.price.multiply(npc.quantity).format()}</u></b
            >.
          </p>

          <a class="button" href="${rootPath}/accept?mission=${npc.id}"
            >Accept</a
          >
        </div>
      </div>
    `;
  }

  _printDefaultPopup({ header, sections = [], buttonHref }) {
    return html`<div class="map-popup default-popup">
      <div class="header">
        <span class="title">${header}</span>
      </div>

      <div class="body">
        ${sections
          .map(({ title, body, css }) => {
            if (css) {
              this.addCss("popup-" + title, css);
            }

            return html`
              <div class="section">
                <h3>${title}</h3>
                ${body}
              </div>
            `;
          })
          .join("")}

        <a class="button" href="${buttonHref}">Go</a>

        <button class="close-button button">Close</button>
      </div>
    </div>`;
  }

  _printPopup({ type, header, buttonHref, rootPath, sections, npc }) {
    if (type === NPCS.FIEND) {
      return this._printFiendPopup({ rootPath, npc });
    } else if (npc && npc instanceof Mission) {
      return this._printMissionPopup({ rootPath, npc });
    } else {
      return this._printDefaultPopup({ header, sections, buttonHref });
    }
  }

  print({ rootPath, mapIcon, mapOverlay, pins = [] }) {
    this._addCss();

    return html`
      <div class="map">
        <div id="map-pins">
          ${pins
            .map((pin) => {
              const {
                name,
                link,
                icon,
                sections,
                popupType,
                npc,
                mission,
                x,
                y,
                popup,
              } = pin;

              if (pin instanceof PinView) {
                this.addCss("pin", pin.css);
                this.addCss(`popup-${popup.constructor.name}`, popup.css);
                return pin.print();
              }

              const chance = new Chance();
              let top = y || chance.integer({ min: 0, max: 100 }) + "%";
              let left = x || chance.integer({ min: 0, max: 100 }) + "%";

              let imageHtml = html`
                <img
                  class="${icon ? "icon" : ""}"
                  src="${icon ?? "/public/images/map-pin.svg"}"
                />
                <div class="icon-tag">${name}</div>
              `;

              if (mission) {
                const part = mission.parts[mission.progress];

                return html`
                  <div
                    style="top: ${top}; left: ${left};"
                    class="map-pin"
                    onclick="togglePopup(event)"
                  >
                    ${imageHtml}
                    ${this.missionPopup.print({
                      id: mission.currentNPC.id,
                      description: part.description,
                      text: mission.currentNPC.dialog,
                      buttonText: "Collect Drugs",
                      buttonHref: `/game/mission/${mission.id}/collect`,
                    })}
                  </div>
                `;
              }

              return html`
                <div
                  style="top: ${top}; left: ${left};"
                  class="map-pin"
                  onclick="togglePopup(event)"
                >
                  ${imageHtml}
                  ${this._printPopup({
                    type: popupType,
                    header: name,
                    buttonHref: `${rootPath}/${encodeURIComponent(
                      link || name
                    )}`,
                    npc,
                    sections,
                    rootPath,
                  })}
                </div>
              `;
            })
            .join("")}
        </div>

        <img style="width: 100%;" src="${mapIcon}" />

        ${mapOverlay ? html`<div class="map-overlay">${mapOverlay}</div>` : ""}
      </div>
    `;
  }
}
