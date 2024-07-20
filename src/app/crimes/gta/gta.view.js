import { css, html } from "../../../utils.js";

import { GamePageView } from "../../../views/game.view";
import { MapView } from "../../map/map.view.js";

export class GTAView extends GamePageView {
  constructor({ req }) {
    super();

    this._req = req;
    this.mapView = new MapView(this.addCss.bind(this));
  }

  get rootPath() {
    return this._req.baseUrl + this._req.path;
  }

  print({ player, cars }) {
    this.addCss(
      "gta",
      css`
        .main-content {
          margin: 2rem;
        }
      `
    );

    return super.print({
      player,
      body: html`
        <div class="main-content">
          <div class="header">
            <h3>Grand Theft Auto</h3>
          </div>

          <div class="sub-header">
            <div>
              <h3>Street</h3>
            </div>

            <div class="links">
              <a
                class="${this._req.path === "/gta" ? "active" : ""}"
                href="/game/gta"
                >Steal</a
              >
              <a
                class="${this._req.path === "/gta/storage" ? "active" : ""}"
                href="/game/gta/storage"
                >Storage</a
              >
            </div>
          </div>

          <div class="gta">
            ${this.mapView.print({
              mapIcon: "/public/images/street-cars.jpg",
              pins: cars.map((car) => ({
                name: car.name,
                link: car.id,
                icon: car.icon,
                x: car.x + "%",
                y: car.y + "%"
              })),
              rootPath: this.rootPath,
            })}
          </div>
        </div>
      `,
    });
  }
}
