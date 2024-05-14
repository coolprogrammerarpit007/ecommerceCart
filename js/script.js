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
              <span id="total-qty">1</span>
              <img src="./images/icon-plus.svg" alt="minus" id="plus-btn" />
            </div>
            <button class="addBtn" data-product-id="${
              product[i].id
            }">Add to cart</button>
          </div>
        </div>`;
    productSection.innerHTML = html;

    // Modifying the product quantity
    let count = Number(document.querySelector(`#total-qty`).textContent);
    console.log(`Initial Count: ${count}`);
    const plusBtn = document.getElementById(`plus-btn`);
    const minusBtn = document.getElementById(`minus-btn`);
    const totalQty = document.getElementById(`total-qty`);
    plusBtn.addEventListener(`click`, function (e) {
      count++;
      totalQty.textContent = count;
    });
    minusBtn.addEventListener(`click`, function (e) {
      if (count >= 1) count--;
      totalQty.textContent = count;
    });

    // **************************************

    // Add to the cart functuaniity
    const addCartBtn = document.querySelector(`.addBtn`);

    addCartBtn.addEventListener(`click`, function (e) {
      console.log(`Product added to the cart`);
      const productId = addCartBtn.dataset.productId;
      console.log(productId);

      let matchingItem;
      let newCartItem = ``;
      cart.forEach((item) => {
        if (item.productId === productId) {
          console.log(`Item already in the cart`);
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.qty = matchingItem.qty + count;
        // updting dom and showing updated price
        document.querySelector(`.total-price-${productId}`).innerHTML = `$${
          matchingItem.price
        } X ${matchingItem.qty}  <span> $${
          matchingItem.price * matchingItem.qty
        }</span>`;
      } else {
        cart.push({
          productId: productId,
          image: `./../images/image-product-${i + 1}.jpg`,
          price: product[i].discountPrice,
          qty: count,
          productName: `${product[i].title}`,
        });

        // Adding product to the dom cart
        cart.forEach((cartItem, i) => {
          newCartItem += `
    <div class="row-product">
    <img src="${cartItem.image}" alt="cart item"  />
    <div class="item-details">
      <p>${cartItem.productName}</p>
      <p class="total-price-${productId}">$${cartItem.price} X ${
            cartItem.qty
          }  <span> $${cartItem.price * cartItem.qty}</span></p>
    </div>
    <img src="./../images/icon-delete.svg" id="delete-btn"/>
    </div>
    `;
        });

        document.querySelector(`.row`).innerHTML = newCartItem;
      }

      console.log(cart);
    });
  });
});

// ********************************

cartBtn.addEventListener(`click`, function (e) {
  productCart.classList.toggle(`hidden-cart`);
});
