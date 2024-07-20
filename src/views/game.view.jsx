import Nano, { Helmet } from "nano-jsx-experiment";
import { css, html, stripExtraNewLines, stripExtraSpace } from "../utils.js";

import { InnerHead } from "./head";

export class GamePageView {
  _css = {};

  constructor({ req } = {}) {
    this._req = req;

    this._css = {};
  }

  get rootPath() {
    return this._rootPath || this._req.baseUrl + this._req.path;
  }

  set rootPath(_rootPath) {
    this._rootPath = _rootPath;
  }

  _resetCss() {
    this._css = {};
  }

  _printSection(string) {
    return stripExtraNewLines(stripExtraSpace(string || ""));
  }

  _printCss() {
    return Object.values(this._css).join("\n");
  }

  addCss(key, _css) {
    this._css[key] = _css;
  }

  NavLinks({ player }) {
    return (
      <>
        <ul>
          <li>
            <a className="button" href="/game">
              General
            </a>
          </li>

          <li>
            <a class="button" href="/game/activities">
              Activites
            </a>
          </li>

          {/* <li>
            <a
              className="button"
              href={`/game/city/hoods/${player.location.street.hood.name}/streets/${player.location.street.name}`}
            >
              Current Street
            </a>
          </li> */}

          {/* <li>
            <a class="button" href="/game/city">
              The City
            </a>
          </li> */}

          <li>
            <a class="button" href="/game/assets">
              Assets
            </a>
          </li>

          <li>
            <a class="button" href="/game/family">
              Family
            </a>
          </li>

          <li>
            <a class="button" href="/game/contacts">
              Contacts
            </a>
          </li>

          <li>
            <a class="button" href="/game/bank">
              Bank
            </a>
          </li>

          <li>
            <a class="button" href="/game/education">
              Education
            </a>
          </li>

          <li>
            <a class="button" href="/game/work">
              Work
            </a>
          </li>

          <li>
            <a class="button" href="/game/market">
              Market
            </a>
          </li>

          <li>
            <a class="button" href="/game/real-estate">
              Real Estate
            </a>
          </li>
        </ul>
      </>
    );
  }

  NavigationBar({ parent, player }) {
    parent.addCss(
      "navigation",
      css`
        .social-links {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2rem;
        }

        .social-links img {
          height: 40px;
          width: 40px;
        }

        .left {
          flex: 2;
        }

        @media screen and (max-width: 600px) {
          .left {
            display: none;
          }
        }

        .menu-icon {
          font-size: 24px;
          color: #fff;
          cursor: pointer;
          display: none;
          border: 1px solid white;
          padding: 1rem;
          margin: 1rem;
          background-color: #333;
        }

        .left-nav ul {
          list-style-type: none;
          margin: 0;
          padding: 1rem;
          padding-top: 0;
        }

        .left-nav ul li {
          position: relative;
          margin-top: 0.25rem;
        }

        .left-nav ul li ul {
          display: none;
          list-style-type: none;
          margin: 0;
          padding: 0;
          position: absolute;
          left: 100%;
          top: 0;
          background-color: #444;
        }

        .left-nav ul li:hover ul {
          display: block;
        }

        .left-nav a {
          text-decoration: none;
          padding: 10px;
          display: block;
        }

        .left-nav a:hover {
          background-color: #575757;
        }
      `
    );

    return (
      <nav class="left-nav">
        <parent.NavLinks player={player} />
      </nav>
    );
  }

  MobileNavigation({ parent, player }) {
    parent.addCss(
      "mobile-navigation",
      css`
        .menu-icon {
          font-size: 24px;
          color: #fff;
          cursor: pointer;
          display: none;
        }

        .left-nav.mobile {
          display: none;
        }

        @media screen and (max-width: 600px) {
          .menu-icon {
            display: block;
          }

          .left-nav.mobile {
            flex-direction: column;
            width: 100%;
            z-index: 1;
          }

          .left-nav ul {
            flex-direction: column;
          }

          .left-nav ul li ul {
            position: relative;
            left: 0;
            top: 0;
          }

          .left-nav ul li {
            width: 100%;
          }

          .left-nav a {
            width: 100%;
            padding: 10px;
          }
        }
      `
    );

    return (
      <>
        <div class="menu-icon" id="menu-icon">
          &#9776; Menu
        </div>

        <nav class="mobile left-nav">
          <parent.NavLinks player={player} />
        </nav>
      </>
    );
  }

