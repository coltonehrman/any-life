export const PopupResult = ({ title, description, redirect }) => {
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
        <div class="popup-bottom-text">tap anywhere to continue</div>
      </div>
    </div>
  );
};
