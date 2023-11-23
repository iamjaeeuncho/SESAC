function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('로그인 실패')
        }
    })
    .then(data => {
        console.log(data.message);
        alert(data.message);
        if (data.message === '로그인 성공') {
            alert('로그인 성공')
        } else {
            alert('로그인 실패')
        }
        checkLoginStatus();
    }).catch(error => {
        console.log('로그인 실패: ', error);
        alert('로그인 실패')
    })
}

function logout() {
    fetch('/logout')
    .then(response => response.json())
    .then(data => {
        if (data.message === '로그아웃 성공!') {
            showLoginForm();
        } else {
            alert('로그아웃 실패');
        }
    })
}

function checkLoginStatus() {
    fetch('/check-login')    // 백엔드 구현: 사용자 세션 있으면 username 반납
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            showProfile(data.username);
            console.log('사용자 이름:', data.username)
        } else {
            showLoginForm();
            console.log('로그인된 사용자 없음')
        }
    })
    .catch(error => {
        console.error('로그인 상태 확인 오류:', error);
        showLoginForm();
    })
}

function showProfile(username) {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('usernameSpan').innerText = username;
}

function showLoginForm() {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
}