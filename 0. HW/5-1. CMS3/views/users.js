document.addEventListener('DOMContentLoaded', () => {
    // 서버에서 데이터를 가져오는 함수
    function fetchUserData() {
        fetch('/users')
            .then(response => response.json())
            .then(data => {
                // 가져온 데이터를 테이블에 동적으로 추가 및 기존 데이터 제거
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


                
                const paginationDiv = document.getElementById('pagination');
                paginationDiv.innerHTML = '';

                const maxButtonsToShow = 10;
                const startPage = Math.max(1, data.page - Math.floor(maxButtonsToShow / 2));
                const endPage = Math.min(data.totalPages, startPage + maxButtonsToShow - 1);

                // Add Previous link
                if (data.page > 1) {
                    const prevSpan = document.createElement('span');
                    prevSpan.innerHTML = `<a href="/?page=${data.page - 1}">Previous</a>`;
                    paginationDiv.appendChild(prevSpan);
                }
                
                for (let num = startPage; num <= endPage; num++) {
                    const pageSpan = document.createElement('span');
                    pageSpan.innerHTML = `<a href="/?page=${num}">${num}</a>`;
                    paginationDiv.appendChild(pageSpan);
                }

                // Add Next link
                if (data.page < data.totalPages) {
                    const nextSpan = document.createElement('span');
                    nextSpan.innerHTML = `<a href="/?page=${data.page + 1}">Next</a>`;
                    paginationDiv.appendChild(nextSpan);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }

    // 페이지 로드 시 데이터 가져오기
    fetchUserData();
});
