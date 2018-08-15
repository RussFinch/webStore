
var cart = [];

function addToCart(name, price) {
    var cartItem = {
        itemName: name,
        itemPrice: price,
    };
    cart.push(cartItem);
    sessionStorage.setItem("cartItem", cartItem);
    alert("Item: " + name + "\nPrice: " + price + "\n\nShopping Cart Updated.\nCart Total: " + cartTotal());
}

function cartTotal() {

    var calcResult = 0;

    for (i = 0; i <= cart.length-1; i++) {
        var price = cart[i].itemPrice.split("£").pop();
        calcResult += parseFloat(price);
    }
    return calcResult.toFixed(2);
}