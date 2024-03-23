export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 5
}];

export const addToCart = (productId) => {
  const cartQuantitySelecotr = +document.querySelector(`.js-quantit-selector-${productId}`).value;
  let matchItem;

  cart.forEach(item => {
    if (productId === item.productId) {
      matchItem = item;
    }
  });

  // check if the product in the cart
  if (matchItem) {
    matchItem.quantity += cartQuantitySelecotr;
  } else {
    cart.push({
      productId,
      quantity: cartQuantitySelecotr
    })
  }
}

export function updateCartQuantity(elementClass) {
  let cartQuantity = 0;
  cart.forEach(item => cartQuantity += item.quantity);
  if (elementClass === '.js-cart-quantity') {
    document.querySelector(elementClass)
      .textContent = cartQuantity > 99 ? 99 + '+' : cartQuantity;
  } else {
    document.querySelector(elementClass)
      .textContent = cartQuantity;
  }
}