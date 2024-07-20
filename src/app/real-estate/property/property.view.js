import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();

export class PropertyView extends GamePageView {
  constructor() {
    super();
  }

  print({ player, property }) {
    return super.print({
      player: player,
      body: html`<div class="ui-container">
        <div class="section-heading">Property</div>
        ${navItem.print({
          headingText: property.property,
        })}

        <div class="section-heading">Management</div>
        ${navItem.print({
          headingText: "Amenities",
        })}
        ${navItem.print({
          headingText: "Inspect",
        })}
        ${navItem.print({
          headingText: "Rent",
        })}
        ${navItem.print({
          headingText: "Upgrade",
        })}

        <div class="section-heading">Activities</div>
        ${navItem.print({
          headingText: "Gift",
        })}
        ${navItem.print({
          headingText: "Party",
        })}
        ${navItem.print({
          headingText: "Renovate",
        })}
        ${navItem.print({
          headingText: "Sell",
        })}
      </div>`,
    });
  }
}
