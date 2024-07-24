import { GamePageView } from "../../../views/game.view";
import { billowProperties } from "./properties.data.js";

export class BillowView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player: player,
      Body: () => (
        <div class="ui-container">
          <div class="section-heading">Properties</div>
          {billowProperties.map((p) => (
            <>
              <div
                class="nav-item"
                __htmlonclick={`showPopup('#popup-confirm-${p.id}')`}
              >
                <div class="nav-text">
                  <span class="nav-heading">
                    {p.property} ({p.beds}br/{p.baths}ba)
                  </span>
                  <span class="nav-blurb">{p.price.format()}</span>
                </div>
                <span class="nav-arrow">...</span>
              </div>

              <div class="popup-backdrop" id={`popup-confirm-${p.id}`}>
                <div class="popup-box">
                  <span class="popup-close-button">&times;</span>
                  <div class="popup-header">
                    <span class="popup-category">Property</span>
                  </div>
                  <h1 class="popup-title">{p.property}</h1>
                  <p class="popup-subtitle">{p.description}</p>

                  <div class="popup-details">
                    <div class="popup-detail">
                      <span class="popup-detail-label">Price:</span>
                      {p.price.format()}
                    </div>

                    <div class="popup-detail">
                      <span class="popup-detail-label">Address:</span>
                      {p.address}
                    </div>

                    <div class="popup-detail">
                      <span class="popup-detail-label">Beds:</span> {p.beds}
                    </div>

                    <div class="popup-detail">
                      <span class="popup-detail-label">Baths:</span>
                      {p.baths}
                    </div>

                    <div class="popup-detail">
                      <span class="popup-detail-label">Year:</span> {p.year}
                    </div>
                  </div>

                  <div class="progress-section">
                    <div class="progress-label">
                      <span>Condition</span>
                      <span>{p.condition}%</span>
                    </div>
                    <div class="progress-track">
                      <div
                        class="progress-fill"
                        style="width: ${p.condition}%;"
                      ></div>
                    </div>
                  </div>

                  <button
                    class="popup-button"
                    hx-post="/game/real-estate/mortgage"
                    hx-vals={`{"propertyId": "${p.id}"}`}
                    hx-target="#popup-result"
                    hx-swap="outerHTML"
                  >
                    Apply for a mortgage
                  </button>

                  <button
                    class="popup-button"
                    hx-post="/game/real-estate/buy"
                    hx-vals={`{"propertyId": "${p.id}"}`}
                    hx-target="#popup-result"
                    hx-swap="outerHTML"
                  >
                    Buy it with cash
                  </button>
                </div>
              </div>
            </>
          ))}
          <div id="popup-result" class="popup-backdrop"></div>
        </div>
      ),
    });
  }
}
