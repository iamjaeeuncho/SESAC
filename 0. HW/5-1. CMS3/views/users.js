function fetchUserData(userId) {
    fetch(`/users/${userId}`)
    .then(handleResponse)
    .then(data => {
        // 가져온 데이터를 테이블에 동적으로 추가
        const tableBody = document.getElementById('userTableBody');
        tableBody.innerHTML = '';

        data.currPageRows.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.Id}</td>
                <td>${user.Name}</td>
                <td>${user.Gender}</td>
                <td>${user.Age}</td>
                <td>${user.Birthdate}</td>
                <td>${user.Address}</td>
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
            prevSpan.innerHTML = `<a href="/user/${data.page - 1}" onclick="fetchUserData(${data.page - 1})">Previous</a>`;
            paginationDiv.appendChild(prevSpan);
        }

        for (let num = startPage; num <= endPage; num++) {
            const pageSpan = document.createElement('span');
            pageSpan.innerHTML = `<a href="/user/${num}" onclick="fetchUserData(${num})">${num}</a>`;
            paginationDiv.appendChild(pageSpan);
        }

        // Add Next link
        if (data.page < data.totalPages) {
            const nextSpan = document.createElement('span');
            nextSpan.innerHTML = `<a href="/user/${data.page + 1}" onclick="fetchUserData(${data.page + 1})">Next</a>`;
            paginationDiv.appendChild(nextSpan);
        }
    })
    .catch(handleError);
}


// 페이지 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', () => {
    // 서버에서 데이터를 가져오는 함수
    const page = window.location.pathname.split('/')[2] || 1;

    fetchUserData(page);
});


function submitSearch() {
    const page = window.location.pathname.split('/')[2] || 1;
    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;

    fetchSearch(page, name, gender);
}

function fetchSearch(pagenum, name, gender) {
    fetch(`/searchform/${pagenum}/?name=${name}&gender=${gender}`)
    .then(handleResponse)
    .then(data => {
        console.log(data)

        // 가져온 데이터를 테이블에 동적으로 추가
        const tableBody = document.getElementById('userTableBody');
        tableBody.innerHTML = '';

        data.currPageRows.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.Id}</td>
                <td>${user.Name}</td>
                <td>${user.Gender}</td>
                <td>${user.Age}</td>
                <td>${user.Birthdate}</td>
                <td>${user.Address}</td>
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
            prevSpan.innerHTML = `<a href="/search/${pagenum - 1}/?name=${name}&gender=${gender}" onclick="fetchSearch(${pagenum-1}, ${name}, ${gender})">Previous</a>`;
            paginationDiv.appendChild(prevSpan);
        }

        // Add numeric page links
        for (let num = startPage; num <= endPage; num++) {
            const pageSpan = document.createElement('span');
            // pageSpan.innerHTML = `<div onclick="fetchSearch(${num}, '${name}', '${gender}')">${num}</div>`;
            pageSpan.innerHTML = `<a href="/search/${num}/?name=${name}&gender=${gender}" onclick="fetchSearch(${num}, ${name}, ${gender})">${num}</a>`;
            paginationDiv.appendChild(pageSpan);
        }

        // Add Next link
        if (data.page < data.totalPages) {
            const nextSpan = document.createElement('span');
            nextSpan.innerHTML = `<a href="/search/${pagenum + 1}/?name=${name}&gender=${gender}" onclick="fetchSearch(${pagenum+1}, ${name}, ${gender})">Next</a>`;
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
    const page = window.location.pathname.split('/')[2] || 1;
    fetchUserData(page);
});