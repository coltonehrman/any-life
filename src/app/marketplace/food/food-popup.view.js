export const FoodPopup = ({
  id,
  name,
  description,
  price,
  ingredients,
  size,
} = {}) => {
  return (
    <div class="popup-backdrop" id={`popup-confirm-${id}`}>
      <div class="popup-box">
        <span class="popup-close-button">&times;</span>
        <div class="popup-header">
          <span class="popup-category">Food</span>
        </div>
        <h1 class="popup-title">{name}</h1>
        <p>{description}</p>
        <div class="popup-details">
          <div class="popup-detail">
            <span class="popup-detail-label">Price:</span> {price}
          </div>
          <div class="popup-detail">
            <span class="popup-detail-label">Includes:</span> {ingredients}
          </div>
          <div class="popup-detail">
            <span class="popup-detail-label">Size:</span> {size}
          </div>
        </div>
        <button
          class="popup-button"
          hx-post="/game/market/food"
          hx-vals={`{"itemId": "${id}"}`}
          hx-target="#popup-result"
          hx-swap="outerHTML"
        >
          Buy it
        </button>
        
        <button class="popup-button popup-close-button">
          Nevermind I can't
        </button>
      </div>
    </div>
  );
};
