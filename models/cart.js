module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = (item, i) => {
    let storedItem = this.items[i];
    if (!storedItem) {
      storedItem = this.items[i] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.removeItem = (i) => {
    this.totalQty -= this.items[i].qty;
    this.totalPrice -= this.items[i].price;
    delete this.items[i];
  };

  this.generateArray = () => {
    const arr = [];
    if (this.items) {
      for (let i in this.items) {
        arr.push(this.items[i]);
      }
    }
    return arr;
  };
};
