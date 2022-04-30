class ProductList {
  constructor(container = '.products') {
    this.container = document.querySelector(container);
    this.goods = [];
    this.productObjects = [];

    this.fetchGoods();
    this.render();
  }

  fetchGoods() {
    this.goods = [
      { id: 1, title: 'Notebook', price: 20000 },
      { id: 2, title: 'Mouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 },
    ];
  }

  render() {
    for (const good of this.goods) {
      const productObject = new ProductItem(good);
      console.log(productObject);
      this.productObjects.push(productObject);

      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

new ProductList();

const cartTotalEl = document.querySelector('.sumCart');
const cartTotalValueEl = document.querySelector('.cartValue');
const cartEl = document.querySelector('.openCart');


document.querySelector('.btn-cart').addEventListener('click', () => {
  cartEl.classList.toggle('hidden');
});

const cart = {};

document.querySelector('.products').addEventListener('click', event => {
  if (!event.target.closest('buy-btn')) {
    return;
  }

  const productItemEl = event.target.closest('.productItem');
  const id = +productItemEl.dataset.id;
  const name = productItemEl.dataset.name;
  const price = +productItemEl.dataset.price;

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
    .querySelector(`.openCart[data-id="${productId}"]`);
  if (!cartRowEl) {
    renderNewProductInCart(productId);
    return;
  }

  const product = cart[productId];
  cartRowEl.querySelector('.productCount').textContent = product.count;
  cartRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="cartRow" data-id="${productId}">
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

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
//   document
//       .querySelector('.products')
//       .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
//
