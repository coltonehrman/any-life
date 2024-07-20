import { Chance } from "chance";
import { CommunityCollegeView } from "./community-college.view.js";
import { Money } from "../../items/money.model.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";

const chance = new Chance();

export const communityCollegeRouter = express.Router();

communityCollegeRouter.get("/", function (req, res) {
  const communityCollegeView = new CommunityCollegeView();
  const player = getPlayerById(req.session.playerId);

  return res.send(communityCollegeView.print({ player }));
});

communityCollegeRouter.post("/take-course", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const { course } = req.body;

  if (course === "PYSCHOLOGY") {
    if (chance.bool({ likelihood: 50 })) {
      player.education["PYSCHOLOGY"] = true;

      return res.send(html`
        <div id="popup-result" style="display: flex;" class="popup">
          <div class="max-w-[325px] popup-box text-white popup-content success">
            <h2>Success!</h2>
            <p>
              You have successfully completed the Introduction to Psychology
              course. Your understanding of human behavior has improved,
              boosting your charisma and helping you read people's motives
              better.
            </p>
          </div>
          <p class="popup-bottom-text">Click anywhere to close this message</p>
        </div>
      `);
    }

    return res.send(html`
      <div id="popup-result" style="display: flex;" class="popup">
        <div class="max-w-[325px] popup-box text-white popup-content fail">
          <h2>Failed</h2>
          <p>
            You struggled to grasp the concepts in the Introduction to
            Psychology course. You'll need to spend more time studying or
            consider seeking help from a tutor.
          </p>
        </div>
        <p class="popup-bottom-text">Click anywhere to close this message</p>
      </div>
    `);
  } else if (course === "ENGLISH_101") {
    if (chance.bool({ likelihood: 50 })) {
      player.education["ENGLISH_101"] = true;

      return res.send(html`
        <div id="popup-result" style="display: flex;" class="popup">
          <div class="max-w-[325px] popup-box text-white popup-content success">
            <h2>Success!</h2>
            <p>
              You aced English 101! Your communication skills have significantly
              improved, making your interactions more effective and persuasive.
            </p>
          </div>
          <p class="popup-bottom-text">Click anywhere to close this message</p>
        </div>
      `);
    }

    return res.send(html`
      <div id="popup-result" style="display: flex;" class="popup">
        <div class="max-w-[325px] popup-box text-white popup-content fail">
          <h2>Failed</h2>
          <p>
            You had a hard time keeping up with English 101. Consider attending
            study groups or asking for extra help to improve your understanding.
          </p>
        </div>
        <p class="popup-bottom-text">Click anywhere to close this message</p>
      </div>
    `);
  } else if (course === "AUTO_REPAIR") {
    const cost = new Money({
      dollars: 500,
    });

    if (!player.cash.greaterThanOrEqual(cost)) {
      return res.send(html`<div
        id="popup-result"
        style="display: flex;"
        class="popup"
      >
        <div class="max-w-[325px] popup-box text-white popup-content fail">
          <h2>Not enough cash</h2>
          <p>You don't have enough cash to take this course.</p>
        </div>
        <p class="popup-bottom-text">Click anywhere to close this message</p>
      </div>`);
    }

    player.cash = player.cash.subtract(cost);

    if (chance.bool({ likelihood: 50 })) {
      player.education["AUTO_REPAIR"] = true;

      return res.send(html`
        <div id="popup-result" style="display: flex;" class="popup">
          <div class="max-w-[325px] popup-box text-white popup-content success">
            <h2>Success!</h2>
            <p>
              You have successfully completed the Basic Auto Repair course. You
              can now fix vehicles, which will come in handy for your hustle
              operations.
            </p>
          </div>
          <p class="popup-bottom-text">Click anywhere to close this message</p>
        </div>
      `);
    }

    return res.send(html`
      <div id="popup-result" style="display: flex;" class="popup">
        <div class="max-w-[325px] popup-box text-white popup-content fail">
          <h2>Failed</h2>
          <p>
            The Basic Auto Repair course was tougher than expected. You'll need
            more practice or a better understanding of mechanics.
          </p>
        </div>
        <p class="popup-bottom-text">Click anywhere to close this message</p>
      </div>
    `);
  } else if (course === "COOKING") {
    const cost = new Money({
      dollars: 500,
    });

    if (!player.cash.greaterThanOrEqual(cost)) {
      return res.send(html`<div
        id="popup-result"
        style="display: flex;"
        class="popup"
      >
        <div class="max-w-[325px] popup-box text-white popup-content fail">
          <h2>Not enough cash</h2>
          <p>You don't have enough cash to take this course.</p>
        </div>
        <p class="popup-bottom-text">Click anywhere to close this message</p>
      </div>`);
    }

    player.cash = player.cash.subtract(cost);

    if (chance.bool({ likelihood: 50 })) {
      player.education["COOKING"] = true;

      return res.send(html`
        <div id="popup-result" style="display: flex;" class="popup">
          <div class="max-w-[325px] popup-box text-white popup-content success">
            <h2>Success!</h2>
            <p>
              You have successfully completed the Cooking Class. You can now
              cook gourmet meals, which improves your health and impresses your
              dates.
            </p>
          </div>
          <p class="popup-bottom-text">Click anywhere to close this message</p>
        </div>
      `);
    }

    return res.send(html`
      <div id="popup-result" style="display: flex;" class="popup">
        <div class="max-w-[325px] popup-box text-white popup-content fail">
          <h2>Failed</h2>
          <p>
            You struggled with the Cooking Class. Consider taking additional
            classes or practicing more to enhance your culinary skills.
          </p>
        </div>
        <p class="popup-bottom-text">Click anywhere to close this message</p>
      </div>
    `);
  }

  return res.status(404).end();
});
