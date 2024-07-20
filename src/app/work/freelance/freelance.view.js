import { GamePageView } from "../../../views/game.view";
import { NavItemView } from "../../../views/nav-item.view.js";
import { PopupView } from "../../../views/popup.view.js";
import { html } from "../../../utils.js";

const navItem = new NavItemView();
const popup = new PopupView();

export class FreelanceView extends GamePageView {
  constructor() {
    super();
  }

  print({ player }) {
    return super.print({
      player,
      body: html`
        <div class="ui-container">
          ${navItem.print({
            onClick: "showPopup('#handyman-confirm')",
            headingText: "Handyman",
            blurbText: "$20+/hr",
            icon: "check",
          })}
          ${popup.print({
            popupId: "handyman-confirm",
            type: "confirm",
            headingText: "Handyman Job",
            bodyText: "Offer your services today!",
            formAttributes: `
              hx-post="/game/work/freelance/handyman/ad"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
            formLabel: "Pick your rate:",
            formSelectName: "offerRate",
            formOptions: [
              {
                val: 20,
                text: "$20/hr",
              },
              {
                val: 25,
                text: "$25/hr",
              },
            ],
            formSubmitText: "Post an ad",
          })}
          ${navItem.print({
            onClick: "showPopup('#tutor-confirm')",
            headingText: "Tutor",
            blurbText: "$20+/hr",
            icon: "check",
          })}
          ${popup.print({
            popupId: "tutor-confirm",
            type: "confirm",
            headingText: "Tutor Job",
            bodyText: "Offer your services today!",
            formAttributes: `
              hx-post="/game/work/freelance/tutor/ad"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
            formLabel: "Pick your rate:",
            formSelectName: "offerRate",
            formOptions: [
              {
                val: 20,
                text: "$20/hr",
              },
              {
                val: 25,
                text: "$25/hr",
              },
            ],
            formSubmitText: "Post an ad",
          })}
          ${navItem.print({
            onClick: "showPopup('#caretaker-confirm')",
            headingText: "Caretaker",
            blurbText: "$10+/hr",
            icon: "check",
          })}
          ${popup.print({
            popupId: "caretaker-confirm",
            type: "confirm",
            headingText: "Caretaker Job",
            bodyText: "Offer your services today!",
            formAttributes: `
              hx-post="/game/work/freelance/caretaker/ad"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
            formLabel: "Pick your rate:",
            formSelectName: "offerRate",
            formOptions: [
              {
                val: 10,
                text: "$10/hr",
              },
              {
                val: 12,
                text: "$12/hr",
              },
              {
                val: 14,
                text: "$14/hr",
              },
              {
                val: 16,
                text: "$16/hr",
              },
            ],
            formSubmitText: "Post an ad",
          })}
          ${navItem.print({
            onClick: "showPopup('#lawn-care-confirm')",
            headingText: "Lawn Care",
            blurbText: "$10+/hr",
            icon: "check",
          })}
          ${popup.print({
            popupId: "lawn-care-confirm",
            type: "confirm",
            headingText: "Lawn Care Job",
            bodyText: "Offer your services today!",
            formAttributes: `
              hx-post="/game/work/freelance/lawncare/ad"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
            formLabel: "Pick your rate:",
            formSelectName: "offerRate",
            formOptions: [
              {
                val: 10,
                text: "$10/hr",
              },
              {
                val: 12,
                text: "$12/hr",
              },
              {
                val: 14,
                text: "$14/hr",
              },
              {
                val: 16,
                text: "$16/hr",
              },
            ],
            formSubmitText: "Post an ad",
          })}
          ${navItem.print({
            onClick: "showPopup('#babysitter-confirm')",
            headingText: "Babysitter",
            blurbText: "$8+/hr",
            icon: "check",
          })}
          ${popup.print({
            popupId: "babysitter-confirm",
            type: "confirm",
            headingText: "Babysitter Job",
            bodyText: "Offer your services today!",
            formAttributes: `
              hx-post="/game/work/freelance/babysitter/ad"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
            formLabel: "Pick your rate:",
            formSelectName: "offerRate",
            formOptions: [
              {
                val: 8,
                text: "$8/hr",
              },
              {
                val: 9,
                text: "$9/hr",
              },
              {
                val: 10,
                text: "$10/hr",
              },
              {
                val: 11,
                text: "$10/hr",
              },
              {
                val: 12,
                text: "$12/hr",
              },
            ],
            formSubmitText: "Post an ad",
          })}
          ${navItem.print({
            onClick: "showPopup('#dog-walker-confirm')",
            headingText: "Dog Walker",
            blurbText: "$8+/hr",
            icon: "check",
          })}
          ${popup.print({
            popupId: "dog-walker-confirm",
            type: "confirm",
            headingText: "Dog Walker Job",
            bodyText: "Offer your services today!",
            formAttributes: `
              hx-post="/game/work/freelance/dogwalker/ad"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
            formLabel: "Pick your rate:",
            formSelectName: "offerRate",
            formOptions: [
              {
                val: 8,
                text: "$8/hr",
              },
              {
                val: 9,
                text: "$9/hr",
              },
              {
                val: 10,
                text: "$10/hr",
              },
              {
                val: 11,
                text: "$10/hr",
              },
              {
                val: 12,
                text: "$12/hr",
              },
            ],
            formSubmitText: "Post an ad",
          })}
          ${navItem.print({
            onClick: "showPopup('#job-popup')",
            headingText: "Pet Sitter",
            blurbText: "$8+/hr",
            icon: "check",
          })}
          ${popup.print({
            popupId: "pet-sitter-confirm",
            type: "confirm",
            headingText: "Pet Sitter Job",
            bodyText: "Offer your services today!",
            formAttributes: `
              hx-post="/game/work/freelance/petsitter/ad"
              hx-trigger="submit"
              hx-swap="outerHTML"
              hx-target="#popup-result"
            `,
            formLabel: "Pick your rate:",
            formSelectName: "offerRate",
            formOptions: [
              {
                val: 8,
                text: "$8/hr",
              },
              {
                val: 9,
                text: "$9/hr",
              },
              {
                val: 10,
                text: "$10/hr",
              },
              {
                val: 11,
                text: "$10/hr",
              },
              {
                val: 12,
                text: "$12/hr",
              },
            ],
            formSubmitText: "Post an ad",
          })}
        </div>

        <div class="popup-backdrop" id="popup-result"></div>
      `,
    });
  }
}
