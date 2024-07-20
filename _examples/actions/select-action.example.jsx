import { NavItem } from "../../views/nav-item.view";

<NavItem
  headingText="Deposit"
  blurbText="Deposit money into your checking account"
  onClick="showPopup('#popup-confirm-')"
/>;

<div class="popup-backdrop" id="popup-confirm-">
  <div class="popup-box">
    <span class="popup-close-button">&times;</span>

    <div class="popup-header">
      <span class="popup-category">Checking</span>
    </div>

    <h1 class="popup-title">Deposit</h1>

    <p class="popup-subtitle">Deposit cash into your checkings account</p>

    <div class="popup-details">
      <div class="popup-detail">
        <span class="popup-detail-label">Current Cash:</span> $0
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
          max="100"
          name="amount"
          placeholder="Enter amount"
          class="popup-input"
        />
      </div>
      <button class="popup-button">Deposit</button>
    </form>
  </div>
</div>;
