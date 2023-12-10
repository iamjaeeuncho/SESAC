// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;

    fetchOrderData(page);
});

// Function to fetch order data
function fetchOrderData(page) {
    fetch(`/order_api/${page}`)
    .then(handleResponse)
    .then(data => {
        const tableBody = document.getElementById('orderTableBody');
        tableBody.innerHTML = '';

        data.currPageRows.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="/orderdetail/${order.Id}">${order.Id}</a></td>
                <td>${order.OrderAt}</td>
                <td>${order.StoreId}</td>
                <td>${order.UserId}</td>
            `;
            tableBody.appendChild(row);
        });
        renderPaginationLinks(data, 'fetchOrderData');
    })
    .catch(handleError);
}

// Pagination links
function renderPaginationLinks(data, fetchFunction, extraParams = '') {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const maxButtonsToShow = 10;
    const startPage = Math.max(1, data.page - Math.floor(maxButtonsToShow / 2));
    const endPage = Math.min(data.totalPages, startPage + maxButtonsToShow - 1);

    // Previous link
    if (data.page > 1) {
        const prevSpan = document.createElement('span');
        prevSpan.innerHTML = `<a id="searchLink" onclick="${fetchFunction}('${data.page - 1}', ${extraParams})">Previous</a>`;
        paginationDiv.appendChild(prevSpan);
    }

    // Numeric page links
    for (let num = startPage; num <= endPage; num++) {
        const pageSpan = document.createElement('span');
        pageSpan.innerHTML = `<a id="searchLink" onclick="${fetchFunction}('${num}', ${extraParams})">${num}</a>`;
        paginationDiv.appendChild(pageSpan);
    }

    // Next link
    if (data.page < data.totalPages) {
        const nextSpan = document.createElement('span');
        nextSpan.innerHTML = `<a id="searchLink" onclick="${fetchFunction}('${data.page + 1}', ${extraParams})">Next</a>`;
        paginationDiv.appendChild(nextSpan);
    }
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