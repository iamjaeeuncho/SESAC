function fetchStoreDailyData(Id, orderAt) {
    fetch(`/storedaily_api/${Id}/${orderAt}`)
    .then(handleResponse)
    .then(data => {
        console.log(data)
        // 가져온 데이터를 테이블에 동적으로 추가
        const tableBody = document.getElementById('StoreTableBody');
        tableBody.innerHTML = '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data[1].StoreName}</td>
            <td>${data[1].StoreType}</td>
            <td>${data[1].StoreAddress}</td>`;
        tableBody.appendChild(row);
        
        // 일간 매출액
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

function fetchStoreRegularData(Id, orderAt) {
    fetch(`/storeregular_api/${Id}/${orderAt}`)
    .then(handleResponse)
    .then(data => {
        console.log(data)
        console.log(data[1].UserId)
        
        // 단골 고객
        const tableBodyRegular = document.getElementById('StoreRegularTableBody');
        tableBodyRegular.innerHTML = '';

        for (let i in data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href=#>${data[i].UserId}</a></td>
                <td>${data[i].UserName}</td>
                <td>${data[i].OrderNum}</td>
                `;
            tableBodyRegular.appendChild(row);
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
    const orderAt = url.pathname.split('/')[3] || 1;

    fetchStoreDailyData(page, orderAt);
    fetchStoreRegularData(page, orderAt);
});