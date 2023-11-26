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
            <td><button onclick='removeItem(${item.id})'>Remove</button></td>
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
    // console.log('increaseQuantity', itemId);
    const change = 1;

    fetch(`/update-quantity/${itemId}?change=${change}`, { method: 'PUT' })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        let quantityElement = document.getElementById(`quantity-${itemId}`);
        quantityElement.innerHTML = data.item.quantity;
        
        let totalquantity = document.getElementById(`totalAmount`);
        totalquantity.innerHTML = data.total;
    })

}

function decreaseQuantity(itemId) {
    // console.log('decreaseQuantity', itemId);
    const change = -1;

    fetch(`/update-quantity/${itemId}?change=${change}`, { method: 'PUT' })
    .then((response) => response.json())
    .then((data) => {
        let quantityElement = document.getElementById(`quantity-${itemId}`);
        quantityElement.innerHTML = data.item.quantity;

        let totalquantity = document.getElementById(`totalAmount`);
        totalquantity.innerHTML = data.total;
    })
}

function removeItem(itemId) {
    console.log(itemId)
    fetch(`/remove-from-cart/${itemId}`, { method: 'POST' })
    .then((response) => response.json())
    .then((data) => 
        displayCart(data.cart, data.total)
    )
}