import { Chance } from "chance";
import { acceptRoute } from "./accept.route.js";
import { escapeHtml } from "../../../../../utils.js";
import { escortsRouter } from "../escorts/escorts.router.js";
import express from "express";
import { getPlayerById } from "../../../../player/players.data.js";
import { getStreet } from "../../../cities.data.js";
import { indexRoute } from "./index.route.js";
import { newRoute } from "./new.route.js";
import { pushersRouter } from "../pushers/pushers.router.js";
import { sellRoute } from "./sell.route.js";

const chance = new Chance();
const streetRouter = express.Router();

export function initStreetRouter(server, io) {
  const streetsSocket = io.of("streets");

  streetsSocket.adapter.on("join-room", async (room, id) => {
    const sockets = await streetsSocket.in(room).fetchSockets();

    streetsSocket.to(room).emit(
      "players",
      sockets
        .filter((s) => s.data.player)
        .map((s) => ({
          id: s.data.player.id,
          name: s.data.player.name,
          socketId: s.id,
          x: s.data.player.location.x,
          y: s.data.player.location.y,
        }))
    );
  });

  streetsSocket.adapter.on("leave-room", async (room, id) => {
    const sockets = await streetsSocket.in(room).fetchSockets();
    streetsSocket.to(room).emit(
      "players",
      sockets
        .filter((s) => s.data.player)
        .map((s) => ({
          id: s.data.player.id,
          name: s.data.player.name,
          socketId: s.id,
          x: s.data.player.location.x,
          y: s.data.player.location.y,
        }))
    );
  });

  streetsSocket.on("connection", async (socket) => {
    const session = socket.request.session;
    const player = getPlayerById(session.playerId);

    if (player) {
      socket.data.player = player;
      socket.join(player.location.street.name);

      socket.on("chat-message", (message) => {
        streetsSocket
          .to(player.location.street.name)
          .emit("chat-message", escapeHtml(message));
      });
    }
  });

  streetRouter.use("/:street", (req, res, next) => {
    const streetParam = req.params.street;
    const player = getPlayerById(req.session.playerId);
    const street = getStreet(streetParam);

    if (!streetParam || !street) return res.status(404).end();

    player.location.street = street;

    return next();
  });

  streetRouter.get("/:street", indexRoute);
  streetRouter.post("/:street/new", newRoute);
  streetRouter.post("/:street/sell", sellRoute);
  streetRouter.get("/:street/accept", acceptRoute);

  streetRouter.post("/:street/players/:id/fight", async (req, res) => {
    const streetParam = req.params.street;
    const player = getPlayerById(req.session.playerId);
    const otherPlayer = getPlayerById(req.params.id);
    const street = getStreet(streetParam);

    if (!otherPlayer || otherPlayer.location.street !== street) {
      return res.status(404).end();
    }

    let otherPlayerSocket;

    for (const socket of streetsSocket.sockets.values()) {
      if (socket.data.player === otherPlayer) {
        otherPlayerSocket = socket;
        break;
      }
    }

    if (chance.bool({ likelihood: 50 })) {
      // otherPlayer.health -=

      otherPlayerSocket.emit("hit", true);
    } else {
      otherPlayerSocket.emit("hit", false);
    }

    return res.end();
  });

  streetRouter.use("/:street/pushers", pushersRouter);
  streetRouter.use("/:street/escorts", escortsRouter);

  server.use("/city/hoods/:hood/streets", streetRouter);
}
