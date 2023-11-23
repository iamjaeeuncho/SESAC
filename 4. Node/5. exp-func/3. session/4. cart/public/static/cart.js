document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then((response) => response.json())
        .then((products) => displayProduct(products))
        .then(() => {
            fetch('/cart')
                .then((response) => response.json())
                .then((cart) => displayCart(cart))
        })
})

function displayProduct(products) {
    console.log('displayProduct', products)

    const productTableBody = document.querySelector('#productTable tbody');
    console.log(productTableBody)

    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button onclick='addToCart(${product.id})'>담기</button></td>
        `
        productTableBody.appendChild(row);
    })
}

// 버튼을 클릭하면 원하는 URI가 호출
function addToCart(productId) {
    console.log('addToCart', productId)
    fetch(`/add-to-cart/${productId}`, { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
            // alert(JSON.stringify(data.message))
            alert(data.message)
            fetch('/cart')
                .then((response) => response.json())
                .then((cart) => displayCart(cart))
        })
}

function displayCart(cart) {

    const cartTableBody = document.querySelector('#cartTable tbody')
    cartTableBody.innerHTML = ''

    cart.forEach((item) => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><span id="counter">0</span>
                <button onclick='increaseCounter()'>+</button>
                <button onclick='decreaseCounter()'>-</button></td>
            <td><button onclick='remove()'>Remove</button></td>
        `
        cartTableBody.appendChild(row);
    })
};

// 증가 함수
function increaseCounter() {
    let counter = document.getElementById('counter').innerText
    counter++
    console.log(counter)
}

// 카운터 값을 업데이트하고 화면에 반영하는 함수
function updateCounter() {
    
}