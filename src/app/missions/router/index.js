import express from "express";
import { missionCollect } from "./collect.js";
import { missionComplete } from "./complete.js";

export const missionRouter = express.Router();

missionRouter.get("/:missionId/collect", missionCollect);
missionRouter.get("/:missionId/complete", missionComplete);
