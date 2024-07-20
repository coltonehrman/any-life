import { GamePageView } from "../../../../views/game.view";
import { html } from "../../../../utils.js";

export class EmployeesView extends GamePageView {
  constructor() {
    super();
  }

  print({ player, job }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          <div class="section-heading">Co-Workers</div>

          ${job.employees
            .map((employee) => {
              return html`
                <a href="/game/relationship/${employee.id}" class="nav-item">
                  <div class="nav-text">
                    <span class="nav-heading">${employee.name}</span>
                    <div class="nav-blurb">
                      Relationship
                      <div class="progress-track">
                        <div
                          class="progress-fill"
                          style="width: ${employee.relationship}%;"
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
