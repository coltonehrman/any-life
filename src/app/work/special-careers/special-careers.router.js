import { Chance } from "chance";
import { PopupView } from "../../../views/popup.view.js";
import { SpecialCareerView } from "./special-career.view.js";
import { SpecialCareersView } from "./special-careers.view.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";

const chance = new Chance();
const popup = new PopupView();

const specialCareersView = new SpecialCareersView();
const specialCareerView = new SpecialCareerView();

export const specialCareersRouter = express.Router();

specialCareersRouter.get("/", function (req, res) {
  const player = getPlayerById(req.session.playerId);

  return res.send(specialCareersView.print({ player }));
});

specialCareersRouter.get("/:career", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const career = player.careers.find((c) => c.type === req.params.career);

  return res.send(specialCareerView.print({ player, career }));
});

specialCareersRouter.post("/:career/start", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const { career } = req.params;

  if (career === "film-producer") {
    player.careers.push({
      type: career,
      title: "Film Producer",
      started: Date.now(),
      performance: 0,
    });

    return res.send(html`
      <div
        id="popup-result"
        class="popup-backdrop"
        style="display: flex;"
        data-redirect="/game/work"
      >
        <div class="popup-box">
          <h1>Career</h1>
          <p>You are now a Hollywood producer.</p>
        </div>

        <div class="popup-bottom-text">Tap anywhere to continue</div>
      </div>
    `);
  }

  if (career === "boxing") {
    player.careers.push({
      type: career,
      title: "Professional Boxer",
      started: Date.now(),
      performance: 0,
      skills: {
        swaying: 0,
        blocking: 0,
        stance: 0,
        punching: 0,
        ducking: 0,
        footwork: 0,
        parrying: 0,
      },
    });

    return res.send(html`
      <div
        id="popup-result"
        class="popup-backdrop"
        style="display: flex;"
        data-redirect="/game/work"
      >
        <div class="popup-box">
          <h1>Career</h1>
          <p>You are now a professional Boxer.</p>
        </div>

        <div class="popup-bottom-text">Tap anywhere to continue</div>
      </div>
    `);
  }
});

specialCareersRouter.post("/film-producer/produce", function (req, res) {
  const player = getPlayerById(req.session.playerId);

  return res.send(
    popup.print({
      show: true,
      noClose: true,
      popupId: "popup-confirm-produce",
      type: "confirm",
      headingText: "Market Research",
      bodyHtml: html`
        <p>You performed market research on the movie genre.</p>
        <p>
          Researchers concluded that demand for this genre is strong, with
          moderate competition expected.
        </p>
      `,
      details: [
        ["Genre", "Fiction"],
        ["Available Budget", "$2,800,000"],
      ],
      footerHtml: html`
        <div class="popup-progress-container">
          <div class="popup-progress-row">
            <span class="popup-progress-label">Demand</span>
            <div class="popup-progress">
              <div class="popup-progress-fill" style="width: 80%;"></div>
            </div>
          </div>
          <div class="popup-progress-row">
            <span class="popup-progress-label">Competition</span>
            <div class="popup-progress">
              <div class="popup-progress-fill" style="width: 35%;"></div>
            </div>
          </div>
        </div>
      `,
      formButtons: html`
        <button
          class="popup-button"
          hx-post="/game/real-estate/mortgage"
          hx-vals='{"propertyId": ""}'
          hx-target="#popup-result"
          hx-swap="outerHTML"
        >
          Launch Film
        </button>

        <button
          class="popup-button"
          hx-post="/game/real-estate/buy"
          hx-vals='{"propertyId": ""}'
          hx-target="#popup-result"
          hx-swap="outerHTML"
        >
          Go back to drawing board
        </button>
      `,
    })
  );
});
