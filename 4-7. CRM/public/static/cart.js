document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart')
        .then((response) => response.json())
        .then((data) => displayCart(data.cart, data.total))
})

function displayCart(cart, totalAmount) {
    const cartTableBody = document.querySelector('#cartTable tbody')
    cartTableBody.innerHTML = ''
    
    cart.forEach((item) => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <span id='quantity-${item.id}'>${item.quantity}</span>
                <button onclick='increaseQuantity(${item.id})'>+</button>
                <button onclick='decreaseQuantity(${item.id})'>-</button>
            </td>
            <td><button>Remove</button></td>
        `
        cartTableBody.appendChild(row);
    })

    const cartTableFoot = document.querySelector('#cartTable tfoot');
    cartTableFoot.innerHTML = '';

    const row = document.createElement('tr');
    row.innerHTML = `
        <td colspan='3'></td>
        <td>Total</td>
        <td id="totalAmount">${totalAmount}</td>
    `;
    cartTableFoot.appendChild(row);

};

function increaseQuantity(itemId) {
    console.log('increaseQuantity', itemId);

    fetch(`/update-quantity/${itemId}?change=1`, { method: 'POST' })
    .then((response) => response.json())
    .then((item) => {
        let quantityElement = document.getElementById(`quantity-${itemId}`);
        quantityElement.innerHTML = item.quantity;
    })
}

function decreaseQuantity(itemId) {
    console.log('decreaseQuantity', itemId);
    const change = -1;

    fetch(`/update-quantity/${itemId}?change=${change}`, { method: 'POST' })
    .then((response) => response.json())
    .then((item) => {
        let quantityElement = document.getElementById(`quantity-${itemId}`);
        quantityElement.innerHTML = item.quantity;
    })
}