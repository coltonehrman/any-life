import { GamePageView } from "../../views/game.view";
import { NavItem } from "../../views/nav-item.view";

export class ActivitiesView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      Body: () => (
        <div class="ui-container">
          <div class="section-heading">Activities</div>

          <NavItem
            disabled={player.age < 12}
            hx-post="/game/activities/gym"
            hx-target="#popup-result"
            hx-swap="outerHTML"
            headingText="Gym"
            blurbText="Go to the gym"
          />

          <NavItem
            disabled={player.age < 12}
            hx-post="/game/activities/shower"
            hx-target="#popup-result"
            hx-swap="outerHTML"
            headingText="Shower"
            blurbText="Take a shower"
          />

          <NavItem
            disabled={player.age < 12}
            hx-post="/game/activities/walk"
            hx-target="#popup-result"
            hx-swap="outerHTML"
            headingText="Walk"
            blurbText="Go for a walk"
          />

          <NavItem
            disabled={player.age < 12}
            hx-post="/game/activities/meditate"
            hx-target="#popup-result"
            hx-swap="outerHTML"
            headingText="Meditate"
            blurbText="Practice meditation"
          />

          <NavItem
            disabled={player.age < 12}
            hx-post="/game/activities/movie"
            hx-target="#popup-result"
            hx-swap="outerHTML"
            headingText="Movies"
            blurbText="Go see a movie at the theatre"
          />

          <NavItem
            disabled={player.age < 21}
            hx-post="/game/activities/club"
            hx-target="#popup-result"
            hx-swap="outerHTML"
            headingText="Nightclub"
            blurbText="Go out to a nightclub"
          />

          <div id="popup-result" />
        </div>
      ),
    });
  }
}
