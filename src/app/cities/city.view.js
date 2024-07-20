import { css, html } from "../../utils.js";

import { GamePageView } from "../../views/game.view";
import { MapView } from "../map/map.view.js";
import { MissionsView } from "../missions/missions.view.js";

export class CityView extends GamePageView {
  constructor({ req }) {
    super({ req });

    this.mapView = new MapView(this.addCss.bind(this));
    this.missionsView = new MissionsView(this.addCss.bind(this));
  }

  _addCss() {
    this.addCss(
      "city",
      css`
        .main-content {
          margin: 2rem;
        }

        .main-content h2 {
          color: white;
          margin-bottom: 2rem;
        }

        .city {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          background-color: lightgray;
        }
      `
    );
  }

  print(player) {
    this._addCss();

    const city = player.location.city;

    return super.print({
      player,
      body: html`
        <div class="main-content">
          <h2>Hoods in ${city.name}</h2>

          <div class="city">
            ${this.mapView.print({
              mapIcon: "/public/images/city-map.jpg",
              pins: city.hoods.map((h) => ({
                name: h.name,
                icon: h.icon,
                sections: [
                  { title: "Description", body: html`<p>${h.description}</p>` },
                  {
                    title: "Streets",
                    css: css`
                      .streets-list {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                      }

                      .street {
                        background-color: #f0f0f0;
                        padding: 5px;
                        border-radius: 4px;
                        text-align: center;
                        font-size: 1.5rem;
                        color: #333;
                      }
                    `,
                    body: html`
                      <div class="streets-list">
                        ${h.streets
                          .map(
                            (s) => html` <div class="street">${s.name}</div>`
                          )
                          .join("")}
                      </div>
                    `,
                  },
                ],
                x: h.location.x,
                y: h.location.y,
              })),
              rootPath: "/game/city/hoods",
            })}
          </div>

          ${this.missionsView.print({ player })}
          <div></div>
        </div>
      `,
    });
  }
}
