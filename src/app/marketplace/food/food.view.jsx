import { FoodPopup } from "./food-popup.view";
import { GamePageView } from "../../../views/game.view";

export class FoodView extends GamePageView {
  constructor() {
    super();
  }

  print(player) {
    return super.print({
      player: player,
      Body: () => (
        <div class="ui-container">
          <div class="section-heading">Fast-Food</div>

          <div
            class="nav-item"
            __htmlonclick={`showPopup('#popup-confirm-${"chinese"}')`}
          >
            <div class="nav-text">
              <span class="nav-heading">
                Chinese Takeout (Rice, Egg roll, Chicken)
              </span>
              <span class="nav-blurb">$13</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"chinese"}
            name="Chinese Takeout"
            description="Buy some delicious food!"
            price="$13"
            ingredients="Rice, Egg roll, Chicken"
            size="Large"
          />

          <div
            class="nav-item"
            __htmlonclick="showPopup('#popup-confirm-tacos')"
          >
            <div class="nav-text">
              <span class="nav-heading">Tacos (5 Small Tacos)</span>
              <span class="nav-blurb">$10</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"tacos"}
            name="Tacos"
            description="Buy some delicious food!"
            price="$10"
            ingredients="5 small tacos"
            size="Large"
          />

          <div
            class="nav-item"
            __htmlonclick="showPopup('#popup-confirm-burger')"
          >
            <div class="nav-text">
              <span class="nav-heading">
                Burger Meal (Burger, Large fry, Large drink)
              </span>
              <span class="nav-blurb">$17</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"burger"}
            name="Burger Meal"
            description="Buy some delicious food!"
            price="$17"
            ingredients="Burger, large dry, large drink"
            size="Large"
          />

          <div
            class="nav-item"
            __htmlonclick="showPopup('#popup-confirm-fries')"
          >
            <div class="nav-text">
              <span class="nav-heading">French Fries (Large Fry)</span>
              <span class="nav-blurb">$5</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"fries"}
            name="French Fries"
            description="Buy some delicious food!"
            price="$5"
            ingredients="Large Fry"
            size="Large"
          />

          <div
            class="nav-item"
            __htmlonclick="showPopup('#popup-confirm-fried-chicken')"
          >
            <div class="nav-text">
              <span class="nav-heading">Fried Chicken (Family Bucket)</span>
              <span class="nav-blurb">$20</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"fried-chicken"}
            name="Fried Chicken"
            description="Buy some delicious food!"
            price="$20"
            ingredients="Family bucket"
            size="Large"
          />

          <div
            class="nav-item"
            __htmlonclick="showPopup('#popup-confirm-nuggets')"
          >
            <div class="nav-text">
              <span class="nav-heading">Chicken Nuggets (20-Piece Nugget)</span>
              <span class="nav-blurb">$20</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"nuggets"}
            name="Nuggets"
            description="Buy some delicious food!"
            price="$20"
            ingredients="20-piece nugget"
            size="Large"
          />

          <div
            class="nav-item"
            __htmlonclick="showPopup('#popup-confirm-ice-cream')"
          >
            <div class="nav-text">
              <span class="nav-heading">Ice-Cream Cone (Large Cone)</span>
              <span class="nav-blurb">$5</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"ice-cream"}
            name="Ice Creame Cone"
            description="Buy some delicious food!"
            price="$5"
            ingredients="Large cone"
            size="Large"
          />

          <div
            class="nav-item"
            __htmlonclick="showPopup('#popup-confirm-salad')"
          >
            <div class="nav-text">
              <span class="nav-heading">
                Garden Salad (Veggies and Dressing)
              </span>
              <span class="nav-blurb">$9</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"salag"}
            name="Garden Salad"
            description="Buy some delicious food!"
            price="$9"
            ingredients="Veggies, dressing"
            size="Large"
          />

          <div class="nav-item" onclick="showPopup('#popup-confirm-cola')">
            <div class="nav-text">
              <span class="nav-heading">Cola (Large Beverage)</span>
              <span class="nav-blurb">$1</span>
            </div>
            <span class="nav-arrow">...</span>
          </div>

          <FoodPopup
            id={"salag"}
            name="Cola"
            description="Buy a refreshing drink!"
            price="$1"
            ingredients="Soda"
            size="Large"
          />

          <div id="popup-result" class="popup-backdrop"></div>
        </div>
      ),
    });
  }
}
