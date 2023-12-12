// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const page = url.pathname.split('/')[2] || 1;

    fetchUserDetailData(page);
    fetchUserStoreTop5(page);
    fetchUserItemTop5(page);
});

// Function to fetch user detail data
function fetchUserDetailData(Id) {
    fetch(`/api/userdetail/${Id}`)
    .then(handleResponse)
    .then(data => {
        // User information
        const tableBody = document.getElementById('UserDetailTableBody');
        tableBody.innerHTML = '';
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${data[0].UserName}</td>
        <td>${data[0].UserGender}</td>
        <td>${data[0].UserAge}</td>
        <td>${data[0].UserBirthdate}</td>
        <td>${data[0].UserAddress}</td>`;
        tableBody.appendChild(row);
        
        // Order Information
        const tableBodyDetail = document.getElementById('UserOrderDetailTableBody');
        tableBodyDetail.innerHTML = '';
        
        for (let i in data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data[i].OrderAt}</td>
                <td><a href="/orderdetail/${data[i].OrderId}">${data[i].OrderId}</a></td>
                <td><a href="/storedetail/${data[i].StoreId}">${data[i].StoreId}</a></td>
                `;
                tableBodyDetail.appendChild(row);
        }
    })
    .catch(handleError);
}

// Function to fetch user store top5 data
function fetchUserStoreTop5(Id) {
    fetch(`/api/userstoretop5/${Id}`)
    .then(handleResponse)
    .then(data => {
        const tableBodyDetail = document.getElementById('UserStoreTop5TableBody');
        tableBodyDetail.innerHTML = '';

        for (let i in data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data[i].StoreName}</td>
                <td>${data[i].OrderNum}</td>
                `;
                tableBodyDetail.appendChild(row);
        }
        
    })
    .catch(handleError);
}

// Function to fetch user item top5 data
function fetchUserItemTop5(Id) {
    fetch(`/api/useritemtop5/${Id}`)
    .then(handleResponse)
    .then(data => {
        const tableBodyDetail = document.getElementById('UserItemTop5TableBody');
        tableBodyDetail.innerHTML = '';
        
        for (let i in data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data[i].ItemName}</td>
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
