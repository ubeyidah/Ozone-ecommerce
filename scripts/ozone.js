let productsHTML = '';
products.forEach(product => {
  productsHTML += `
  <div class="product-container">
    <div class="product-container__img center">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <p class="product-container__name">${product.name}</p>
    <div class="product-container__rating center"><img src="images/ratings/rating-${product.rating.stars * 10}.png"
        alt="rating"><span>${product.rating.count}</span>
    </div>
    <p class="product-container__pricing">$${(product.priceCents / 100).toFixed(2)}</p>

    <select name="product" class="product-container__selector js-quantit-selector-${product.id}">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
    <div class="add-to-cart center js-added-text-${product.id} js-added-msg">
      <img src="images/icons/checkmark.png" alt="checkmark">Added
    </div>
    <button class="product-container__add-btn js-add-to-cart-btn" data-product-id="${product.id}">
       Add to Cart
    </button>
  </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;
let timeoutId;

// make the button interactive
document.querySelectorAll('.js-add-to-cart-btn')
  .forEach(button => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      const cartQuantitySelecotr = +document.querySelector(`.js-quantit-selector-${productId}`).value;
      const addedMsgEl = document.querySelector(`.js-added-text-${productId}`);
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
      document.querySelectorAll('.js-added-msg')
        .forEach(element => element.classList.remove('show-added-msg'))
      addedMsgEl.classList.add('show-added-msg');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        addedMsgEl.classList.remove('show-added-msg');
      }, 1000)


      console.log(cart);
      updateCartQuantity();
    });
  });


function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(item => cartQuantity += item.quantity);
  document.querySelector('.js-cart-quantity')
    .textContent = cartQuantity > 99 ? 99 + '+' : cartQuantity;
}