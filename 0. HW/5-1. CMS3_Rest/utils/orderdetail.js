// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;

    fetchOrderDetailData(page);
});

// Function to fetch item detail data
function fetchOrderDetailData(Id) {
    fetch(`/api/orderdetail/list/${Id}`)
    .then(handleResponse)
    .then(data => {
        console.log(data)
        
        // Order Information
        const tableBody = document.getElementById('OrderDetailTableBody');
        tableBody.innerHTML = '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data[0].Id}</td>
            <td>${data[0].OrderAt}</td>
            <td><a href="/storedetail/${data[0].StoreId}">${data[0].StoreId}</a></td>
            <td><a href="/userdetail/${data[0].UserId}">${data[0].UserId}</a></td>
            `;
        tableBody.appendChild(row);
    })
    .catch(handleError);
}

// Function to handle HTTP responses
function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

// Function to handle errors
function handleError(error) {
    console.error('Error fetching user data:', error);
}