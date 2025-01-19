document.addEventListener("DOMContentLoaded", function () {
  const shopping_carts = document.querySelector(".list-products");
  const label = document.querySelector(".total-price");
  class Product {
    constructor(id, name, price, img) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.img = img;
    }
  }
  class Item extends Product {
    constructor(id, name, price, img, quantity) {
      super(id, name, price, img);
      this.quantity = quantity;
    }
    getTotalPrice() {
      return this.quantity * this.price;
    }
  }
  class Cart {
    constructor(items = []) {
      this.items = items;
    }
    getTotalItems() {
      return this.items.length;
    }
    addItem(newItem) {
      this.items.push(newItem);
      this.displayItem();
    }
    incrementItem(itemId) {
      const existingItem = this.items.find((item) => item.id === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      this.displayItem();
    }
    removeItem(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId);
      this.displayItem();
    }
    decrementItem(itemId) {
      const Item = this.items.find((item) => item.id === itemId);
      if (Item) {
        Item.quantity -= 1;
        if (Item.quantity === 0) {
          this.removeItem(itemId);
        }
      }
      this.displayItem();
    }
    getTotalAmont() {
      return this.items.reduce(
        (total, item) => total + item.getTotalPrice(),
        0
      );
    }
    displayItem() {
      if (this.items.length === 0) {
        shopping_carts.innerHTML = "";
        label.innerHTML = `<h2>Your Shopping Cart is Empty</h2>`;
      } else {
        shopping_carts.innerHTML = "";
        this.items.forEach((item) => {
          generateCartItem(item, this.items);
        });
      }
      label.innerHTML = `<span> Total price : </span>
          <span class="total"> ${this.getTotalAmont()}$ </span>`;
    }
  }

  function generateCartItem(Item) {
    const html = `<div class="card-body" id=${Item.id}>
        <div class="card" style="width: 18rem">
          <img
            src=${Item.img}
            class="card-img-top"
            alt=${Item.name.toLowerCase()}
          />
          <div class="card-body">
            <h5 class="card-title">${Item.name}</h5>
            <p class="card-text">This is a ${Item.name.toLowerCase()} </p>
            <h4 class="unit-price">${Item.price}</h4>
            <div>
              <i class="fas fa-plus-circle" data-action="increment" data-id="${
                Item.id
              }"></i>
              <span class="quantity">${Item.quantity}</span>
              <i class="fas fa-minus-circle"  data-action="decrement" data-id="${
                Item.id
              }"></i>
            </div>
            <div>
              <i class="fas fa-trash-alt" data-action="remove" data-id="${
                Item.id
              }"></i>
              <i class="fas fa-heart" data-action="heart" data-id="${
                Item.id
              }"></i>
            </div>
          </div>
        </div>
      </div>`;
    shopping_carts.innerHTML += html;
  }

  // event listeners
  shopping_carts.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    const itemId = parseInt(e.target.dataset.id, 10);
    if (action === "increment") {
      cart.incrementItem(itemId);
    } else if (action === "decrement") {
      cart.decrementItem(itemId);
    } else if (action === "remove") {
      cart.removeItem(itemId);
    } else if (action === "heart") {
      const heart = e.target;
      const currentColor = window.getComputedStyle(heart).color;
      if (currentColor === "rgb(0, 0, 0)") {
        heart.style.color = "red";
      } else {
        heart.style.color = "black";
      }
    }
  });
  // event listeners

  const cart = new Cart();
  cart.addItem(new Item(1, "Baskets", 100, "assets/baskets.png", 1));
  cart.addItem(new Item(2, "Socks", 20, "assets/socks.png", 1));
  cart.addItem(new Item(3, "Bag", 50, "assets/bag.png", 1));
});
