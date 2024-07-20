import { Chance } from "chance";
import { RelationshipView } from "./relationship.view";
import express from "express";
import { getPlayerById } from "../player/players.data.js";

const chance = new Chance();

export const relationshipRouter = express.Router();

relationshipRouter.get("/relationship/:id", function (req, res) {
  const relationshipView = new RelationshipView();
  const player = getPlayerById(req.session.playerId);
  const npc = player.allConnections.find((c) => c.id === req.params.id);

  if (!npc) return res.status(404).redirect("/game");

  return res.send(relationshipView.print({ player, npc }));
});

relationshipRouter.post("/relationship/:id", (req, res) => {
  const player = getPlayerById(req.session.playerId);
  const npc = player.allConnections.find((c) => c.id === req.params.id);

  if (!npc) return res.status(404).end();

  const { action } = req.body;

  let heading;
  let body;
  let outcome;

  if (action === "ASK_OUT") {
    if (chance.bool({ likelihood: npc.relationship })) {
      heading = "Request: Accepted";

      body = [
        `Your ${npc.relation}, ${npc.name}, accepted you.`,
        `They say that they would love to date someone of your socioeconomic
          status.`,
      ];

      npc.relation = "Partner";
      npc.actions["MAKE_LOVE"] = true;
      npc.actions["BREAK_UP"] = true;
      npc.actions["COUNSELING"] = true;
      npc.actions["PROPOSE"] = true;
      npc.actions["ELOPE"] = true;
      npc.actions["ASK_OUT"] = false;
    } else {
      heading = "Request: Rejected";

      body = [
        `Your ${npc.relation}, ${npc.name}, rejected you.`,
        `They say that it's just too difficult to date someone of your
          socioeconomic status.`,
      ];
    }
  } else if (action === "ACT_UP") {
    heading = "Troublemaker";

    body = [
      `You wrote on the desks with permanent marker in your teacher, ${npc.name}, classroom before school.`,
    ];

    npc.relationship -= 10;
  } else if (action === "BEFRIEND") {
    if (chance.bool({ likelihood: 50 })) {
      heading = "Request: Accepted";

      body = [
        `Your ${npc.relation}, ${npc.name}, accepted your friendship.`,
        `They say that they could use more friends like you.`,
      ];

      npc.actions["BEFRIEND"] = false;
      npc.actions["UNFRIEND"] = true;
      npc.actions["ASK_OUT"] = true;
      npc.relation = "Friend";
      npc.relationType = "FRIEND";

      player.contacts.push(npc);
    } else {
      heading = "Request: Rejected";
      body = [
        `Your ${npc.relation}, ${npc.name}, rejected your friendship.`,
        `They say that it's just too difficult to be friends with someone of
          your socioeconomic status.`,
      ];
    }
  } else if (action === "COMPLIMENT") {
    if (chance.bool({ likelihood: 75 })) {
      heading = "Appreciated";

      outcome = 100;

      body = [
        `Your ${npc.relation}, ${npc.name}, appreciated your compliment.`,
        `They say that they could use more friends like you.`,
      ];
    } else {
      heading = "Not Appreciated";

      outcome = 0;

      body = [
        `Your classmate, ${npc.name}, did not appreciate your compliment.`,
      ];
    }
  } else if (action === "CONVERSATION") {
    const conversations = [
      `You had a conversation with your ${npc.relation}, ${npc.name}, about how you've both been doing lately.`,
    ];

    heading = "Conversation";

    body = [chance.pickone(conversations)];
    outcome = chance.integer({ min: 0, max: 100 });
  } else if (action === "SPEND_TIME") {
    heading = "Spend Time";

    body = [`You spent time with your ${npc.relation}, ${npc.name}.`];
    outcome = chance.integer({ min: 50, max: 100 });
  } else if (action === "MOVIE_THEATRE") {
    heading = "Movies";

    body = [`You went to the movies with your ${npc.relation}, ${npc.name}.`];
    outcome = chance.integer({ min: 50, max: 100 });
  } else if (action === "WATCH_YOUTUBE") {
    heading = "YouTube";

    body = [`You watched YouTube your ${npc.relation}, ${npc.name}.`];
    outcome = chance.integer({ min: 50, max: 100 });
  } else if (action === "CONCERT") {
    heading = "Concert";

    body = [`You went to a concert with your ${npc.relation}, ${npc.name}.`];
    outcome = chance.integer({ min: 50, max: 100 });
  } else if (action === "PARTY") {
    heading = "Party";

    body = [`You partied with your ${npc.relation}, ${npc.name}.`];
    outcome = chance.integer({ min: 50, max: 100 });
  } else if (action === "FLIRT") {
    heading = "Flirt";

    body = [`You flirted with ${npc.name}.`];

    outcome = chance.integer({ min: 25, max: 100 });
  } else if (action === "GIFT") {
    heading = "Gift";

    body = [`You gave a gift to ${npc.name}.`];

    outcome = chance.integer({ min: 25, max: 100 });
  } else if (action === "INSULT") {
    heading = "Insulted";

    body = [`You insulted ${npc.name}.`];

    outcome = chance.integer({ min: 0, max: 25 });
  } else if (action === "MESS") {
    heading = "Mess";

    body = [`You messed with ${npc.name}.`];

    outcome = chance.integer({ min: 0, max: 25 });
  } else if (action === "DISRESPECT") {
    heading = "Disrepect";

    body = [`You disrespected ${npc.name}.`];

    outcome = chance.integer({ min: 0, max: 25 });
  } else if (action === "RUMOR") {
    heading = "Rumor";

    body = [`You started a rumor about ${npc.name}.`];

    outcome = chance.integer({ min: 0, max: 25 });
  } else if (action === "PRANK") {
    heading = "Prank";

    body = [`You pranked ${npc.name}.`];

    outcome = chance.integer({ min: 0, max: 25 });
  } else if (action === "SPY") {
    heading = "Spy";

    body = [`You spyed on ${npc.name}.`];
  } else if (action === "DRUGS") {
    heading = "Drugs";

    body = [`You sold drugs to ${npc.name}.`];
  }

  if (outcome) {
    if (outcome > 50) {
      npc.relationship += 1;
    }

    if (outcome < 50) {
      npc.relationship -= 1;
    }
  }

  const Response = () => (
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1>{heading}</h1>
        {body.map((b) => (
          <p>{b}</p>
        ))}
        {typeof outcome !== "undefined" && (
          <div>
            <div class="text-center">
              Agreement
              <div class="mx-auto	progress-track">
                <div class="progress-fill" style={`width: ${outcome}%;`}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  );

  return res.send(Response()._ssr);
});
