import { css, html } from "../../../utils.js";

export class MissionPopup {
  css = css`
    .mission-popup {
      max-width: 70%;
      padding: 1.5rem;
    }

    .mission-popup img {
      width: 100%;
      margin-top: calc(-250px / 2);
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }

    .mission-popup .header {
      margin: 2rem calc(-1.5rem - 1px);
      background-color: grey;
      padding: 2rem;
      border-radius: 0;
    }

    .mission-popup .header .title {
      width: 100%;
      text-align: center;
      font-size: 2rem;
      color: white;
      margin-bottom: 0;
    }

    .mission-popup .body p {
      margin-top: 1rem;
      text-align: center;
    }

    .mission-popup .body a {
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
    }

    .close-button {
      margin-top: 1rem;
    }
  `;

  print({ id, description, text, buttonText, buttonHref }) {
    return html`<div id="popup-${id}" class="mission-popup map-popup">
      <img src="/public/images/mission-header.jpg" />

      <div class="header"><p class="title">${description}</p></div>

      <div class="body">
        <p>${text}</p>
        <a class="button" href="${buttonHref}">${buttonText}</a>
        <button class="close-button button">Close</button>
      </div>
    </div>`;
  }
}
