import { AssetView } from "./asset.view.js";
import { AssetsView } from "./assets.view.js";
import express from "express";
import { getPlayerById } from "../player/players.data.js";
import { html } from "../../utils.js";

const assetsView = new AssetsView();
const assetView = new AssetView();

export const assetsRouter = express.Router();

assetsRouter.get("/assets", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(assetsView.print(player));
});

assetsRouter.get("/assets/:id", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const asset = player.items.find((i) => i.id === req.params.id);

  return res.send(assetView.print({ player, asset }));
});

assetsRouter.post("/assets/:id", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(html`
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1 class="popup-title">That Hit The Spot</h1>
        <p class="popup-subtitle">
          You enjoyed a Chinese Takeout from Fast-Food.
        </p>
        <p class="popup-description">
          It reminded you of your favorite childhood meal.
        </p>

        <div class="progress-section">
          <div class="progress-label">
            <span>Your Enjoyment</span><span>80%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: 80%;"></div>
          </div>
        </div>

        <div class="popup-bottom-text">tap anywhere to continue</div>
      </div>
    </div>
  `);
});

assetsRouter.post("/assets/action/send-virus", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const victim = player.allConnections.find((c) => c.id === req.body.victim);

  player.items.push({
    id: crypto.randomUUID(),
    isHacked: true,
    type: "ELECTRONIC",
    owner: victim,
    name: `${victim.name}'s Phone`,
  });

  return res.send(html`
    <div
      id="popup-result"
      style="display: flex;"
      class="popup-backdrop"
      data-redirect="/game/assets"
    >
      <div class="popup-box">
        <h1 class="popup-title">Hacker</h1>
        <p>You have successfully sent the Virus and hacked their phone.</p>
      </div>

      <div class="popup-bottom-text">tap anywhere to continue</div>
    </div>
  `);
});
