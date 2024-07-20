import { GamePageView } from "../../views/game.view";
import { NavItem } from "../../views/nav-item.view.js";
import { css } from "../../utils.js";

export class WorkView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    this.addCss(
      "work",
      css`
        .work-container {
          width: 100%;
          background-color: #333;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          color: white;
        }
      `
    );

    return super.print({
      player,
      Body: () => (
        <div class="work-container">
          {player.careers.length > 0 && (
            <>
              <div class="section-heading">Careers</div>

              {player.careers.map((job) => (
                <NavItem
                  href={`/game/work/special-careers/${job.type}`}
                  headingText={job.title}
                  blurbText="View your career"
                  icon="arrow"
                />
              ))}
            </>
          )}

          {player.jobs.filter((j) => j.type === "Full-Time" && j.quit !== true)
            .length > 0 && (
            <>
              <div class="section-heading">Full-Time Jobs</div>

              {player.jobs
                .filter((j) => j.type === "Full-Time" && j.quit !== true)
                .map((job) => (
                  <NavItem
                    href={`/game/work/full-time/job/${job.id}`}
                    headingText={job.job}
                    blurbText="View your full-time job"
                    icon="arrow"
                  />
                ))}
            </>
          )}

          {player.jobs.filter((j) => j.type === "Part-Time").length > 0 && (
            <>
              <div class="section-heading">Part-Time Jobs</div>

              {player.jobs
                .filter((j) => j.type === "Part-Time")
                .map((job) => (
                  <NavItem
                    href={`/game/work/part-time/job/${job.id}`}
                    headingText={job.job}
                    blurbText="View your part-time job"
                    icon="arrow"
                  />
                ))}
            </>
          )}
          <div class="section-heading">Options</div>
          <NavItem
            disabled={player.age <= 12}
            href="/game/work/freelance"
            headingText="Freelance Gigs"
            blurbText="Make some quick money"
            icon="arrow"
          />
          <NavItem
            disabled
            headingText="Job Recruiter"
            blurbText="Visit the job recruiter"
            icon="check"
          />
          <NavItem
            disabled={player.age < 18}
            href="/game/work/full-time"
            headingText="Jobs"
            blurbText="Browse full-time job listings"
            icon="arrow"
          />
          <NavItem
            disabled={player.age < 18}
            href="/game/work/military"
            headingText="Military"
            blurbText="Join the military"
            icon="arrow"
          />
          <NavItem
            disabled={player.age < 16}
            href="/game/work/part-time"
            headingText="Part-Time Jobs"
            blurbText="Browse hourly job listings"
            icon="arrow"
          />
          <a href="/game/work/special-careers" class="nav-item">
            <div class="nav-text">
              <span class="nav-heading">Special Careers</span>
              <span class="nav-blurb">Find a special career</span>
            </div>
            <span class="nav-arrow">&rarr;</span>
          </a>
        </div>
      ),
    });
  }
}
