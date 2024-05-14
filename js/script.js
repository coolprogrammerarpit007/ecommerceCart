`use strict`;

// getting acess to the dom elements.

const choice1 = document.querySelector(`#choice1>img`);
const choice2 = document.querySelector(`#choice2>img`);
const choice3 = document.querySelector(`#choice3>img`);
const choice4 = document.querySelector(`#choice4>img`);
const choices = document.querySelectorAll(`.choice`);
const productSection = document.querySelector(`.product-section`);
const productCart = document.querySelector(`.product-cart`);

// storing the cart button
const cartBtn = document.querySelector(`.cart-img`);

// storing product item into row
const productRow = document.querySelector(`.row`);

// state variables
let totalCartProducts = 0;

// Adding new product option effect

choice1.addEventListener(`click`, function (e) {
  choice2.classList.remove(`active`);
  choice3.classList.remove(`active`);
  choice4.classList.remove(`active`);
  choice1.classList.add(`active`);
});
choice2.addEventListener(`click`, function (e) {
  choice2.classList.add(`active`);
  choice3.classList.remove(`active`);
  choice4.classList.remove(`active`);
  choice1.classList.remove(`active`);
});
choice3.addEventListener(`click`, function (e) {
  choice2.classList.remove(`active`);
  choice3.classList.add(`active`);
  choice4.classList.remove(`active`);
  choice1.classList.remove(`active`);
});
choice4.addEventListener(`click`, function (e) {
  choice2.classList.remove(`active`);
  choice3.classList.remove(`active`);
  choice4.classList.add(`active`);
  choice1.classList.remove(`active`);
});

choices.forEach((item, i) => {
  item.addEventListener(`click`, function () {
    // Generating dynamic product content
    let html = `<div class="product-item">
          <img src="./images/image-product-${i + 1}.jpg" alt="product item" />
        </div>
        <div class="product-details">
          <p>sneaker company</p>
          <div class="heading">
            <h1>${product[i].title}</h1>
          </div>
          <div class="product-description">
            <p>
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they will withstand
              everything the weather can offer.
            </p>
          </div>
          <div class="product-pricing">
            <div class="prices">
              <span class="discounted-price">$${product[
                i
              ].discountPrice.toFixed(2)}</span>
              <span class="actual-price">$${product[i].actualPrice.toFixed(
                2
              )} </span>
            </div>
            <div class="discount">
              <span>${product[i].percentage}%</span>
            </div>
          </div>
          <div class="cart-buttons">
            <div class="item-count">
              <img src="./images/icon-minus.svg" alt="plus" id="minus-btn" />
              <span id="total-qty">0</span>
              <img src="./images/icon-plus.svg" alt="minus" id="plus-btn" />
            </div>
            <button class="addBtn" data-product-id="${
              product[i].id
            }">Add to cart</button>
          </div>
        </div>`;
    productSection.innerHTML = html;

    // Modifying the product quantity
    let count = 0;

    // storing the incremet product in the cart button
    const plusBtn = document.getElementById(`plus-btn`);

    // storing the decrement product in the cart button.
    const minusBtn = document.getElementById(`minus-btn`);

    // storing total quantity to store total products in the counter.
    const totalQty = document.getElementById(`total-qty`);

    // Event listener to the plus button which increments the quantity
    plusBtn.addEventListener(`click`, function (e) {
      count++;
      totalQty.textContent = count;
    });

    // Event listener to the decrement button which decrements the quantity.
    minusBtn.addEventListener(`click`, function (e) {
      if (count >= 1) count--;
      totalQty.textContent = count;
    });

    // **************************************

    // Add to the cart functuaniity

    // storing add cart button
    const addCartBtn = document.querySelector(`.addBtn`);

    // Event listener to the add cart button.
    addCartBtn.addEventListener(`click`, function (e) {
      // Showing total products of the cart
      totalCartProducts += count;
      document.querySelector(`.cart-total`).textContent = totalCartProducts;
      // storing productID/ unique to every product.
      const productId = addCartBtn.dataset.productId;
      console.log(productId);

      // State Variabe
      let matchingItem; // store item if repeated in cart
      let newCartItem = ``; // for DOM
      // *******************************
      cart.forEach((item) => {
        // Check if item already in the cart.
        if (item.productId === productId) {
          console.log(`Item already in the cart`);
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.qty = matchingItem.qty + count;
        console.log(`New Quantity`, matchingItem);
        // updting dom and showing updated price
      } else {
        cart.push({
          productId: productId,
          image: `./../images/image-product-${i + 1}.jpg`,
          price: product[i].discountPrice,
          qty: count++,
          productName: `${product[i].title}`,
        });
      }

      console.log(cart);
      // Adding product to the DOM and show the updated cart to the page.
      cart.forEach((cartItem, i) => {
        newCartItem += `
    <div class="row-product">
    <img src="${cartItem.image}" alt="cart item"  />
    <div class="item-details">
      <p>${cartItem.productName}</p>
      <p class="total-price">$${cartItem.price} X ${cartItem.qty}  <span> $${
          cartItem.price * cartItem.qty
        }</span></p>
    </div>
    <img src="./../images/icon-delete.svg" class="delete-btn"/>
    </div>
    `;
      });

      document.querySelector(`.row`).innerHTML = newCartItem;

      // Adding the delete product from the cart feature.

      // storing the delete buttons
      const deleteBtns = document.querySelectorAll(`.delete-btn`);

      // Adding event listener to the delete buttons
      deleteBtns.forEach((btn, i) => {
        btn.addEventListener(`click`, function (e) {
          // storing the parent element of delete button.
          const parent = btn.parentElement;

          // removing the parent element from the DOM.
          parent.remove();

          // removing item from the cart object.
          totalCartProducts = totalCartProducts - cart[i].qty;
          document.querySelector(`.cart-total`).textContent = totalCartProducts;
          cart.splice(i, 1);
        });
      });
    });
  });
});

// ********************************

// Adding event listener to the cart button.
cartBtn.addEventListener(`click`, function (e) {
  productCart.classList.toggle(`hidden-cart`);
});
