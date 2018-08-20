//JQuery
/*$(document).ready(function() {
    alert("This page has loaded!");
});
*/
// Checkout variables.
var cart = [];
var discTotal = 0;

//Calculator on/off button variable
var calcOn = 2;

//Add additional items to cart and save to session storage.
function addToCart(name, price) {

    var cartItem = {
        itemName: name,
        itemPrice: price,
    };
    cart.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert("Item: " + name + "\nPrice: " + price + "\n\nShopping Cart Updated.\nCart Total: £" + cartTotal());
}

//Function to calculate cart total
function cartTotal() {
    var arr = JSON.parse(sessionStorage.getItem("cart"));
    var calcResult = 0;

    for (i = 0; i <= arr.length-1; i++) {
        var price = arr[i].itemPrice.split("£").pop();
        calcResult += parseFloat(price);
    }
    return calcResult.toFixed(2);
}
//Create table of cart Items for HTML display
function cartList() {
    var arr = JSON.parse(sessionStorage.getItem("cart"));
    var html = '<table id="cartItemsTable">';

    for (i = 0; i <= arr.length-1; i++) {
        html += '<tr>';
        html += '<td>' + (i + 1) + '</td>';
        html += '<td>' + arr[i].itemName + '</td>';
        html += '<td>' + arr[i].itemPrice + '</td>';
        html += '</tr>';
    }

    html += '</table>';
    var div = document.getElementById('cartItems');
    document.body.innerHTML += html;
    div.innerHTML = html + '</table>';
}
//Calculate item value total and VAT.
function cartCalculations() {
    var total = cartTotal();

    var VAT = parseFloat((total*1.2)-total);
    var grandTotal = parseFloat(total + VAT);


    document.getElementById('total').innerHTML = ("Goods Total: £" + grandTotal.toFixed(2));
    document.getElementById('VAT').innerHTML = ("\nInclusive of £" + VAT.toFixed(2) + " VAT at 20%.");
    discCoupon();
}
//Apply a discount coupon to the items being purchased
function discCoupon() {
    var code = document.getElementById('discCoupon').value;

    if (code === "disc10") {
        total = cartTotal();
        discTotal = (total*0.9).toFixed(2);
        sessionStorage.setItem("discTotal", discTotal);
        document.getElementById('discount').innerHTML = ("Discounted Total: £" + sessionStorage.getItem("discTotal"));
    }
    else {
        discTotal = cartTotal();
        sessionStorage.setItem("discTotal", discTotal);
        document.getElementById('discount').innerHTML = ("Discounted Total: £" + sessionStorage.getItem("discTotal") + "  No discount has been applied.");
    }
}
//Radio button control for delivery options
function showNone(){
    var finalAmount = parseFloat(sessionStorage.getItem("discTotal"));
    document.getElementById('delOptions').style.display ='none';
    document.getElementById('totalPlusDel').innerHTML = ("Total invoice - £" + finalAmount.toFixed(2));
}
function showDelOptions(){
    document.getElementById('delOptions').style.display = 'block';
}
//Add delivery cost to total following radio click.
function addDelivery(cost) {
    var temp = parseFloat(sessionStorage.getItem("discTotal"));
    var finalAmount = temp + cost;
    document.getElementById('totalPlusDel').innerHTML = ("Total invoice - £" + finalAmount.toFixed(2));
}

//Generate Order Number
function orderNo() {
    var orderID =  ("RPI" + Math.random().toString(36).substring(2, 15));
    alert("Your order has been confirmed...\nOrder ID:  " + orderID);
}

//User calculator on checkout page
function calculate() {
    var calculation = eval(document.getElementById("answer").value);
    document.getElementById("answer").value = calculation;
}
//Append additional characters to calculation string
function addToAnswer(c) {
    document.getElementById("answer").value += c;
}
///Show/Hide calculator on button click
function hideCalc() {
    if (calcOn == 1) {
        document.getElementById("calcForm").style.display = 'none';
        calcOn = 2;
    }
    else {
        document.getElementById("calcForm").style.display = 'inline-block';
        calcOn = 1;
    }
}