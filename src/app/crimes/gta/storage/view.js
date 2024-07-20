import { css, html } from "../../../../utils.js";

import { GamePageView } from "../../../../views/game.view";

class GTAStorageView extends GamePageView {
  constructor({ req }) {
    super();
    this._req = req;
  }

  print({ player, cars }) {
    this.addCss(
      "gta-storage",
      css`
        .gta-storage {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          background-color: grey;
          border-radius: 5px;
          padding: 1.5rem;
        }

        .car {
          width: calc(100% / 3 - 1rem);
          background-color: lightgray;
          border-radius: 5px;
          padding: 1.5rem;
        }

        .car img {
          width: 100%;
        }

        .car h5,
        .car p {
          color: white;
          font-size: 2rem;
          font-weight: bold;
        }

        .car p {
          font-size: 3rem;
        }
      `
    );

    return super.print({
      player,
      body: html`
        <div class="header">
          <h3>Grand Theft Auto</h3>
        </div>

        <div class="sub-header">
          <h3>Storage</h3>

          <div class="links">
            <a href="/game/gta">Steal</a>
            <a class="active" href="/game/gta/storage">Storage</a>
          </div>
        </div>

        <div class="gta-storage">
          ${cars
            .map(
              (car) => html`
                <div class="car">
                  <img src="/public/images/car-image.svg" />

                  <h5>${car.brand} ${car.name} ${car.model}</h5>

                  <p>${car.value.format()}</p>

                  <div class="actions">
                    <a class="button" href="/game/gta/${car.id}/chop">Chop</a>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>
      `,
    });
  }
}

export default GTAStorageView;
