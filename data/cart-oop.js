function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
        {
          deliveryDateId: "1",
          productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
          quantity: 4,
        },
        {
          deliveryDateId: "3",
          productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
          quantity: 4,
        },
      ];
    },
    // save cart in localStorage
    saveCartToStorage() {
      localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
    },
    // add products to cart
    addToCart(productId, test = false) {
      const cartQuantitySelecotr = test
        ? 1
        : +document.querySelector(`.js-quantit-selector-${productId}`).value;
      let matchItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) matchItem = item;
      });
      if (matchItem) {
        matchItem.quantity += cartQuantitySelecotr;
      } else {
        this.cartItems.push({
          productId,
          quantity: cartQuantitySelecotr,
          deliveryDateId: "1",
        });
      }
      this.saveCartToStorage();
    },
    // update and display the quantity of the cart
    updateCartQuantity(elementClass) {
      let cartQuantity = 0;
      this.cartItems.forEach((item) => (cartQuantity += item.quantity));
      const element = document.querySelector(elementClass);
      element.textContent = item.quantity;
    },
    // delete cart
    deleteCart(productId) {
      const newCart = cart.filter(
        (cartItem) => cartItem.productId !== productId
      );
      this.cartItems = newCart;
      this.saveCartToStorage();
    },
    // update

    updateCart(productId, notification) {
      const container = document.querySelector(`.js-checkout-${productId}`);
      const inputEl = document.querySelector(`.js-quantity-input-${productId}`);
      const quantityValue = +inputEl.value;
      container.classList.add("is-cart-editing");
      // validation
      if (!quantityValue || quantityValue < 1 || quantityValue >= 1000) {
        inputEl.style.borderColor = "red";
        let timeout;
        notification("Fill out the filed.", timeout);
        return;
      }

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = quantityValue;
        }
      });
      this.saveCartToStorage();
      this.updateCartQuantity(".js-cart-quantity");
      inputEl.value = "";
      container.classList.remove("is-cart-editing");
      let timeout;
      notification("Updated!", timeout, "sucess");
    },
    // update delivery option
    updateDeliveryOption(productId, deliveryOptionId) {
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          cartItem.deliveryDateId = deliveryOptionId;
        }
      });
      this.saveCartToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
cart.loadFromStorage();
console.log(cart);
