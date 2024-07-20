import { GamePageView } from "../../../../views/game.view";
import { html } from "../../../../utils.js";

export class StudentsView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          <div class="section-heading">Students</div>

          ${player.education.middleschool.students
            .map((student) => {
              return html`
                <a href="/game/relationship/${student.id}" class="nav-item">
                  <div class="nav-text">
                    <span class="nav-heading">${student.name}</span>
                    <div class="nav-blurb">
                      Popularity
                      <div class="progress-track">
                        <div
                          class="progress-fill"
                          style="width: ${student.popularity}%;"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <span class="nav-arrow">&rarr;</span>
                </a>
              `;
            })
            .join("")}
        </div>
      `,
    });
  }
}
