import Nano, { Helmet } from "nano-jsx-experiment";
import { css, html } from "../utils.js";

import { InnerHead } from "./head";

export class LandingPageView {
  _css = {};

  constructor({ req } = {}) {
    this._req = req;

    this._css = {};
  }

  get rootPath() {
    return this._req.baseUrl + this._req.path;
  }

  _resetCss() {
    this._css = {};
  }

  _printCss() {
    return Object.values(this._css).join("\n");
  }

  addCss(key, _css) {
    this._css[key] = _css;
  }

  print() {
    const discordJoinUrl = process.env.SUDO_USER
      ? "https://discord.com/oauth2/authorize?client_id=1251561961750007848&response_type=code&redirect_uri=https%3A%2F%2Fany-life.io%2Fauth%2Fdiscord%2Fredirect&scope=email"
      : "https://discord.com/oauth2/authorize?client_id=1251561961750007848&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fredirect&scope=email";

    const App = () => (
      <>
        <Helmet>
          <InnerHead />

          <link href="/public/css/landing.css" rel="stylesheet" />
        </Helmet>

        <div class="backdrop">
          <div class="popup">
            <h2>Construction in Progress</h2>
            <p>
              Welcome to Any Life - Life simulation (inspired by BitLife)! We're
              currently under construction, but you can still join our community
              and start playing.
            </p>

            <p>
              Start your new life as a newborn with a random character and
              family. Whether you aim to build a legitimate empire or explore
              alternative paths, the choice is yours. Pursue education, career,
              or other ventures to shape your destiny. Make impactful decisions,
              interact with diverse characters, and navigate the challenges of
              life to become whoever you aspire to be.
            </p>

            <p>Are you ready to live Any Life?</p>

            <a href="https://discord.gg/S8KnkR3XfK" target="_blank">
              Join our Discord
            </a>

            <a href={discordJoinUrl}>Sign In to Play Now</a>
          </div>
        </div>

        <footer>
          <h4>JOIN THE COMMUNITY</h4>

          <div class="social-links">
            <a href="https://discord.gg/S8KnkR3XfK">
              <img src="/public/images/discord-icon.svg" />
            </a>
          </div>

          <p>
            <a href="#">Privacy & Policy</a> |<a href="#">Terms & Conditions</a>
          </p>

          <p>&copy; 2024 Any Life LLC.</p>
        </footer>
      </>
    );

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
          ${ssrHead.join("\n")}

          <style>
            ${this._printCss()}
          </style>
        </head>
        <body ${attributes.body.toString()}>
          ${ssrBody} ${footer.join("\n")}
        </body>
      </html>
    `;

    // this resets any addCss() calls made when printing page
    this._resetCss();

    return _html;
  }
}
