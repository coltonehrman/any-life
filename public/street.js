const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
const socket = io("/streets");

socket.on("connect", () => {
  socket.on("chat-message", (message) => {
    document.getElementById("chat-messages").innerHTML +=
      '<li class="list-item"><span class="name">' + message + "</span></li>";

    const $chat = document.getElementsByClassName("chat")[0];

    $chat.scrollTo(0, $chat.scrollHeight);
  });

  socket.on("hit", (hit) => {
    const $overlay = document.querySelector(".overlay");

    $overlay.classList.remove("flash", "shake");

    if (hit) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          $overlay.classList.add("flash", "shake");
        });
      });
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          $overlay.classList.add("shake");
        });
      });
    }
  });

  socket.on("players", (players) => {
    for (const player of players.filter((p) => p.socketId !== socket.id)) {
      const el = document.createElement("div");
      el.innerHTML = html`
        <div
          style="top: ${player.y}; left: ${player.x}"
          class="map-pin"
          onclick="togglePopup(event)"
        >
          <img
            style="filter: hue-rotate(20deg) saturate(125);"
            src="/public/images/map-pin.svg"
          />
          <div class="icon-tag">${player.name}</div>

          <div id="popup-${player.id}" class="player-popup map-popup">
            <div class="map-popup-header">
              <h2>Player</h2>
            </div>

            <div class="map-popup-body">
              <div class="attributes">
                <div class="attribute">
                  <span class="attribute-label">Name:</span>
                  <span class="attribute-value">${player.name}</span>
                </div>

                <div class="attribute">
                  <span class="attribute-label">Health:</span>
                  <span class="attribute-value">100%</span>
                </div>
              </div>

              <div class="actions">
                <button class="action-button rob-button">
                  Rob<br /><small>(Lose 1 Street Cred)</small>
                </button>

                <button
                  hx-post="${document.location
                    .pathname}/players/${player.id}/fight"
                  hx-swap="none"
                  class="action-button rob-button"
                >
                  Fight
                </button>
              </div>
            </div>

            <button class="close-button">Close</button>
          </div>
        </div>
      `;

      document.getElementById("map-pins").appendChild(el.children[0]);
    }

    htmx.process(document.body);
  });
});

document
  .getElementById("send-chat-message")
  .addEventListener("click", function () {
    const $chatMessageInput = document.getElementById("chat-message-input");

    const chatMessage = $chatMessageInput.value;

    if (chatMessage.trim().length > 0) {
      socket.emit("chat-message", chatMessage.trim());
      $chatMessageInput.value = "";
    }
  });
