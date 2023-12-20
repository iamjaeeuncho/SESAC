// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;

    fetchStoreData(page);
});

// Function to fetch store data
function fetchStoreData(page) {
    fetch(`/api/store/list/${page}`)
    .then(handleResponse)
    .then(data => {
        const tableBody = document.getElementById('storeTableBody');
        tableBody.innerHTML = '';

        data.currPageRows.forEach(store => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="/storedetail/${store.Id}">${store.Id}</a></td>
                <td>${store.Type}</td>
                <td>${store.Name}</td>
                <td>${store.Address}</td>
            `;
            tableBody.appendChild(row);
        });
        renderPaginationLinks(data, 'fetchStoreData');
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
