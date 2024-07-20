import { NavItem } from "../views/nav-item.view";

<NavItem
  hx-post="/game/activities/gym"
  hx-target="#popup-result"
  hx-swap="outerHTML"
  headingText="Gym"
  blurbText="Go to the gym"
/>;

<NavItem
  href="/game/"
  headingText="NAME (RELATION)"
  blurbText="Relationship"
  blurbProgress={80}
  icon="arrow"
/>;
