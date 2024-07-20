import { GamePageView } from "../../../../views/game.view";
import { NavItem } from "../../../../views/nav-item.view";

export class StudentsView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      Body: () => (
        <div class="ui-container">
          <div class="section-heading">Students</div>
          {player.education.university.students.map((student) => {
            return (
              <NavItem
                href={`/game/relationship/${student.id}`}
                headingText={student.name}
                blurbText="Relationship"
                blurbProgress={student.relationship}
                icon="arrow"
              />
            );
          })}
        </div>
      ),
    });
  }
}
