import { GamePageView } from "../../views/game.view";
import { html } from "../../utils.js";

export class SavingsView extends GamePageView {
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
            <span class="nav-blurb">$0.00</span>
          </div>
          <span class="nav-arrow"></span>
        </div>

        <div class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">Deposit</span>
            <span class="nav-blurb"
              >Deposit money into your savings account</span
            >
          </div>
          <span class="nav-arrow">...</span>
        </div>

        <div class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">Withdraw</span>
            <span class="nav-blurb"
              >Withdraw money from your savings account</span
            >
          </div>
          <span class="nav-arrow">...</span>
        </div>

        <div class="nav-item">
          <div class="nav-text">
            <span class="nav-heading">Transactions</span>
            <span class="nav-blurb">View your transactions</span>
          </div>
          <span class="nav-arrow">→</span>
        </div>
      </div>`,
    });
  }
}
