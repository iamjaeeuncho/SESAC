document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart')
        .then((response) => response.json())
        .then((cart) => displayCart(cart))
})

function displayCart(cart) {

    const cartTableBody = document.querySelector('#cartTable tbody')
    cartTableBody.innerHTML = ''

    cart.forEach((item) => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><button onclick='increaseQuantity()'>+</button>
                <button onclick='decreaseQuantity()'>-</button></td>
            <td><button>Remove</button></td>
        `
        cartTableBody.appendChild(row);
    })
};