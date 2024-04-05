import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let quantity = 0;
  cart.forEach((cartItem) => {
    //calculate total price
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    //calculate shipping
    const deliveryOption = getDeliveryOption(cartItem.deliveryDateId);
    shippingPriceCents += deliveryOption.priceCents;
    //calculate total quantity in the  cart
    quantity += cartItem.quantity;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  document.querySelector(".js-payment-summary").innerHTML = `
    <h3>Order Summary</h3>

    <div class="between item">
      <span>Items (${quantity}):</span>
      <span>
        $${formatCurrency(productPriceCents)}
      </span>
    </div>

    <div class="between shipping">
      <span>Shipping & handling:</span>
      <span>
        $${formatCurrency(shippingPriceCents)}
      </span>
    </div>

    <div class="between total">
      <span>Total before tax:</span>
      <span>
        $${formatCurrency(totalBeforeTaxCents)}
      </span>
    </div>

    <div class="between tax">
      <span>Estimated tax (10%):</span>
      <span>
        $${formatCurrency(taxCents)}
      </span>
    </div>
    <hr />

    <div class="between order-total">
      <span>Order total:</span>
      <span>
        $${formatCurrency(totalCents)}
      </span>
    </div>

    <button class="payment-btn">Place your order</button>
    `;
}
