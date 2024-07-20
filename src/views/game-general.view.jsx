import { GamePageView } from "./game.view";

export class GameGeneralView extends GamePageView {
  constructor() {
    super();
  }

  print({ player } = {}) {
    const View = () => (
      <>
        <div className="ui-container mb-[100px]">
          <div className="journal-section">
            <h2 className="journal-title">My Story</h2>
            <p className="journal-entry">Start building your life...</p>
            {player.storyLog.map((s) => (
              <p className="journal-entry">{s}</p>
            ))}
          </div>

          <div className="bottom-bar-container">
            <form method="POST" action="/game/life-event">
              <button>
                +1 Life Event
                <br />
                <small>(click me)</small>
              </button>
            </form>
          </div>
        </div>

        <div id="popup-response" />
      </>
    );

    return super.print({
      player,
      Body: View,
    });
  }
}
