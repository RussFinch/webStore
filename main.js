// Function to create cart
var cart = [];
var discTotal = 0;

function addToCart(name, price) {

    var cartItem = {
        itemName: name,
        itemPrice: price,
    };
    cart.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert("Item: " + name + "\nPrice: " + price + "\n\nShopping Cart Updated.\nCart Total: " + cartTotal());
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

function cartCalculations() {
    var total = cartTotal();

    var VAT = parseFloat((total*1.2)-total);
    var grandTotal = parseFloat(total + VAT);


    document.getElementById('total').innerHTML = ("Goods Total: £" + grandTotal.toFixed(2));
    document.getElementById('VAT').innerHTML = ("\nInclusive of £" + VAT.toFixed(2) + " VAT at 20%.");
}

function discCoupon() {
    var code = document.getElementById('discCoupon').value;

    if (code === "disc10") {
        total = cartTotal();
        discTotal = total*0.9;
        sessionStorage.setItem("discTotal", discTotal);
        document.getElementById('discount').innerHTML = ("Discounted Total: £" + discTotal.toFixed(2));
    }
    else {
        discTotal = total;
        sessionStorage.setItem("discTotal", discTotal);
        document.getElementById('discount').innerHTML = ("Discounted Total: £" + discTotal.toFixed(2));
    }
}
//Radio button control for delivery options
function showNone(){
    document.getElementById('delOptions').style.display ='none';
    document.getElementById('totalPlusDel').innerHTML = ("Total invoice - £" + discTotal.toFixed(2));
}
function showDelOptions(){
    document.getElementById('delOptions').style.display = 'block';
}

function addDelivery(cost) {
    finalAmount = discTotal + cost;
    document.getElementById('totalPlusDel').innerHTML = ("Total invoice - £" + finalAmount.toFixed(2));
}
function removeDelivery() {
    
}

//Generate Order Number
function orderNo() {
    var orderID =  ("RPI" + Math.random().toString(36).substring(2, 15));
    alert("Your order has been confirmed...\nOrder ID:  " + orderID);
}