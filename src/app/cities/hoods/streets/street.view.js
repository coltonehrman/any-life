import { css, html } from "../../../../utils.js";

import { Escort } from "./escorts/escort.model.js";
import { EscortPopupView } from "../../../map/popups/escort.view.js";
import { GamePageView } from "../../../../views/game.view";
import { MapView } from "../../../map/map.view.js";
import { MissionsView } from "../../../missions/missions.view.js";
import { NavItemView } from "../../../../views/nav-item.view.js";
import { PinView } from "../../../map/pins/pin.view.js";
import { Pusher } from "./pushers/pusher.model.js";
import { PusherPopupView } from "../../../map/popups/pusher.view.js";

const navItem = new NavItemView();

export class StreetView extends GamePageView {
  constructor({ req, street }) {
    super();

    this._req = req;
    this.street = street;

    this.missionsView = new MissionsView(this.addCss.bind(this));
    this.mapView = new MapView(this.addCss.bind(this));
  }

  printMap(player) {
    return this.mapView.print({
      mapIcon: "/public/images/street.jpg",
      pins: player.npcs
        .map((npc) => ({
          name:
            npc.buyingDrugs && npc.buyingDrugs.type
              ? npc.buyingDrugs.type
              : npc.name || npc.type || npc.constructor.name,
          icon:
            npc.icon ??
            (npc.buyingDrugs
              ? `/public/icons/${npc.buyingDrugs.type}.png`
              : "/public/icons/drugs.png"),
          popupType: npc.type,
          npc,
          x: npc.location.x,
          y: npc.location.y,
        }))
        .concat(
          player.missions
            .filter((mission) => {
              return (
                mission.currentNPC &&
                mission.currentNPC.location.street === this.street
              );
            })
            .map((mission) => {
              return {
                name: mission.currentNPC.name,
                icon: mission.currentNPC.icon,
                popupType: "mission",
                mission,
                x: mission.currentNPC.location.x,
                y: mission.currentNPC.location.y,
              };
            })
        )
        .concat(
          this.street.npcs.map((npc) => {
            let popup;

            if (npc instanceof Pusher) {
              popup = new PusherPopupView({ player, pusher: npc });
            }

            if (npc instanceof Escort) {
              popup = new EscortPopupView({ player, escort: npc });
            }

            const pin = new PinView({
              x: npc.location.x,
              y: npc.location.y,
              headingText: npc.name,
              iconTitle: npc.name,
              popup,
            });

            return pin;
          })
        ),
      rootPath: `/game/city/hoods/${this.street.hood.name}/streets/${this.street.name}`,
    });
  }

  print({ player }) {
    this.addCss(
      "streets",
      css`
        h2 {
          color: white;
        }

        .main-view {
          display: flex;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          padding-top: 0;
        }

        .streets {
          position: relative;
        }

        .missions {
          margin-top: 0 !important;
        }

        .right-sidebar {
          width: 300px;
          background-color: #feffe9;
          color: #222;
          padding: 2rem;
          margin-right: 2rem;
          border-radius: 5px;
          overflow-y: auto;
        }

        @media screen and (max-width: 600px) {
          .right-sidebar {
            display: none;
          }
        }

        .right-sidebar .section {
          margin-bottom: 20px;
        }

        .right-sidebar .section h2 {
          margin-top: 0;
        }

        .right-sidebar .list {
          list-style-type: none;
          padding: 0;
          margin: 1rem 0;
        }

        .right-sidebar .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .right-sidebar .list-item,
        .pusher {
          padding: 10px;
          border-radius: 5px;
          border: 2px solid #222;
        }

        .right-sidebar .list-item span {
          margin-right: 10px;
        }

        .players {
          color: white;
          text-align: center;
        }

        .feedback {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
          margin: 0;
        }

        @media screen and (max-width: 600px) {
          .feedback {
            position: static;
          }
        }

        .chat {
          height: 500px;
          overflow-y: scroll;
        }

        #chat-message-input {
          width: 100%;
          color: black;
        }

        .filter-section {
          display: flex;
          justify-content: center;
          margin: 1rem;
        }

        .filter-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 15px;
          margin: 0 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .filter-button:hover {
          background-color: #0056b3;
        }

        .filter-button:active {
          background-color: #003f7f;
        }

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: rgba(255, 255, 255, 0.8);
          padding: 10px 20px;
          margin: 10px 0;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .name {
          font-size: 16px;
          color: #333;
          margin: 0;
        }

        .interact-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 15px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .interact-button:hover {
          background-color: #0056b3;
        }

        .interact-button:active {
          background-color: #003f7f;
        }

        @media screen and (max-width: 600px) {
          .list-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .interact-button {
            width: 100%;
            margin-top: 10px;
          }
        }
      `
    );

    const feedback = player.feedback;
    if (feedback) player.feedback = null;

    return super.print({
      player,
      head: html`
        <script defer type="text/javascript" src="/public/street.js"></script>
      `,
      body: html`
        <div class="bottom-bar-container">
          <button
            hx-post="${this.rootPath}/new"
            hx-target=".map"
            hx-swap="outerHTML"
            class="button"
          >
            Hustle<br />
            <small>(click me)</small>
          </button>
        </div>

        <div class="filter-section">
          <button class="filter-button" onclick="filterMapList('all')">
            All
          </button>
          <button class="filter-button" onclick="filterMapList('pusher')">
            Pusher
          </button>
          <button class="filter-button" onclick="filterMapList('escort')">
            Escort
          </button>
          <button class="filter-button" onclick="filterMapList('mission')">
            Mission
          </button>
          <button class="filter-button" onclick="filterMapList('fiend')">
            Fiend
          </button>
        </div>

        <div class="main-view">
          <div class="main-content">
            <div class="streets">
              ${feedback ? feedback : html`<div class="feedback hidden"></div>`}
              ${this.printMap(player)}
            </div>

            <div class="section-heading">NPCs</div>

            ${player.npcs
              .concat(
                player.missions
                  .filter((mission) => {
                    return (
                      mission.currentNPC &&
                      mission.currentNPC.location.street === this.street
                    );
                  })
                  .map((mission) => mission.currentNPC)
              )
              .concat(this.street.npcs)
              .map((npc) => {
                return navItem.print({
                  headingText: `${npc.name} (${npc.constructor.name})`,
                  blurbText: "Interact with NPC",
                  onClick: `togglePopup(event, '${npc.id}')`,
                });
              })
              .join("")}
            ${this.missionsView.print({
              player,
              street: player.location.street,
            })}
          </div>

          <div class="right-sidebar">
            <div class="section chat">
              <h2>Chat</h2>

              <ul id="chat-messages" class="list">
                ${[]
                  .map(
                    (message) => html`
                      <li class="list-item">
                        <span class="name">${message}</span>
                      </li>
                    `
                  )
                  .join("")}
              </ul>

              <input
                id="chat-message-input"
                type="text"
                placeholder="Chat with other players..."
              />
              <button id="send-chat-message" class="button">Send</button>
            </div>
          </div>
        </div>
      `,
    });
  }
}
