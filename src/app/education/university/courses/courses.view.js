import { GamePageView } from "../../../../views/game.view";
import { NavItemView } from "../../../../views/nav-item.view.js";
import { html } from "../../../../utils.js";

const navItem = new NavItemView();

function getProgress(course) {
  if (!course) return 0;
  const innerProgress = course.progress / 4;
  const totalProgress = ((course.level - 1) / 4) * 100 + innerProgress;
  return totalProgress;
}

export class CoursesView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          <div class="section-heading">Courses</div>
          ${player.education.university.courses
            .map((c) =>
              navItem.print({
                href: `/game/education/university/courses/${c.course}`,
                headingText: c.course,
                blurbText: `${c.course} courses`,
                blurbProgress: getProgress(c),
              })
            )
            .join("")}
        </div>

        <div id="popup-result" class="popup-backdrop"></div>
      `,
    });
  }
}
