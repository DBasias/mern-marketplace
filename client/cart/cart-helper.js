const cart = {
  addItem(item, cb) {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({
        product: item,
        quantity: 1,
        shop: item.shop._id,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      cb();
    }
  },
  itemTotal() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart")).length;
      }
    }

    return 0;
  },
  getCart() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
    }

    return [];
  },
  updateCart(itemIndex, quantity) {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart[itemIndex].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },
  removeItem(itemIndex) {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    return cart;
  },
};

export default cart;
