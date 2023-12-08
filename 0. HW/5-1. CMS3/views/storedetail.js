function fetchStoreDetailData(Id) {
    fetch(`/storedetail_api/${Id}`)
    .then(handleResponse)
    .then(data => {
        console.log(data)
        // 가져온 데이터를 테이블에 동적으로 추가
        const tableBody = document.getElementById('StoreDetailTableBody');
        tableBody.innerHTML = '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data[1].StoreName}</td>
            <td>${data[1].StoreType}</td>
            <td>${data[1].StoreAddress}</td>`;
        tableBody.appendChild(row);
        
        // 월간 매출액
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

    fetchStoreDetailData(page);
});