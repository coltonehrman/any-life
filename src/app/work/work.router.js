import { FreelanceView } from "./freelance/freelance.view.js";
import { WorkController } from "./work.controller.js";
import { WorkView } from "./work.view";
import express from "express";
import { freelanceRouter } from "./freelance/freelance.router.js";
import { fullTimeRouter } from './full-time/full-time.router.js';
import { getPlayerById } from "../player/players.data.js";
import { html } from "../../utils.js";
import { militaryRouter } from "./military/military.router.js";
import { partTimeRouter } from "./part-time/part-time.router.js";
import { specialCareersRouter } from "./special-careers/special-careers.router.js";

export const workRouter = express.Router();
const workController = new WorkController();

workRouter.get("/work", function (req, res) {
  const workView = new WorkView();
  const player = getPlayerById(req.session.playerId);
  let message;

  if (req.query.job) {
    message = workController.doJob(player, req.query.job);

    player.feedback = html`
      <div class="feedback ${message?.includes("fail") ? "fail" : "success"}">
        <p>${message}</p>
      </div>
    `;
  }

  return res.send(workView.print({ player }));
});

workRouter.get("/work/freelance", function (req, res) {
  const freelanceView = new FreelanceView();
  const player = getPlayerById(req.session.playerId);

  return res.send(freelanceView.print({ player }));
});

workRouter.use("/work/freelance", freelanceRouter);
workRouter.use("/work/part-time", partTimeRouter);
workRouter.use("/work/full-time", fullTimeRouter);
workRouter.use("/work/special-careers", specialCareersRouter);
workRouter.use("/work/military", militaryRouter);
