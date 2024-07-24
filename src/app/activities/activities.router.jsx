import { ActivitiesView } from "./activities.view";
import Nano from "nano-jsx-experiment";
import { PopupResult } from "../_shared/components/PopupResult";
import express from "express";
import { getPlayerById } from "../player/players.data.js";

const activitiesView = new ActivitiesView();

export const activitiesRouter = express.Router();

activitiesRouter.get("/activities", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(activitiesView.print(player));
});

activitiesRouter.post("/activities/gym", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.attributes.strength++;
  player.storyLog.push(
    `You went to the gym, and now your strength is at ${player.attributes.strength}%`
  );

  return res.send(
    Nano.renderSSR(
      <PopupResult
        title="Workout"
        description="You enjoyed a workout at the gym."
        progress={{
          title: "Your Strength",
          span: `${player.attributes.strength}%`,
          width: `${player.attributes.strength}%`,
        }}
      />
    )
  );
});

activitiesRouter.post("/activities/shower", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You took a shower.");

  const Response = () => (
    <div id="popup-result" class="flex popup-backdrop">
      <div class="popup-box">
        <h1 class="popup-title">Shower</h1>
        <p class="p-4">You enjoyed a nice shower.</p>

        <div>
          <div class="progress-label">
            <span>Your Enjoyment</span>
            <span>80%</span>
          </div>

          <div class="progress-track !w-full">
            <div class="progress-fill" style="width: 80%;"></div>
          </div>
        </div>
      </div>

      <div class="popup-bottom-text">tap anywhere to continue</div>
    </div>
  );

  return res.send(Response()._ssr);
});

activitiesRouter.post("/activities/walk", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You went for a walk.");

  const Response = () => (
    <div id="popup-result" class="flex popup-backdrop">
      <div class="popup-box">
        <h1 class="popup-title">Walk</h1>
        <p class="p-4">You enjoyed a quiet walk.</p>

        <div>
          <div class="progress-label">
            <span>Your Enjoyment</span>
            <span>80%</span>
          </div>

          <div class="progress-track !w-full">
            <div class="progress-fill" style="width: 80%;"></div>
          </div>
        </div>
      </div>

      <div class="popup-bottom-text">tap anywhere to continue</div>
    </div>
  );

  return res.send(Response()._ssr);
});

activitiesRouter.post("/activities/meditate", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You practiced meditation.");

  const Response = () => (
    <div id="popup-result" class="flex popup-backdrop">
      <div class="popup-box">
        <h1 class="popup-title">Meditate</h1>
        <p class="p-4">You enjoyed a peaceful meditation.</p>

        <div>
          <div class="progress-label">
            <span>Your Enjoyment</span>
            <span>80%</span>
          </div>

          <div class="progress-track !w-full">
            <div class="progress-fill" style="width: 80%;"></div>
          </div>
        </div>
      </div>

      <div class="popup-bottom-text">tap anywhere to continue</div>
    </div>
  );

  return res.send(Response()._ssr);
});

activitiesRouter.post("/activities/movie", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You watched a movie.");

  const Response = () => (
    <div id="popup-result" class="flex popup-backdrop">
      <div class="popup-box">
        <h1 class="popup-title">Movies</h1>
        <p class="p-4">You enjoyed a movie.</p>

        <div>
          <div class="progress-label">
            <span>Your Enjoyment</span>
            <span>80%</span>
          </div>

          <div class="progress-track !w-full">
            <div class="progress-fill" style="width: 80%;"></div>
          </div>
        </div>
      </div>

      <div class="popup-bottom-text">tap anywhere to continue</div>
    </div>
  );

  return res.send(Response()._ssr);
});

activitiesRouter.post("/activities/club", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You went to the club.");

  const Response = () => (
    <div id="popup-result" class="flex popup-backdrop">
      <div class="popup-box">
        <h1 class="popup-title">Night life</h1>
        <p class="p-4">You went out to the club and danced.</p>

        <div>
          <div class="progress-label">
            <span>Your Enjoyment</span>
            <span>80%</span>
          </div>

          <div class="progress-track !w-full">
            <div class="progress-fill" style="width: 80%;"></div>
          </div>
        </div>
      </div>

      <div class="popup-bottom-text">tap anywhere to continue</div>
    </div>
  );

  return res.send(Response()._ssr);
});
