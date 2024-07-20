import { css, html } from "../../utils.js";

import { GamePageView } from "../../views/game.view";

export class ContactsView extends GamePageView {
  constructor() {
    super();
  }

  _addCss() {
    this.addCss(
      "contacts",
      css`
        .chat-button,
        .action-button {
          background-color: #3498db;
          border: none;
          border-radius: 4px;
          color: #ecf0f1;
          cursor: pointer;
          padding: 5px 10px;
          transition: background-color 0.3s;
        }

        .chat-button:hover,
        .action-button:hover {
          background-color: #2980b9;
        }

        .chat-window {
          display: none;
          position: fixed;
          bottom: 0;
          right: 0;
          width: 300px;
          background-color: #ecf0f1;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #34495e;
          color: #ecf0f1;
          padding: 10px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .close-chat-button {
          background: none;
          border: none;
          color: #ecf0f1;
          font-size: 1.2em;
          cursor: pointer;
        }

        .chat-body {
          max-height: 200px;
          overflow-y: auto;
          padding: 10px;
          background-color: #fff;
        }

        .chat-input-section {
          display: flex;
          padding: 10px;
          background-color: #bdc3c7;
        }

        #chat-input {
          flex: 1;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .send-button {
          background-color: #3498db;
          border: none;
          border-radius: 4px;
          color: #ecf0f1;
          cursor: pointer;
          padding: 5px 10px;
          margin-left: 5px;
          transition: background-color 0.3s;
        }

        .send-button:hover {
          background-color: #2980b9;
        }
      `
    );
  }

  print(player) {
    this._addCss();

    return super.print({
      player: player,
      body: html`<div class="ui-container">
          <div class="accordion-section">
            <div class="accordion-header">
              <span>Friends</span>
              <span class="accordion-icon">▼</span>
            </div>

            <div class="accordion-content">
              ${player.contacts
                .filter((c) => c.relationType === "FRIEND")
                .map((contact) => {
                  return html`
                    <a href="/game/relationship/${contact.id}" class="nav-item">
                      <div class="nav-text">
                        <span class="nav-heading"
                          >${contact.name} (${contact.relation})</span
                        >
                        <div class="nav-blurb">
                          Relationship
                          <div class="progress-track">
                            <div
                              class="progress-fill"
                              style="width: ${contact.relationship}%;"
                            ></div>
                          </div>
                        </div>

                        <button
                          class="chat-button"
                          onclick="openChat(event, '${contact.name}', '${contact.id}')"
                        >
                          Chat
                        </button>
                      </div>
                      <span class="nav-arrow">&rarr;</span>
                    </a>
                  `;
                })
                .join("")}
            </div>
          </div>

          <div class="accordion-section">
            <div class="accordion-header">
              <span>NPCs</span>
              <span class="accordion-icon">▼</span>
            </div>

            <div class="accordion-content">
              ${player.contacts
                .filter((c) => c.relationType === "NPC")
                .map((contact) => {
                  return html`
                    <a href="/game/relationship/${contact.id}" class="nav-item">
                      <div class="nav-text">
                        <span class="nav-heading"
                          >${contact.npc.name} (${contact.relation})</span
                        >
                        <div class="nav-blurb">
                          Relationship
                          <div class="progress-track">
                            <div
                              class="progress-fill"
                              style="width: ${contact.relationship}%;"
                            ></div>
                          </div>
                        </div>

                        <button
                          class="chat-button"
                          onclick="openChat(event, '${contact.name}', '${contact.id}')"
                        >
                          Chat
                        </button>
                      </div>
                      <span class="nav-arrow">&rarr;</span>
                    </a>
                  `;
                })
                .join("")}
            </div>
          </div>
        </div>

        <div class="chat-window" id="chat-window">
          <div class="chat-header">
            <h2 id="chat-title">Chat</h2>
            <button class="close-chat-button" onclick="closeChat()">X</button>
          </div>
          <div class="chat-body" id="chat-body">
            <!-- Chat messages will be populated here -->
          </div>

          <form
            hx-post="/game/contacts/message"
            hx-target="#chat-body"
            hx-swap="innerHTML"
            hx-on::before-request="this.reset()"
            class="chat-input-section"
          >
            <input
              type="text"
              id="chat-input"
              name="message"
              placeholder="Type a message..."
            />

            <input type="hidden" id="chat-id" name="id" />
            <button class="send-button">Send</button>
          </form>
        </div>

        <script type="text/javascript">
          function openChat(e, name, id) {
            e.preventDefault();
            const chatWindow = document.getElementById("chat-window");
            const chatTitle = document.getElementById("chat-title");
            const chatBody = document.getElementById("chat-body");
            const chatId = document.getElementById("chat-id");

            chatTitle.textContent = "Chat with " + name.split(" ")[0];
            chatId.value = id;
            chatBody.innerHTML = ""; // Clear previous chat messages

            chatWindow.style.display = "block";
          }

          function closeChat() {
            const chatWindow = document.getElementById("chat-window");
            chatWindow.style.display = "none";
          }
        </script> `,
    });
  }
}
