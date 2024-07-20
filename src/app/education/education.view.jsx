import { GamePageView } from "../../views/game.view";
import { NavItem } from "../../views/nav-item.view.js";
import { html } from "../../utils.js";

export class EducationView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      Body: () => (
        <>
          <div class="ui-container">
            {player.education.kindergarden &&
              player.education.kindergarden.enrolled && (
                <>
                  <div class="section-heading">Kindergarden</div>
                  <NavItem
                    href="/game/education/kindergarden"
                    headingText="Kindergarden"
                    blurbText="Grades"
                    blurbProgress={player.education.kindergarden.grades}
                    icon="arrow"
                  />
                </>
              )}

            {player.education.elementary &&
              player.education.elementary.enrolled && (
                <>
                  <div class="section-heading">Elementary School</div>
                  <NavItem
                    href="/game/education/elementary"
                    headingText="Elementary School"
                    blurbText="Grades"
                    blurbProgress={player.education.elementary.grades}
                    icon="arrow"
                  />
                </>
              )}

            {player.education.middleschool &&
              player.education.middleschool.enrolled && (
                <>
                  <div class="section-heading">Middle School</div>
                  <NavItem
                    href="/game/education/middleschool"
                    headingText="Middle School"
                    blurbText="Grades"
                    blurbProgress={player.education.middleschool.grades}
                    icon="arrow"
                  />
                </>
              )}

            {player.education.highschool &&
              player.education.highschool.enrolled && (
                <>
                  <div class="section-heading">High School</div>
                  <NavItem
                    href="/game/education/highschool"
                    headingText="High School"
                    blurbText="Grades"
                    blurbProgress={player.education.highschool.grades}
                    icon="arrow"
                  />
                </>
              )}

            {player.education &&
            player.education.type === "COMMUNITY_COLLEGE" &&
            player.education.enrolled === true
              ? html`<div class="section-heading">School</div></div>`
              : ""}
            <div class="section-heading">Options</div>

            <NavItem
              disabled={player.age <= 18}
              href="/game/education/community-college"
              headingText="Community College"
              blurbText="Take some local classes"
              icon="arrow"
            />

            <NavItem
              disabled={player.age <= 18}
              href="/game/education/university"
              headingText="University"
              blurbText="Visit your university"
              icon="arrow"
            />

            <NavItem
              disabled
              headingText="Graduate School"
              blurbText="Continue your university focus"
              icon="check"
            />

            <NavItem
              disabled
              headingText="Business School"
              blurbText="Study to be a business leader"
              icon="check"
            />

            <NavItem
              disabled
              headingText="Dental School"
              blurbText="Study to be a dentist"
              icon="check"
            />

            <NavItem
              disabled
              headingText="Law School"
              blurbText="Study to be a lawyer"
              icon="check"
            />

            <NavItem
              disabled
              headingText="Medical School"
              blurbText="Study to be a doctor"
              icon="check"
            />

            <NavItem
              disabled
              headingText="Nursing School"
              blurbText="Study to be a nurse"
              icon="check"
            />

            <NavItem
              disabled
              headingText="Pharmacy School"
              blurbText="Study to be a pharmacist"
              icon="check"
            />

            <NavItem
              disabled
              headingText="Veterinary School"
              blurbText="Study to be a veterinarian"
              icon="check"
            />
          </div>

          <div id="popup-result" class="popup-backdrop"></div>
        </>
      ),
    });
  }
}
