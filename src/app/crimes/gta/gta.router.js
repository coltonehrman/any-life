import { Chance } from "chance";
import { GTAView } from "./gta.view.js";
import { cars } from "../../cars/cars.data.js";
import { escapeHtml } from "../../../utils.js";
import { getPlayerById } from "../../player/players.data.js";

const chance = new Chance();

export function gtaRouter(req, res) {
  const gtaView = new GTAView({ req });
  const player = getPlayerById(req.session.playerId);
  let feedback;

  const _cars = chance.pickset(cars, 6);

  if (req.query.type && req.query.message) {
    feedback = {
      type: escapeHtml(req.query.type),
      message: escapeHtml(req.query.message),
    };
  }

  return res.send(
    gtaView.print({
      player,
      feedback,
      cars: [
        {
          id: _cars[0].id,
          name: _cars[0].name,
          x: 9,
          y: 70,
        },
        {
          id: _cars[1].id,
          name: _cars[1].name,
          x: 24,
          y: 68,
        },
        {
          id: _cars[2].id,
          name: _cars[2].name,
          x: 30,
          y: 65,
        },
        {
          id: _cars[3].id,
          name: _cars[3].name,
          x: 89,
          y: 78,
        },
        {
          id: _cars[4].id,
          name: _cars[4].name,
          x: 83,
          y: 73,
        },
        {
          id: _cars[5].id,
          name: _cars[5].name,
          x: 75,
          y: 71,
        },
      ],
    })
  );
}
