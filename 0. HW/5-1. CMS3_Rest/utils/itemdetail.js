// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;

    fetchItemDetailData(page);
});

// Function to fetch item detail data
function fetchItemDetailData(Id) {
    fetch(`/api/itemdetail/list/${Id}`)
    .then(handleResponse)
    .then(data => {
        // Item Information
        const tableBody = document.getElementById('ItemDetailTableBody');
        tableBody.innerHTML = '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data[0].ItemName}</td>
            <td>${data[0].UnitPrice}</td>
            `;
        tableBody.appendChild(row);
        
        // Monthly Sales
        const tableBodyDetail = document.getElementById('ItemMonthlySalesTableBody');
        tableBodyDetail.innerHTML = '';

        for (let i in data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data[i].OrderAt}</td>
                <td>${data[i].TotalPrice}</td>
                <td>${data[i].OrderNum}</td>
                `;
            tableBodyDetail.appendChild(row);
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