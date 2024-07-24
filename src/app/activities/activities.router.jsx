import { ActivitiesView } from "./activities.view";
import { Chance } from "chance";
import Nano from "nano-jsx-experiment";
import { PopupResult } from "../_shared/components/PopupResult";
import express from "express";
import { getPlayerById } from "../player/players.data.js";

const activitiesView = new ActivitiesView();
const chance = new Chance();

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

  const enjoyment = chance.integer({ min: 0, max: 100 });

  return res.send(
    Nano.renderSSR(
      <PopupResult
        title="Shower"
        description="You enjoyed a nice shower."
        progress={{
          title: "Your Enjoyment",
          span: `${enjoyment}%`,
          width: `${enjoyment}%`,
        }}
      />
    )
  );
});

activitiesRouter.post("/activities/walk", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You went for a walk.");

  const enjoyment = chance.integer({ min: 0, max: 100 });

  return res.send(
    Nano.renderSSR(
      <PopupResult
        title="Walk"
        description="You enjoyed a quiet walk."
        progress={{
          title: "Your Enjoyment",
          span: `${enjoyment}%`,
          width: `${enjoyment}%`,
        }}
      />
    )
  );
});

activitiesRouter.post("/activities/meditate", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You practiced meditation.");

  const enjoyment = chance.integer({ min: 0, max: 100 });

  return res.send(
    Nano.renderSSR(
      <PopupResult
        title="Meditate"
        description="You enjoyed a peaceful meditation."
        progress={{
          title: "Your Enjoyment",
          span: `${enjoyment}%`,
          width: `${enjoyment}%`,
        }}
      />
    )
  );
});

activitiesRouter.post("/activities/movie", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You watched a movie.");

  const enjoyment = chance.integer({ min: 0, max: 100 });

  return res.send(
    Nano.renderSSR(
      <PopupResult
        title="Movies"
        description="You enjoyed a movie."
        progress={{
          title: "Your Enjoyment",
          span: `${enjoyment}%`,
          width: `${enjoyment}%`,
        }}
      />
    )
  );
});

activitiesRouter.post("/activities/club", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  player.storyLog.push("You went to the club.");

  const enjoyment = chance.integer({ min: 0, max: 100 });

  return res.send(
    Nano.renderSSR(
      <PopupResult
        title="Night life"
        description="You went out to the club and danced."
        progress={{
          title: "Your Enjoyment",
          span: `${enjoyment}%`,
          width: `${enjoyment}%`,
        }}
      />
    )
  );
});
