import Nano, { Helmet } from "nano-jsx-experiment";

import { Chance } from "chance";
import { InnerHead } from "./head";
import { html } from "../utils.js";

const chance = new Chance();

export class GameStartView {
  print() {
    const App = () => (
      <>
        <Helmet>
          <InnerHead />

          <link href="/public/css/game-start.css" rel="stylesheet" />
        </Helmet>

        <div class="character-selection">
          <h1>Choose Your Character</h1>
          <div class="character-image">
            <img src="/public/images/family-image.png" />
          </div>

          <form method="POST">
            <div class="input-group">
              <label for="username">Enter User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter User Name"
                value={chance.name()}
              />
            </div>

            <button type="submit" class="submit-button">
              Lets Roll
            </button>
          </form>
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
