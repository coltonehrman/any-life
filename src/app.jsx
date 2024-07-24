import "dotenv/config";

import {
  ActionRowBuilder,
  Client,
  Events,
  GatewayIntentBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { escapeHtml, html, removeCircularReferences } from "./utils";
import { getPlayerById, players } from "./app/player/players.data.js";

import { ErrorView } from "./views/error.view.js";
import { GameGeneralView } from "./views/game-general.view.js";
import { GameStartView } from "./views/game-start.view.js";
import { LandingPageView } from "./views/landing.view.js";
import { Money } from "./app/items/money.model.js";
import { PlayerFactory } from "./app/player/player.factory.js";
import { Server } from "socket.io";
import { activitiesRouter } from "./app/activities/activities.router";
import { assetsRouter } from "./app/assets/assets.router.js";
import { bankRouter } from "./app/bank/bank.router.js";
import bodyParser from "body-parser";
import { cityRouter } from "./app/cities/city.router.js";
import { contactsRouter } from "./app/contacts/contacts.router.js";
import cookieSession from "cookie-session";
import { crimeRouter } from "./app/crimes/crime.router.js";
import { educationRouter } from "./app/education/education.router.js";
import express from "express";
import { familyRouter } from "./app/family/family.router.js";
import gtaCarRouter from "./app/crimes/gta/car/router.js";
import { gtaRouter } from "./app/crimes/gta/gta.router.js";
import gtaStorageRouter from "./app/crimes/gta/storage/router.js";
import { hoodRouter } from "./app/cities/hoods/hood.router.js";
import http from "http";
import { initStreetRouter } from "./app/cities/hoods/streets/router/street.router.js";
import { lifeRouter } from "./app/life/life.router";
import { marketplaceRouter } from "./app/marketplace/marketplace.router.js";
import { missionRouter } from "./app/missions/router/index.js";
import { realEstateRouter } from "./app/real-estate/real-estate.router.js";
import { relationshipRouter } from "./app/relationships/relationship.router.js";
import { saveAccount } from "./db/utils";
import { workRouter } from "./app/work/work.router.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, async () => {
  console.log("NPC Bot is online!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  // const modal = new ModalBuilder()
  //   .setCustomId("my_modal")
  //   .setTitle("Modal title")
  //   .addComponents(
  //     new ActionRowBuilder().addComponents(
  //       new TextInputBuilder()
  //         .setCustomId("my_text")
  //         .setStyle(TextInputStyle.Short)
  //         .setLabel("Type some text")
  //     ),
  //     new ActionRowBuilder().addComponents(
  //       new TextInputBuilder()
  //         .setCustomId("my_longer_text")
  //         .setStyle(TextInputStyle.Paragraph)
  //         .setLabel("Type some (longer) text")
  //     )
  //   );

  // return await interaction.showModal(modal);

  if (interaction.commandName === "ping") {
    return await interaction.reply("Pong!");
  }

  if (interaction.isCommand()) {
    if (interaction.commandName === "start") {
      const player = PlayerFactory.new({
        playerId: interaction.user.id,
      });

      players[player.id] = player;

      return await interaction.reply({
        content: `New player created: ${player.name}\n${player.storyLog.join(
          "\n"
        )}`,
      });
    }

    if (interaction.commandName === "next-life") {
      const character = Object.values(players).find(
        (p) => p.playerId === interaction.user.id
      );

      character.age += 1;

      character.storyLog.push(`---- Age ${character.age} ----`);

      for (const npc of character.allConnections) {
        npc.age += 1;
      }

      return await interaction.reply({
        content: `My character ${character.name} (${
          character.age
        })\n${character.storyLog.join("\n")}`,
      });
    }
  }

  if (interaction.isMessageComponent()) {
    console.log(interaction);
    const componentId = interaction.customId;

    if (componentId.startsWith("accept_button_")) {
      // get the associated game ID
      const gameId = componentId.replace("accept_button_", "");

      try {
        // Delete previous message
        await interaction.message.delete();

        interaction.reply({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          flags: InteractionResponseFlags.EPHEMERAL,
          content: "What is your object of choice?",
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.STRING_SELECT,
                  // Append game ID
                  custom_id: `select_choice_${gameId}`,
                  options: getShuffledOptions(),
                },
              ],
            },
          ],
        });
      } catch (err) {
        console.error("Error sending message:", err);
      }
    } else if (componentId.startsWith("select_choice_")) {
      // get the associated game ID
      const gameId = componentId.replace("select_choice_", "");

      if (activeGames[gameId]) {
        // Get user ID and object choice for responding user
        const userId = interaction.member.user.id;
        console.log(interaction.values);
        const objectName = interaction.values[0];

        // Calculate result from helper function
        const resultStr = getResult(activeGames[gameId], {
          id: userId,
          objectName,
        });

        // Remove game from storage
        delete activeGames[gameId];

        try {
          // Update ephemeral message
          await interaction.update({
            content: "Nice choice " + getRandomEmoji(),
            components: [],
          });

          // Send results
          await interaction.followUp({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            content: resultStr,
          });
        } catch (err) {
          console.error("Error sending message:", err);
        }
      }
    }

    return;
  }

  const id = interaction.id;

  if (interaction.commandName === "test") {
    await interaction.reply({
      content: "hello world " + getRandomEmoji(),
    });
  }

  if (id && interaction.commandName === "challenge") {
    // console.log(interaction)
    console.log(interaction.member.user.id);
    const userId = interaction.member.user.id;
    console.log(interaction.options.get("object"));
    // User's object choice
    const objectName = interaction.options.get("object").value;

    // Create active game using message ID as the game ID
    activeGames[id] = {
      id: userId,
      objectName,
    };

    await interaction.reply({
      content: `Rock papers scissors challenge from <@${userId}>`,
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.BUTTON,
              custom_id: `accept_button_${id}`,
              label: "Accept",
              style: ButtonStyleTypes.PRIMARY,
            },
          ],
        },
      ],
    });
  }
});

