`use strict`;

import { products } from "./products.js";
import { cart } from "./cart.js";

// getting acess to all the product choices from the product section

const choice1 = document.getElementById(`choice1`);
const choice2 = document.getElementById(`choice2`);
const choice3 = document.getElementById(`choice3`);
const choice4 = document.getElementById(`choice4`);

// getting acess to the product section
const productSection = document.querySelector(`.product-section`);

// Adding event listener to the choice btns

choice1.addEventListener(`click`, function (e) {
  choice1.classList.add(`active`);
  choice2.classList.remove(`active`);
  choice3.classList.remove(`active`);
  choice4.classList.remove(`active`);

  productSection.innerHTML = generateProduct(0);
});
choice2.addEventListener(`click`, function (e) {
  choice2.classList.add(`active`);
  choice1.classList.remove(`active`);
  choice3.classList.remove(`active`);
  choice4.classList.remove(`active`);

  productSection.innerHTML = generateProduct(1);
});
choice3.addEventListener(`click`, function (e) {
  choice3.classList.add(`active`);
  choice1.classList.remove(`active`);
  choice2.classList.remove(`active`);
  choice4.classList.remove(`active`);

  productSection.innerHTML = generateProduct(2);
});
choice4.addEventListener(`click`, function (e) {
  choice4.classList.add(`active`);
  choice3.classList.remove(`active`);
  choice1.classList.remove(`active`);
  choice2.classList.remove(`active`);

  productSection.innerHTML = generateProduct(3);
});

// Generating HTML for the product

function generateProduct(i) {
  let productHTML = `

    <div class="product-item">
        <img src="${products[i].image}" alt="product item" />
    </div>

    <div class="product-details">
        <p>sneaker company</p>

        <div class="heading">
          <h1>${products[i].title}</h1>
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
              <span class="discounted-price">
              $${products[i].discountPrice.toFixed(2)} 
              </span>

              <span class="actual-price">$${products[i].actualPrice.toFixed(
                2
              )} </span>

            </div>

            <div class="discount">
              <span>${products[i].percentage}%</span>
            </div>
          </div>

          <div class="cart-buttons">
            <div class="item-count">
              <img src="./images/icon-minus.svg" alt="minus" id="minus-btn" />
              <span id="total-qty">0</span>
              <img src="./images/icon-plus.svg" alt="" id="plus-btn" />
            </div>
            <button class="addBtn" data-product-id=${
              products[i].id
            }>Add to cart</button>
          </div>

    </div>

  `;

  return productHTML;
}
