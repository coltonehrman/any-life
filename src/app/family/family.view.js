import { css, html } from "../../utils.js";

import { GamePageView } from "../../views/game.view";

export class FamilyView extends GamePageView {
  constructor() {
    super();
  }

  _addCss() {
    this.addCss(
      "family",
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

  print({ player }) {
    this._addCss();

    return super.print({
      player: player,
      body: html`<div class="ui-container">
          <div class="section-heading">Family</div>

          <div class="accordion-section">
            <div class="accordion-header">
              <span>Grandparents</span>
              <span class="accordion-icon">▼</span>
            </div>

            <div class="accordion-content">
              ${player.family.grandParents
                .map((contact) => {
                  return html`
                    <a href="/game/relationship/${contact.id}" class="nav-item">
                      <div class="nav-text">
                        <span class="nav-heading"
                          >${contact.name} (Grandparent)</span
                        >
                        <div class="nav-blurb">
                          Relationship
                          <div class="ml-2 progress-track">
                            <div
                              class="progress-fill"
                              style="width: ${contact.relationship}%;"
                            ></div>
                          </div>
                        </div>
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
              <span>Parents</span>
              <span class="accordion-icon">▼</span>
            </div>

            <div class="accordion-content">
              ${player.family.parents
                .map((contact) => {
                  return html`
                    <a href="/game/relationship/${contact.id}" class="nav-item">
                      <div class="nav-text">
                        <span class="nav-heading"
                          >${contact.name} (Parent)</span
                        >
                        <div class="nav-blurb">
                          Relationship
                          <div class="ml-2 progress-track">
                            <div
                              class="progress-fill"
                              style="width: ${contact.relationship}%;"
                            ></div>
                          </div>
                        </div>
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
              <span>Siblings</span>
              <span class="accordion-icon">▼</span>
            </div>

            <div class="accordion-content">
              ${player.family.siblings
                .map((contact) => {
                  return html`
                    <a href="/game/relationship/${contact.id}" class="nav-item">
                      <div class="nav-text">
                        <span class="nav-heading"
                          >${contact.name} (Sibling)</span
                        >
                        <div class="nav-blurb">
                          Relationship
                          <div class="ml-2 progress-track">
                            <div
                              class="progress-fill"
                              style="width: ${contact.relationship}%;"
                            ></div>
                          </div>
                        </div>
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
              <span>Aunts / Uncles</span>
              <span class="accordion-icon">▼</span>
            </div>

            <div class="accordion-content">
              ${player.family.auntsAndUncles
                .map((contact) => {
                  return html`
                    <a href="/game/relationship/${contact.id}" class="nav-item">
                      <div class="nav-text">
                        <span class="nav-heading"
                          >${contact.name} (Aunt / Uncle)</span
                        >
                        <div class="nav-blurb">
                          Relationship
                          <div class="ml-2 progress-track">
                            <div
                              class="progress-fill"
                              style="width: ${contact.relationship}%;"
                            ></div>
                          </div>
                        </div>
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
              <span>Cousins</span>
              <span class="accordion-icon">▼</span>
            </div>

            <div class="accordion-content">
              ${player.family.cousins
                .map((contact) => {
                  return html`
                    <a href="/game/relationship/${contact.id}" class="nav-item">
                      <div class="nav-text">
                        <span class="nav-heading"
                          >${contact.name} (Cousin)</span
                        >
                        <div class="nav-blurb">
                          Relationship
                          <div class="ml-2 progress-track">
                            <div
                              class="progress-fill"
                              style="width: ${contact.relationship}%;"
                            ></div>
                          </div>
                        </div>
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
            hx-post="/game/family/message"
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
