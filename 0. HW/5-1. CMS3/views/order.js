function fetchOrderData(page) {
    fetch(`/order_api/${page}`)
    .then(handleResponse)
    .then(data => {
        console.log(data)
        // 가져온 데이터를 테이블에 동적으로 추가
        const tableBody = document.getElementById('orderTableBody');
        tableBody.innerHTML = '';

        data.currPageRows.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#">${order.Id}</a></td>
                <td>${order.OrderAt}</td>
                <td>${order.StoreId}</td>
                <td>${order.UserId}</td>
            `;
            tableBody.appendChild(row);
        });

        // 가져온 데이터로 페이징
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';

        const maxButtonsToShow = 10;
        const startPage = Math.max(1, data.page - Math.floor(maxButtonsToShow / 2));
        const endPage = Math.min(data.totalPages, startPage + maxButtonsToShow - 1);

        // Add Previous link
        if (data.page > 1) {
            const prevSpan = document.createElement('span');
            prevSpan.innerHTML = `<a href="/order/${data.page - 1}" onclick="fetchOrderData(${data.page - 1})">Previous</a>`;
            paginationDiv.appendChild(prevSpan);
        }

        for (let num = startPage; num <= endPage; num++) {
            const pageSpan = document.createElement('span');
            pageSpan.innerHTML = `<a href="/order/${num}" onclick="fetchOrderData(${num})">${num}</a>`;
            paginationDiv.appendChild(pageSpan);
        }

        // Add Next link
        if (data.page < data.totalPages) {
            const nextSpan = document.createElement('span');
            nextSpan.innerHTML = `<a href="/order/${data.page + 1}" onclick="fetchOrderData(${data.page + 1})">Next</a>`;
            paginationDiv.appendChild(nextSpan);
        }
    })
    .catch(handleError);
}


function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

function handleError(error) {
    console.error('Error fetching user data:', error);
}


// 페이지 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', () => {
    // 서버에서 데이터를 가져오는 함수
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;

    fetchOrderData(page);
});