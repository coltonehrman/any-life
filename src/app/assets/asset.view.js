import { GamePageView } from "../../views/game.view";
import { PopupView } from "../../views/popup.view";
import { html } from "../../utils.js";

const popup = new PopupView();

export class AssetView extends GamePageView {
  constructor() {
    super();
  }

  print({ player, asset }) {
    return super.print({
      player: player,
      body: html`<div class="ui-container">
        <div class="section-heading">Possession</div>
        <div class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">${asset.name}</span>
            <div class="item-skill">
              Skill:
              <div class="progress-track">
                <div class="progress-fill" style="width: 70%;"></div>
              </div>
            </div>
          </div>
          <span class="nav-arrow">...</span>
        </div>

        <div class="section-heading">Activities</div>

        <div class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">Social Media</span>
            <span class="nav-blurb">Post on social media</span>
          </div>
          <span class="nav-arrow">...</span>
        </div>

        <div class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">Text</span>
            <span class="nav-blurb">Text Someone</span>
          </div>
          <span class="nav-arrow">...</span>
        </div>

        <div class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">Call</span>
            <span class="nav-blurb">Call Someone</span>
          </div>
          <span class="nav-arrow">...</span>
        </div>

        ${asset.type === "ELECTRONIC" && asset.isHacked !== true
          ? html`
              <div class="nav-item" onclick="showPopup('#popup-confirm-virus')">
                <div class="nav-text">
                  <span class="nav-heading">Send Virus</span>
                  <span class="nav-blurb"
                    >Send someone a Virus to try and hack their phone.</span
                  >
                </div>
                <span class="nav-arrow">...</span>
              </div>

              ${popup.print({
                popupId: "popup-confirm-virus",
                type: "confirm",
                headingText: "Send a Virus",
                bodyText: "Send someone a Virus to hack their phone.",
                formAttributes: `
                  hx-post="/game/assets/action/send-virus"
                  hx-trigger="submit"
                  hx-swap="outerHTML"
                  hx-target="#popup-result"
                `,
                formLabel: "Pick your victim:",
                formSelectName: "victim",
                formOptions: [
                  {
                    val: "",
                    text: "Select victim",
                  },
                ].concat(
                  player.allConnections.map((contact) => ({
                    val: contact.id,
                    text: contact.name,
                  }))
                ),
                formSubmitText: "Send virus",
              })}
            `
          : ""}

        <a href="#" class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">Discard</span>
            <span class="nav-blurb">Get rid of it</span>
          </div>
          <span class="nav-arrow">...</span>
        </a>

        ${asset.type === "WEAPON"
          ? html`
              <a href="#" class="nav-item">
                <div class="nav-text">
                  <span class="nav-heading">Attack</span>
                  <span class="nav-blurb">Shoot someone</span>
                </div>
                <span class="nav-arrow">...</span>
              </a>

              <a href="#" class="nav-item">
                <div class="nav-text">
                  <span class="nav-heading">Practice</span>
                  <span class="nav-blurb">Go to the shooting range</span>
                </div>
                <span class="nav-arrow">...</span>
              </a>
            `
          : ""}

        <a href="#" class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">Sell</span>
            <span class="nav-blurb">Sell it</span>
          </div>
          <span class="nav-arrow">...</span>
        </a>

        ${asset.type === "WEAPON"
          ? html`
              <a href="#" class="nav-item">
                <div class="nav-text">
                  <span class="nav-heading">Hunt</span>
                  <span class="nav-blurb">Hunt some wildlife</span>
                </div>
                <span class="nav-arrow">...</span>
              </a>
            `
          : ""}

        <div id="popup-result"></div>
      </div>`,
    });
  }
}
