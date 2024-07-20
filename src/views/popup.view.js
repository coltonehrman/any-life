import { html } from "../utils.js";

export class PopupView {
  print({
    show,
    noClose,
    popupId,
    type,
    headingText,
    bodyText,
    bodyHtml,
    details,
    footerHtml,
    formAttributes,
    formLabel,
    formSelectName,
    formOptions,
    formButtons,
    formSubmitText,
  }) {
    if (type === "result") {
      return html`<div
        ${show ? `style="display: flex;"` : ""}
        id="popup-result"
        class="popup-backdrop"
      >
        <div class="popup-box">
          <h1>${headingText}</h1>
          ${bodyText ? html`<p>${bodyText}</p>` : ""} ${bodyHtml ?? ""}
          ${bodyHtml ?? ""}
          ${details
            ? html`
                <div class="popup-stats">
                  ${details
                    .map(([text, value]) => html` <p>${text}: ${value}</p> `)
                    .join("")}
                </div>
              `
            : ""}
        </div>

        <div class="popup-bottom-text">Tap anywhere to continue</div>
      </div>`;
    }

    if (type === "confirm") {
      const formId = crypto.randomUUID();

      return html`<div
        ${show ? `style="display: flex;"` : ""}
        class="popup-backdrop ${noClose ? "" : "has-close-button"}"
        id="${popupId}"
      >
        <div class="popup-box">
          ${noClose
            ? ""
            : html`<span class="popup-close-button">&times;</span>`}
          <h1>${headingText}</h1>
          ${bodyText ? html`<p>${bodyText}</p>` : ""} ${bodyHtml ?? ""}
          ${details
            ? html`
                <div class="popup-stats">
                  ${details
                    .map(([text, value]) => html` <p>${text}: ${value}</p> `)
                    .join("")}
                </div>
              `
            : ""}
          ${footerHtml ?? ""}

          <form class="popup-form" ${formAttributes}>
            ${formLabel
              ? html`<label for="form-select-${formId}">${formLabel}</label>`
              : ""}
            ${formOptions
              ? html`<select
                  id="form-select-${formId}"
                  name="${formSelectName}"
                >
                  ${formOptions
                    .map(
                      (o) => html`<option value="${o.val}">${o.text}</option>`
                    )
                    .join("")}
                </select>`
              : ""}
            ${formButtons
              ? formButtons
              : html`<button type="submit">${formSubmitText}</button>`}
          </form>
        </div>
      </div>`;
    }
  }
}
