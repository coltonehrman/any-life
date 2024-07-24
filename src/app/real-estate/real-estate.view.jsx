import { GamePageView } from "../../views/game.view";
import { NavItem } from "../../views/nav-item.view";

export class RealEstateView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player: player,
      Body: () => (
        <div class="ui-container">
          <div class="section-heading">Owned Properties</div>
          {player.properties.map((property) => (
            <NavItem
              disabled={player.age < 18}
              href={`/game/real-estate/property/${property.id}`}
              headingText={property.property}
              blurbText="Condition"
              blurbProgress={property.condition}
              icon="arrow"
            />
          ))}
          <div class="section-heading">Markets</div>

          <NavItem
            disabled={false && player.age < 18}
            href="/game/real-estate/billow"
            headingText="Billow"
            blurbText="Search for properties on Billow"
            icon="arrow"
          />
        </div>
      ),
    });
  }
}
