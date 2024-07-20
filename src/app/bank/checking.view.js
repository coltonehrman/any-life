import { GamePageView } from "../../views/game.view";
import { Money } from "../items/money.model.js";
import { NavItemView } from "../../views/nav-item.view.js";
import { html } from "../../utils.js";

const navItem = new NavItemView();

export class CheckingView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      body: html`<div class="ui-container">
          <div class="nav-item">
            <div class="nav-text">
              <span class="nav-heading">Total Amount</span>
              <span class="nav-blurb"
                >${player.bank.checking.amount.format()}</span
              >
            </div>
            <span class="nav-arrow"></span>
          </div>

          ${navItem.print({
            headingText: "Deposit",
            blurbText: "Deposit money into your checking account",
            onClick: "showPopup('#popup-confirm-deposit')",
          })}

          <div class="popup-backdrop" id="popup-confirm-deposit">
            <div class="popup-box">
              <span class="popup-close-button">&times;</span>
              <div class="popup-header">
                <span class="popup-category">Checking</span>
              </div>
              <h1 class="popup-title">Deposit</h1>
              <p class="popup-subtitle">
                Deposit cash into your checkings account
              </p>

              <div class="popup-details">
                <div class="popup-detail">
                  <span class="popup-detail-label">Current Cash:</span>
                  ${player.cash.format()}
                </div>
              </div>

              <form
                hx-post="/game/bank/checking/deposit"
                hx-target="#popup-result"
                hx-swap="outerHTML"
              >
                <div class="popup-input-container">
                  <input
                    type="text"
                    min="1"
                    max="${Money.convertToFloat(player.cash)}"
                    name="amount"
                    placeholder="Enter amount"
                    class="popup-input"
                  />
                </div>
                <button class="popup-button">Deposit</button>
              </form>
            </div>
          </div>

          <div class="nav-item">
            <div class="nav-text">
              <span class="nav-heading">Withdraw</span>
              <span class="nav-blurb"
                >Withdraw money from your checking account</span
              >
            </div>
            <span class="nav-arrow">...</span>
          </div>

          ${navItem.print({
            headingText: "Transactions",
            blurbText: "View your transactions",
            onClick: "showPopup('#popup-confirm-transactions')",
          })}

          <div class="popup-backdrop" id="popup-confirm-transactions">
            <div class="popup-box">
              <span class="popup-close-button">&times;</span>
              <div class="popup-header">
                <span class="popup-category">Checking</span>
              </div>
              <h1 class="popup-title">Transactions</h1>
              <p class="popup-subtitle">Recent transactions</p>

              <div class="popup-details">
                ${player.bank.checking.transactions
                  .map(
                    (t) => html`
                      <div class="popup-detail">
                        <span class="popup-detail-label">${t.type}: </span>
                        ${t.amount.format()}
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>

        <div id="popup-result" class="popup-backdrop"></div> `,
    });
  }
}
