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

// Function to fetch store daily data
function fetchStoreDailyData(Id, orderAt) {
    fetch(`/storedaily_api/${Id}/${orderAt}`)
    .then(handleResponse)
    .then(data => {
        const tableBody = document.getElementById('StoreTableBody');
        tableBody.innerHTML = '';

        // Store Information
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data[1].StoreName}</td>
            <td>${data[1].StoreType}</td>
            <td>${data[1].StoreAddress}</td>`;
        tableBody.appendChild(row);
        
        // Daily Sales
        const tableBodySales = document.getElementById('StoreDailySalesTableBody');
        tableBodySales.innerHTML = '';

        for (let i in data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data[i].OrderAt}</td>
                <td>${data[i].TotalSales}</td>
                <td>${data[i].OrderNum}</td>
                `;
            tableBodySales.appendChild(row);
        }
    })
    .catch(handleError);
}

// Function to fetch store regular data
function fetchStoreRegularData(Id, orderAt) {
    fetch(`/storeregular_api/${Id}/${orderAt}`)
    .then(handleResponse)
    .then(data => {
        const tableBodyRegular = document.getElementById('StoreRegularTableBody');
        tableBodyRegular.innerHTML = '';

        for (let i in data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href=/userdetail/${data[i].UserId}>${data[i].UserId}</a></td>
                <td>${data[i].UserName}</td>
                <td>${data[i].OrderNum}</td>
                `;
            tableBodyRegular.appendChild(row);
        }
    })
    .catch(handleError);
}

// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;
    const orderAt = url.pathname.split('/')[3] || 1;

    fetchStoreDailyData(page, orderAt);
    fetchStoreRegularData(page, orderAt);
});