function fetchItemDetailData(Id) {
    fetch(`/itemdetail_api/${Id}`)
    .then(handleResponse)
    .then(data => {
        console.log(data)

        // 상품 정보
        const tableBody = document.getElementById('ItemDetailTableBody');
        tableBody.innerHTML = '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data[0].ItemName}</td>
            <td>${data[0].UnitPrice}</td>
            `;
        tableBody.appendChild(row);
        
        // 월간 매출액
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

    fetchItemDetailData(page);
});