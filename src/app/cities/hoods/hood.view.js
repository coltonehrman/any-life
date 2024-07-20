import { css, html } from "../../../utils.js";

import { DRUGS } from "../../drugs/types.js";
import { GamePageView } from "../../../views/game.view";
import { MapView } from "../../map/map.view.js";
import { MissionsView } from "../../missions/missions.view.js";

export class HoodView extends GamePageView {
  constructor({ req }) {
    super({ req });

    this.mapView = new MapView(this.addCss.bind(this));
    this.missionsView = new MissionsView(this.addCss.bind(this));
  }

  print(player, hood) {
    this.addCss(
      "hood",
      css`
        .main-content {
          margin: 2rem;
        }

        .main-content h2 {
          color: white;
        }
      `
    );

    return super.print({
      player,
      body: html`
        <div class="main-content">
          <h2>Streets in ${hood.name}</h2>

          <div class="sub-header">
            <div class="links">
              <a href="/game/city">Back</a>
            </div>
          </div>

          <div class="hood">
            ${this.mapView.print({
              mapIcon: hood.mapImage,
              pins: hood.streets.map((s) => {
                const weed = s.drugs.find((d) => d.type === DRUGS.WEED);
                const cocaine = s.drugs.find((d) => d.type === DRUGS.COCAINE);
                const lsd = s.drugs.find((d) => d.type === DRUGS.LSD);
                const heroin = s.drugs.find((d) => d.type === DRUGS.HEROIN);

                return {
                  name: s.name,
                  icon: s.icon,
                  drugs: s.drugs,
                  sections: [
                    {
                      title: "Description",
                      body: html`<p>${s.description}</p>`,
                    },
                    {
                      title: "Drug Distribution",
                      css: css`
                        .drug-info {
                          display: grid;
                          grid-template-columns: 1fr 1fr;
                          gap: 10px;
                          margin-bottom: 20px;
                        }

                        .drug {
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          text-align: center;
                        }

                        .percentage {
                          font-weight: bold;
                          margin-top: 5px;
                          font-size: 1.2em;
                          color: grey;
                          background-color: #f0f0f0;
                          border-radius: 4px;
                          padding: 2px 6px;
                          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                      `,
                      body: html`
                        <div class="drug-info">
                          <div class="drug">
                            <i class="glyphicon glyphicon-cloud"></i>
                            <span>Weed</span>
                            <span class="percentage">${weed.chance}%</span>
                          </div>

                          <div class="drug">
                            <i class="glyphicon glyphicon-cloud"></i>
                            <span>Cocaine</span>
                            <span class="percentage">${cocaine.chance}%</span>
                          </div>

                          <div class="drug">
                            <i class="glyphicon glyphicon-cloud"></i>
                            <span>LSD</span>
                            <span class="percentage">${lsd.chance}%</span>
                          </div>

                          <div class="drug">
                            <i class="glyphicon glyphicon-cloud"></i>
                            <span>Heroin</span>
                            <span class="percentage">${heroin.chance}%</span>
                          </div>
                        </div>
                      `,
                    },
                    {
                      title: "Drug Stats",
                      css: css`
                        .drug-info {
                          display: grid;
                          grid-template-columns: 1fr 1fr;
                          gap: 10px;
                          margin-bottom: 20px;
                        }

                        .drug {
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          text-align: center;
                        }

                        .percentage {
                          font-weight: bold;
                          margin-top: 5px;
                          font-size: 1.2em;
                          color: grey;
                          background-color: #f0f0f0;
                          border-radius: 4px;
                          padding: 2px 6px;
                          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                      `,
                      body: html`
                        <div class="drug-info">
                          <div class="drug">
                            <span>Bought</span>
                            <span class="percentage"
                              >${s.stats.drugs.bought}</span
                            >
                          </div>

                          <div class="drug">
                            <span>Sold</span>
                            <span class="percentage"
                              >${s.stats.drugs.sold}</span
                            >
                          </div>
                        </div>
                      `,
                    },
                  ],
                  x: s.location.x,
                  y: s.location.y,
                };
              }),
              rootPath: `/game/city/hoods/${encodeURIComponent(
                hood.name
              )}/streets`,
            })}
          </div>

          ${this.missionsView.print({ player })}
        </div>
      `,
    });
  }
}
