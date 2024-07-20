import { html } from "../utils.js";

export class NavItemView {
  print({
    onClick,
    attributes,
    href,
    headingText,
    blurbText,
    blurbProgress,
    icon,
    disabled,
  }) {
    const wrapper = href
      ? (body) =>
          html`<a
            href="${!disabled && href}"
            class="nav-item ${disabled ? "disabled" : ""}"
            >${body}</a
          >`
      : (body) =>
          html`<div
            class="nav-item ${disabled ? "disabled" : ""}"
            ${attributes && !disabled ? attributes : ""}
            ${onClick && !disabled ? html`onclick="${onClick}"` : ""}
          >
            ${body}
          </div>`;

    return html`
      ${wrapper(html`
        <div class="nav-text">
          <span class="nav-heading">${headingText}</span>
          <div class="nav-blurb">
            ${blurbText ?? ""}
            ${typeof blurbProgress !== "undefined"
              ? html`<div class="progress-track">
                  <div
                    class="progress-fill"
                    style="width: ${blurbProgress}%;"
                  ></div>
                </div>`
              : ""}
          </div>
        </div>
        <span class="nav-icon"
          >${icon === "check"
            ? "✔️"
            : icon === "arrow"
            ? "&rarr;"
            : "..."}</span
        >
      `)}
    `;
  }
}

export const NavItem = ({
  onClick,
  href,
  headingText,
  blurbText,
  blurbProgress,
  icon,
  disabled,
  ...attributes
}) => {
  const Wrapper = href
    ? ({ children }) => (
        <a
          {...(!disabled && href && { href })}
          class={`nav-item ${disabled ? "disabled" : ""}`}
        >
          {children}
        </a>
      )
    : ({ children }) => (
        <div
          class={`nav-item ${disabled ? "disabled" : ""}`}
          onClick={!disabled && onClick}
          {...(!disabled && attributes)}
        >
          {children}
        </div>
      );

  return (
    <Wrapper>
      <div class="nav-text">
        <span class="nav-heading">{headingText}</span>
        <div class="nav-blurb">
          {blurbText}
          {typeof blurbProgress !== "undefined" && (
            <div class="ml-1 progress-track">
              <div
                class="progress-fill"
                style={`width: ${blurbProgress}%;`}
              ></div>
            </div>
          )}
        </div>
      </div>
      <span class="nav-icon">
        {icon === "check" && "✔️"}
        {icon === "arrow" && "→"}
        {icon !== "check" && icon !== "arrow" && "..."}
      </span>
    </Wrapper>
  );
};
