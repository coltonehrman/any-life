export const PopupResult = ({ title, description, progress, redirect }) => {
  return (
    <div
      id="popup-result"
      style="display: flex;"
      class="popup-backdrop"
      data-redirect={redirect}
    >
      <div class="popup-box">
        <h1 class="popup-title">{title}</h1>
        <p class="popup-description">{description}</p>

        {progress && (
          <div>
            <div class="progress-label">
              <span>{progress.title}</span>
              <span>{progress.span}</span>
            </div>

            <div class="progress-track !w-full">
              <div
                class="progress-fill"
                style={`width: ${progress.width};`}
              ></div>
            </div>
          </div>
        )}

        <div class="popup-bottom-text">tap anywhere to continue</div>
      </div>
    </div>
  );
};
