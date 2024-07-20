import Nano, { Helmet } from "nano-jsx-experiment";

import { InnerHead } from "./head";
import { html } from "../utils.js";

export class ErrorView {
  print() {
    const App = () => (
      <>
        <Helmet>
          <InnerHead />

          <link href="/public/css/error.css" rel="stylesheet" />
        </Helmet>

        <div class="error-screen">
          <div class="error-container">
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are sorry about the issues. We are still working on the game
              and will come across bugs.
            </p>
            <p>
              Please help and support us by letting us know in our
              <a href="https://discord.gg/S8KnkR3XfK" target="_blank">
                Discord
              </a>
              .
            </p>
            <a
              href="https://discord.gg/S8KnkR3XfK"
              target="_blank"
              class="button"
            >
              <img src="/public/images/discord-icon.svg" /> Join Discord
            </a>
          </div>
        </div>
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
        </head>
        <body ${attributes.body.toString()}>
          ${ssrBody} ${footer.join("\n")}
        </body>
      </html>
    `;

    return _html;
  }
}