  print({ player, head = "", body, Body } = {}) {
    const alert = player.alert;
    const feedback = player.feedback;
    const wasInjured = player.wasInjured;
    const unselectedLifeChoice = player.lifeChoices
      .filter((e) => !e.showAtAge || e.showAtAge === player.age)
      .find((c) => c.selected === null);

    if (alert) player.alert = null;
    if (feedback) player.feedback = null;
    if (wasInjured) player.wasInjured = false;

    const App = () => {
      return (
        <>
          <Helmet>
            <InnerHead />

            <link href="/public/popup.css" rel="stylesheet" />
            <link href="/public/app.css" rel="stylesheet" />
          </Helmet>

          <div className={`overlay ${wasInjured ? "flash" : ""}`} />

          {unselectedLifeChoice && (
            <unselectedLifeChoice.view {...unselectedLifeChoice} />
          )}

          {alert ? (
            alert
          ) : (
            <div id="alert-container" className="hidden">
              <div id="alert-message">
                <h2>Mission Failed!</h2>
                <p>You didn't complete the task in time.</p>
                <p>
                  You lost 10 reputation points and $500. Gang members are now
                  after you!
                </p>
                <button onclick="closeAlert()">Acknowledge</button>
              </div>
            </div>
          )}

          <div className="banner">
            <small>
              This game is in Alpha for testing, please join our community
              <a
                class="text-[#5865F2]"
                target="_blank"
                href="https://discord.gg/S8KnkR3XfK"
              >
                <b>&nbsp;Discord&nbsp;</b>
              </a>
              for updates and support.
            </small>
          </div>

          <div className="status-bar">
            <div className="status-item">
              <span className="status-value" id="player-name">
                {player.name}
              </span>
            </div>

            <div className="status-item">
              <span className="status-label">Age:</span>
              <span className="status-value" id="player-age">
                {player.age}
              </span>
              &nbsp;
              <span className="status-value" id="player-life-points">
                ({player.lifePoints})
              </span>
            </div>

            <div className="status-item">
              <span className="status-label">Cash:</span>
              <span className="status-value" id="player-cash">
                {player.cash.format()}
              </span>
            </div>

            <div className="status-item">
              <span className="status-label">Happiness:</span>
              <div className="status-progress">
                <div
                  className="status-progress-fill"
                  id="player-happiness"
                  style={`width: ${player.happiness}%;`}
                ></div>
              </div>
            </div>
            <div className="status-item">
              <span className="status-label">Health:</span>
              <div className="status-progress">
                <div
                  className="status-progress-fill"
                  id="player-health"
                  style="width: ${player.health}%;"
                ></div>
              </div>
            </div>
          </div>

          <div className={`custom-container ${wasInjured ? "shake" : ""}`}>
            <div className="left">
              <this.NavigationBar parent={this} player={player} />
            </div>

            <div className="right">
              <this.MobileNavigation parent={this} player={player} />
              {feedback || ""} <Body />{" "}
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </div>
        </>
      );
    };

    const {
      body: ssrBody,
      head: ssrHead,
      footer,
      attributes,
    } = Helmet.SSR(Nano.renderSSR(<App />));

    const _html = html`
      <!DOCTYPE html>
      <html ${attributes.html.toString()}>
        <head>
          ${head} ${ssrHead.join("\n")}

          <style>
            ${this._printCss()}
          </style>
        </head>
        <body ${attributes.body.toString()}>
          ${ssrBody} ${footer.join("\n")}

          <script>
            document
              .getElementById("menu-icon")
              .addEventListener("click", function () {
                const leftNav = document.querySelector(".left-nav.mobile");
                if (leftNav.style.display === "flex") {
                  leftNav.style.display = "none";
                } else {
                  leftNav.style.display = "flex";
                }
              });

            function closeAlert() {
              document
                .getElementById("alert-container")
                .classList.add("hidden");
            }

            function togglePopup(e, id) {
              const $mapPin = e.target.closest(".map-pin");
              const $popup = id
                ? document.getElementById("popup-" + id)
                : $mapPin.querySelector(".map-popup");

              if (e.target.classList.contains("close-button")) {
                $popup.style.display = "none";
              } else {
                $popup.style.display = "block";
              }
            }

            function filterMapList(type) {
              const $popups = document.querySelectorAll(".map-popup");
              $popups.forEach(($p) => {
                const $mapPin = $p.closest(".map-pin");

                if (type === "all") {
                  $mapPin.style.display = "block";
                } else {
                  if (!$p.className.includes(type)) {
                    $mapPin.style.display = "none";
                  } else {
                    $mapPin.style.display = "block";
                  }
                }
              });
            }

            const $headers = document.querySelectorAll(".accordion-header");

            $headers.forEach(($header) => {
              $header.addEventListener("click", () => {
                $headers.forEach(($_header) => {
                  if ($_header !== $header) {
                    const content = $_header.nextElementSibling;
                    content.style.display = "none";
                  }
                });

                const content = $header.nextElementSibling;
                if (
                  content.style.display === "none" ||
                  !content.style.display
                ) {
                  content.style.display = "block";
                } else {
                  content.style.display = "none";
                }
              });
            });

            document.body.addEventListener("click", (e) => {
              const $el = document.querySelector("#popup-result");

              if (e.target.classList.contains("popup-close-button")) {
                e.target.closest(".popup-backdrop").style.display = "none";
              }

              if (
                $el &&
                (($el.style.display !== "" && $el.style.display !== "none") ||
                  $el.classList.contains("flex"))
              ) {
                const redirect = $el.getAttribute("data-redirect");
                $el.style.display = "none";

                if (redirect) {
                  window.location.replace(redirect);
                } else {
                  window.location.reload();
                }
              }
            });

            document.body.addEventListener("click", (e) => {
              const $popups = document.querySelectorAll(".popup");

              $popups.forEach(($p) => {
                if (
                  $p &&
                  $p.style.display !== "" &&
                  $p.style.display !== "none"
                ) {
                  $p.style.display = "none";
                }
              });
            });

            function showPopup(e, id) {
              if (!id) {
                document.querySelector(e ?? "#popup-confirm").style.display =
                  "flex";
              } else {
                e.stopPropagation();
                document.querySelector(id).style.display = "flex";
              }
            }
          </script>
        </body>
      </html>
    `;

    // this resets any addCss() calls made when printing page
    this._resetCss();

    return _html;
  }
}
