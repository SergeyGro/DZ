'use strict';

const cartCounterEl = document.querySelector('.cartIconWrap span');
const cartTotalEl = document.querySelector('.sumCart');
const cartTotalValueEl = document.querySelector('.cartValue');
const cartEl = document.querySelector('.openCart');


document.querySelector('.cartIconWrap').addEventListener('click', () => {
    cartEl.classList.toggle('hidden');
});

const cart = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in cart)) {
        cart[id] = { id: id, name: name, price: price, count: 0 };
    }
    cart[id].count++;
    cartCounterEl.textContent = getTotalCartCount().toString();
    cartTotalValueEl.textContent = getTotalCartPrice().toFixed(2);
    renderProductInCart(id);
}

function getTotalCartCount() {
    return Object.values(cart).reduce((acc, product) => acc + product.count, 0);
}

function getTotalCartPrice() {
    return Object
        .values(cart)
        .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProductInCart(productId) {
    const cartRowEl = cartEl
        .querySelector(`.infoCart[data-id="${productId}"]`);
    if (!cartRowEl) {
        renderNewProductInCart(productId);
        return;
    }

    const product = cart[productId];
    cartRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInCart(productId) {
    const productRow = `
    <div class="infoCart" data-id="${productId}">
      <div>${cart[productId].name}</div>
      <div>
        <span class="productCount">${cart[productId].count}</span> шт.
      </div>
      <div>$${cart[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(cart[productId].price * cart[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
