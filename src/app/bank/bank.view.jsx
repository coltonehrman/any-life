import { GamePageView } from "../../views/game.view";
import { NavItem } from "../../views/nav-item.view";

export class BankView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      Body: () => (
        <div class="ui-container">
          <NavItem
            disabled={player.age < 18}
            href="/game/bank/checking"
            headingText="Checking Account"
            blurbText="View your checking account"
          />

          <NavItem
            disabled={player.age < 18}
            href="/game/bank/savings"
            headingText="Savings Account"
            blurbText="View your savings account"
          />

          <NavItem disabled headingText="Loan" blurbText="Apply for a loan" />
          <NavItem
            disabled
            headingText="Credit Card"
            blurbText="Apply for a credit card"
          />
          <NavItem
            disabled
            headingText="Bankruptcy"
            blurbText="File for bankruptcy"
          />
        </div>
      ),
    });
  }
}
