import { css, html } from "../../utils.js";

import { CrimeController } from "./crime.controller.js";
import { GamePageView } from "../../views/game.view";
import humanizeDuration from "humanize-duration";

export class CrimesView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    this.addCss(
      "crimes",
      css`
        h2 {
          color: white;
        }

        .main-content {
          margin: 2rem;
        }

        .crimes {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: center;
          justify-content: space-around;
        }

        .crime {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: calc((100% / 4) - 2rem);
          color: black;
          background-color: #feffe9;
          text-align: center;
          border-radius: 5px;
        }

        .crime img {
          max-width: 100%;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .crime-content {
          padding: 3rem;
        }

        .crime a {
          width: 100%;
          border-top: 3px solid white;
          text-align: center;
          padding: 1rem;
        }
      `
    );

    return super.print({
      player,
      body: html`
        <div class="main-content">
          <h2>Crimes</h2>
          <div class="crimes">
            ${Object.entries(CrimeController.CRIMES)
              .map(([crime, opts]) => {
                let waitTime = "can commit Now";

                const diff =
                  (opts.interval || CrimeController.CRIME_INTERVAL) -
                  (Date.now() - player.crimes[crime].last);

                if (player.crimes[crime].last !== null) {
                  if (diff > 0)
                    waitTime = `can commit in ${humanizeDuration(diff, {
                      round: true,
                    })}`;
                }

                return html` <div class="crime">
                  <img src="${opts.thumbnail}" />

                  <div class="crime-content">
                    <h4 style="margin: 0; margin-top: 1rem;">
                      <b>${crime} (${opts.chance}% Chance)</b>
                    </h4>

                    <h5 style="margin: 0;">
                      Commited: ${player.crimes[crime].committed} times
                    </h5>
                  </div>

                  ${player.crimes[crime].last === null || diff <= 0
                    ? html`<a
                        href="/game/crime?commit=${encodeURIComponent(crime)}"
                        >Commit</a
                      >`
                    : html`<a href="#">${waitTime}</a>`}
                </div>`;
              })
              .join("")}
          </div>
        </div>
      `,
    });
  }
}
