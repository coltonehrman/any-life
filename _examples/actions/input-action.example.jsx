import { NavItem } from "../../views/nav-item.view";
import { PopupView } from "../../views/popup.view";

const popup = new PopupView();

<NavItem
  headingText="Handyman"
  blurbText="$20+/hr"
  icon="check"
  onClick="showPopup('#handyman-confirm')"
/>;

popup.print({
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
});
