import { GamePageView } from "../../views/game.view";
import { NavItem } from "../../views/nav-item.view";

export class MarketplaceView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      Body: () => (
        <div class="ui-container">
          <div class="section-heading">Specialty Vehicle Dealers</div>

          <NavItem
            disabled
            headingText="Appaloosa Aircraft Brokers"
            blurbText="Shop for airplanes"
            icon="arrow"
          />
          <NavItem
            disabled
            headingText="Atlantic Yacht Sales"
            blurbText="Shop for boats & more"
            icon="arrow"
          />

          <div class="section-heading">Pleasures</div>

          <NavItem
            disabled={player.age < 12}
            href="/game/market/food"
            headingText="Fast Food"
            blurbText="Shop for fast-food"
            icon="arrow"
          />

          <NavItem
            disabled
            headingText="Tickets"
            blurbText="Watch a sports game live"
            icon="arrow"
          />

          <NavItem
            disabled={player.age < 12}
            href="/game/market/electronics"
            headingText="Toover Electronics Sales"
            blurbText="Shop for electronics"
            icon="arrow"
          />

          <div class="section-heading">21+ Shops</div>

          <NavItem
            disabled
            headingText="Liquor Store"
            blurbText="Shop for alcohol"
            icon="arrow"
          />

          <NavItem
            disabled={player.age < 21}
            href="/game/market/weapons"
            headingText="Paradise Gun Shop"
            blurbText="Shop for guns"
            icon="arrow"
          />
        </div>
      ),
    });
  }
}
