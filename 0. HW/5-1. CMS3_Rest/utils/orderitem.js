// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;

    fetchOrderItemData(page);
});

// Function to fetch orderitem data
function fetchOrderItemData(page) {
    fetch(`/api/orderitem/list/${page}`)
    .then(handleResponse)
    .then(data => {
        const tableBody = document.getElementById('orderItemTableBody');
        tableBody.innerHTML = '';

        data.currPageRows.forEach(orderitem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${orderitem.Id}</td>
                <td><a href="/orderdetail/${orderitem.OrderId}">${orderitem.OrderId}</a></td>
                <td><a href="/itemdetail/${orderitem.ItemId}">${orderitem.ItemId}</a></td>
            `;
            tableBody.appendChild(row);
        });
        renderPaginationLinks(data, 'fetchOrderItemData');
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
