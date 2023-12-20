// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;

    fetchStoreDetailData(page);
});

// Function to fetch store detail results
function fetchStoreDetailData(Id) {
    fetch(`/api/storedetail/list/${Id}`)
    .then(handleResponse)
    .then(data => {
        const tableBody = document.getElementById('StoreDetailTableBody');
        tableBody.innerHTML = '';

        // Store Information
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data[1].StoreName}</td>
            <td>${data[1].StoreType}</td>
            <td>${data[1].StoreAddress}</td>`;
        tableBody.appendChild(row);
        
        // Monthly Sales
        const tableBodySales = document.getElementById('StoreSalesTableBody');
        tableBodySales.innerHTML = '';

        for (let i in data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href=/storedaily/${data[1].StoreId}/${data[i].OrderAt}>${data[i].OrderAt}</a></td>
                <td>${data[i].TotalSales}</td>
                <td>${data[i].OrderNum}</td>
                `;
            tableBodySales.appendChild(row);
        }
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