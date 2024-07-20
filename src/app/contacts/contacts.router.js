import { ContactsView } from "./contacts.view.js";
import { Escort } from "../cities/hoods/streets/escorts/escort.model.js";
import OpenAI from "openai";
import { Pusher } from "../cities/hoods/streets/pushers/pusher.model.js";
import express from "express";
import { getPlayerById } from "../player/players.data.js";
import { html } from "../../utils.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const contactsView = new ContactsView();

export const contactsRouter = express.Router();

contactsRouter.get("/contacts", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  return res.send(contactsView.print(player));
});

contactsRouter.post("/contacts/message", async (req, res) => {
  const player = getPlayerById(req.session.playerId);

  if (player.waitingForAIResponse || player.aiChats >= 100) {
    return res.status(403).end();
  }

  const { id, message } = req.body;
  const npc = player.escorts.concat(player.pushers).find((n) => n.id === id);

  if (!npc) return res.status(404).end();

  let conversation = npc.conversations.get(player);

  if (!conversation) {
    conversation = [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are an NPC in a crime-based game called Crime MMO.
            Your role in the game is a${
              npc instanceof Escort
                ? "n Escort"
                : npc instanceof Pusher
                ? " Drug Pusher"
                : "n NPC"
            }.
            Your name is ${npc.name}.
            You work for this player.
            The players name is ${player.name}.
            Come up with a background for yourself.
            Respond to the player with immersive and relevant dialogue to make them feel like they are in the game playing.
            Keep your responses pretty short unless necessary to make it longer.`,
          },
        ],
      },
    ];
  }

  conversation.push({
    role: "user",
    align: "right",
    content: [
      {
        type: "text",
        text: message,
      },
    ],
  });

  player.waitingForAIResponse = true;
  player.aiChats = (player.aiChats ?? 0) + 1;

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: conversation,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const aiMessage = aiResponse.choices[0].message;

  conversation.push({
    ...aiMessage,
    align: "left",
  });

  npc.conversations.set(player, conversation);

  player.waitingForAIResponse = false;

  return res.send(
    conversation
      .filter((c) => c.role !== "system")
      .map(
        (c) =>
          html`<p style="text-align: ${c.align}">
            ${c.content?.[0]?.text || c.content}
          </p>`
      )
      .join("")
  );
});
