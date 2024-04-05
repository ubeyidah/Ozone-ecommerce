import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let quantity = 0;
  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  });
  document.querySelector(".js-checkout-header").innerHTML = `
    <div class="container">
      <!-- header left section -->
      <div class="ozone-header__left">
        <a href="index.html" class="ozone-header__logo">O<span>zone</span></a>
        <a href="index.html" class="ozone-header__mobile-logo none">O</a>
      </div>
      <!-- header middle section -->
      <div class="ozone-header__middle center">
        <p>
          Checkout (
          <a href="index.html">${quantity} items</a>)
        </p>
      </div>
      <!-- header right section -->
      <div class="ozone-header__right">
        <img
          src="images/icons/checkout-lock-icon.png"
          alt="checkout-lock-icon"
        />
      </div>
    </div>
    `;
}
