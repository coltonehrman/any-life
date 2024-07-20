import express from "express";
import { getPlayerById } from "../../player/players.data";

export const router = express.Router();

router.post("/api", (req, res) => {
  const player = getPlayerById();

  const Response = () => (
    <div id="popup-result" class="flex popup-backdrop">
      <div class="popup-box">
        <h1 class="popup-title">TITLE</h1>
        <p class="p-4">TEXT</p>

        <div>
          <div class="progress-label">
            <span>LABEL</span>
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
