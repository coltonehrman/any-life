import { css, html } from "../../../../utils.js";

import { GamePageView } from "../../../../views/game.view";
import { MapView } from "../../../map/map.view.js";

class GTACarView extends GamePageView {
  constructor({ req }) {
    super();

    this._req = req;
    this.mapView = new MapView(this.addCss.bind(this));
  }

  print({ player, car }) {
    this.addCss(
      "gta-car",
      css`
        .map-overlay {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          color: white !important;
          font-weight: bold !important;
        }

        .car-heading-text {
          flex: 1;
          font-weight: bold;
          font-size: 6rem;
        }

        .car-brand-heading {
          flex: 1;
          font-weight: bold;
          font-size: 5rem;
        }

        .split-view {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex: 5;
          width: 75%;
        }

        .car-stats-window {
          padding: 0.75rem;
          border-radius: 5px;
          background-color: rgba(211, 211, 211, 0.5);
        }

        .car-stats-window h5 {
          font-size: 2.5rem;
          font-weight: bold;
        }

        .car-stats {
          display: flex;
        }

        .car-stats > * {
          flex: 1;
          display: flex;
          gap: 1.5rem;
          flex-direction: column;
          justify-content: space-around;
        }

        .car-stats .stat-bars {
          flex: 2;
        }

        .car-stats > * > p {
          text-align: left;
          margin: 0;
        }

        .stat-values {
          margin-left: 1.5rem;
        }

        .car-price {
          padding: 2rem;
          border-radius: 5px;
          background-color: rgba(211, 211, 211, 0.5);
        }

        .car-price h5 {
          font-size: 5rem;
          font-weight: bold;
        }

        .actions {
          margin-bottom: 2rem;
        }

        .actions a {
          padding: 1rem 10rem;
          font-size: 2.5rem;
        }
      `
    );

    const canCommitGTA = true;

    return super.print({
      player,
      body: html`
        <div class="header">
          <h3>Grand Theft Auto</h3>
        </div>

        <div class="sub-header">
          <div class="links">
            <a href="/game/gta">Back</a>
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

        <div class="gta-car">
          ${this.mapView.print({
            mapIcon: "/public/images/car-display.jpg",
            rootPath: this.rootPath,
            mapOverlay: html`
              <h4 class="car-heading-text">CAR</h4>
              <h5 class="car-brand-heading">${car.brand}</h5>

              <div class="split-view">
                <div class="car-stats-window">
                  <h5>${car.brand} ${car.name} ${car.model}</h5>

                  <div class="car-stats">
                    <div class="stat-names">
                      <p>Acceleration (0-60 mph)</p>
                      <p>Top Speed</p>
                      <p>Handling</p>
                      <p>Condition</p>
                    </div>

                    <div class="stat-bars">
                      <div class="custom-progress-bar">
                        <p style="width: ${car.acceleration * 10}%"></p>
                      </div>

                      <div class="custom-progress-bar">
                        <p style="width: ${(car.topSpeed * 100) / 250}%"></p>
                      </div>

                      <div class="custom-progress-bar">
                        <p style="width: ${car.handling * 10}%"></p>
                      </div>

                      <div class="custom-progress-bar">
                        <p style="width: ${car.condition}%"></p>
                      </div>
                    </div>

                    <div class="stat-values">
                      <p>${car.acceleration}</p>
                      <p>${car.topSpeed} mph</p>
                      <p>${car.handling}</p>
                      <p>${car.condition}%</p>
                    </div>
                  </div>
                </div>

                <div class="car-price">
                  <h5>${car.value.format()}</h5>
                </div>
              </div>

              <div class="actions">
                ${canCommitGTA
                  ? html`<a
                      class="button"
                      href="${this._req.baseUrl + this._req.path}/rob"
                      >Rob</a
                    >`
                  : html`<a disabled class="button"
                      >Can attempt to Rob in ${1}</a
                    >`}
              </div>
            `,
          })}
        </div>
      `,
    });
  }
}

export default GTACarView;
