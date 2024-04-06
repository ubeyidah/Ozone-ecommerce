import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../../scripts/utils/money.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "3ebe75dc-64d2-4137-8860-1f5a963e534b";
  const productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";
  beforeEach(() => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          deliveryDateId: "1",
          productId: productId1,
          quantity: 4,
        },
        {
          deliveryDateId: "3",
          productId: productId2,
          quantity: 2,
        },
      ]);
    });
    loadFromStorage();
    document.querySelector(".js-test-container").innerHTML = `    
    <div class="js-checkout-header"></div>
    <div class="js-order-summary-lists"></div>
    <div class="js-payment-summary"></div>`;

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });
  it("displays the cart", () => {
    expect(cart[0].quantity).toEqual(4);
    expect(cart[1].quantity).toEqual(2);
    expect(cart.length).toEqual(2);
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-cart-quantity-${productId1}`).innerText
    ).toContain("Quantity: 4");
    expect(
      document.querySelector(`.js-cart-quantity-${productId2}`).innerText
    ).toContain("Quantity: 2");
    const product1Detail = getProduct(productId1);
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual(product1Detail.name);
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual(`$${formatCurrency(product1Detail.priceCents)}`);
  });

  it("remove Product", () => {
    spyOn(localStorage, "setItem");
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(cart.length).toEqual(1);
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
  });
});