// client.login(process.env.DISCORD_TOKEN);

process.on("uncaughtException", function (exception) {
  console.error(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

process.on("unhandledRejection", function (exception) {
  console.error(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const errorView = new ErrorView();
const gameStartView = new GameStartView();
const landingPageView = new LandingPageView();

app.get("/auth/discord/redirect", async (req, res) => {
  const { code } = req.query;
  const redirectUri = process.env.SUDO_USER
    ? "https://any-life.io/auth/discord/redirect"
    : "http://localhost:3000/auth/discord/redirect";

  if (code) {
    const GUILD_ID = "1249136590060781569";

    const accessTokenReq = await fetch(
      "https://discord.com/api/v10/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
        }),
      }
    );

    const accessTokenData = await accessTokenReq.json();

    const accessToken = accessTokenData["access_token"];

    const discordAccountReq = await fetch(
      "https://discord.com/api/v10/users/@me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const discordAccountData = await discordAccountReq.json();

    await fetch(
      `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordAccountData.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      }
    );

    const accountData = {
      email: discordAccountData.email,
      // username: discordAccountData.global_name,
      discordOAuth: accessTokenData,
      discordAccount: discordAccountData,
    };

    await saveAccount(accountData);
  }

  res.redirect("/game");
});

app.use("/public", express.static("public"));

const banned = new Set("66.115.189.135", "66.115.189.142");

if (process.env.SUDO_USER) {
  app.use((req, res, next) => {
    if (banned.has(req.headers["x-forwarded-for"])) {
      return res.status(403).send("You have been banned. Go away.");
    }

    if (
      req.headers.host !== "any-life.io" &&
      req.headers.host !== "www.any-life.io"
    ) {
      console.error("bad request", req.headers);
      return res.status(403).end();
    }

    next();
  });
}

app.use(bodyParser.urlencoded({ extended: true }));

const sessionMiddleware = cookieSession({
  name: "session",
  secret: "secretkittykat",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});

app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.get("/", (req, res) => {
  return res.send(landingPageView.print());
});

const gameRouter = express.Router();

gameRouter.get("/start", (req, res) => {
  return res.send(gameStartView.print());
});

gameRouter.post("/start", (req, res) => {
  const player = PlayerFactory.new();

  const { username } = req.body;

  player.name = escapeHtml(username)
    .replace(/[^a-zA-Z ]/gi, "")
    .replace(/\s+/g, " ")
    .slice(0, 24)
    .trim();

  players[player.id] = player;
  req.session.playerId = player.id;

  return res.redirect("/game");
});

gameRouter.use((req, res, next) => {
  if (req.session.isNew) {
    return res.redirect("/game/start");
  }

  const player = getPlayerById(req.session.playerId);

  if (!player) {
    if (!process.env.SUDO_USER) {
      const player = PlayerFactory.new();
      players[player.id] = player;
      req.session.playerId = player.id;
      return next();
    } else {
      req.session = null;
      return res.redirect("/game/start");
    }
  }

  player.lastActive = Date.now();

  for (const mission of player.missions) {
    if (!mission.failed && mission.isExpired) {
      const stats = mission.stats;
      const rewards = mission.parts.flatMap((p) => p.rewards).filter((x) => x);
      let totalEarnings = new Money();

      for (const reward of rewards) {
        totalEarnings = totalEarnings.add(
          stats[reward.type]?.earned ?? new Money()
        );
        player.drugs.removeDrugsWithQuantity(reward.type, reward.quantity);
      }

      let cashLoss = player.cash;

      if (totalEarnings.lessThanOrEqual(player.cash)) {
        cashLoss = totalEarnings;
      }

      player.cash = player.cash.subtract(cashLoss);
      player.health -= 25;

      mission.failed = true;

      player.alert = html`
        <div id="alert-container">
          <div id="alert-message">
            <h2>Mission Failed!</h2>
            <p>You didn't complete the mission in time.</p>
            <p>
              You lost 1 street cred and $${cashLoss}, the amount of drugs you
              originally collected, and the gang members beat you up!
            </p>
            <button onclick="closeAlert()">Close</button>
          </div>
        </div>
      `;
    }
  }

  next();
});

gameRouter.get("/", (req, res) => {
  const player = getPlayerById(req.session.playerId);

  const gameGeneralView = new GameGeneralView();

  return res.send(gameGeneralView.print({ players, player }));
});

gameRouter.get("/city", cityRouter);
gameRouter.get("/city/hoods/:hood", hoodRouter);

initStreetRouter(gameRouter, io);

gameRouter.use("/mission", missionRouter);
gameRouter.use("/", familyRouter);

gameRouter.get("/crime", crimeRouter);
gameRouter.get("/gta", gtaRouter);

gameRouter.use("/gta/storage", gtaStorageRouter);
gameRouter.use("/gta", gtaCarRouter);

gameRouter.use("/", workRouter);
gameRouter.use("/", educationRouter);
gameRouter.use("/", relationshipRouter);
gameRouter.use("/", bankRouter);
gameRouter.use("/", marketplaceRouter);
gameRouter.use("/", activitiesRouter);
gameRouter.use("/", contactsRouter);
gameRouter.use("/", assetsRouter);
gameRouter.use("/", realEstateRouter);
gameRouter.use("/", lifeRouter);

app.use("/game", gameRouter);

app.use((err, req, res, next) => {
  console.error(err);

  return res.send(errorView.print());
});

httpServer.listen(process.env.SUDO_USER ? 80 : 3000);

function gracefulShutdown() {
  console.log("Shutting down gracefully...");

  httpServer.close(() => {
    console.log("Server closed.");

    process.exit(0);
  });

  // Force close the server after 5 seconds
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );

    process.exit(1);
  }, 5000);
}

process.once("SIGINT", gracefulShutdown);
process.once("SIGTERM", gracefulShutdown);
