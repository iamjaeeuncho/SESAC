document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("form");
    const username = document.getElementById("username");

    // 페이지 최초 로딩시 백엔드에 사용자 데이터 요청
    await updateTable();
    console.log(form, username);

    form.addEventListener("submit", async (ev) => {
        // form의 원래 기능(다른 페이지로 요청) 막기
        ev.preventDefault();

        const name = username.value;

        if (!name) {
            alert("이름을 입력하세요");
            return;
        } 

        // fetch를 통해서(요청) 내가 원하는 API의 정보를 불러온다
        // POST 요청을 한 것. 이름을 JSON 형식으로 바디(body)에 담아서
        try {
            const response = await fetch('/user', {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({name}),
            });
    
            if (response.ok) {
                alert("등록 성공");
                // 등록 완료시 입력 컬럼 초기화
                username.value = '';

                // 등록 성공시 화면 컴포넌트 추가
                await updateTable();
            } else {
                const errorMessage = await response.text();
                alert(`등록 실패: ${errorMessage}`);
            }
        } catch (error) {
            console.error("등록 중 오류 발생: ", error);
            alert("등록 중 오류 발생");
        }

    });
});

async function updateTable() {
    // 갱신 위해서 최신 정보를 가져옴
    await fetch("/user")
        .then(response => response.json())
        .then(users => displayUsers(users))
        .catch(error => console.log("사용자 정보 불러오기 실패: ", error));
}

function displayUsers(users) {
    // users에는 json 포맷의 사용자 데이터를 다 가지고 있음
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = '';

    if (Object.keys(users).length === 0) {
        const messageRow = document.createElement('div');
        messageRow.textContent = "등록된 사용자가 없습니다";
        userTable.appendChild(messageRow);
    } else {
        for (const key in users) {
            const row = document.createElement("div");
            row.innerHTML = `<strong>ID:</strong> ${key},
                            <strong>Name:</strong> ${users[key]}
                            <button onclick="editUser('${key}')">수정</button>
                            <button onclick="deleteUser('${key}')">삭제</button>`;
            userTable.appendChild(row);
        }
    }
}

async function editUser(userId) {
    const newName = prompt('수정할 이름을 입력하세요')
    const response = await fetch(`/user/${userId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: newName}) // 새로운 이름
    })

    if (response.ok) {
        alert('수정 성공')
        // 수정 성공시 페이지 리로딩
        await updateTable();
    } else {
        const errorMessage = await response.text();
        alert(`수정 실패: ${errorMessage}`);
    }
}

async function deleteUser(userId) {
    // 사용자에게 삭제 유무 확인
    const confirmDelete = confirm(`${userId}를 정말로 삭제하시겠습니까아?`)
    // console.log(confirmDelete)
    if (confirmDelete) {
        // 삭제 요청 수행
        const response = await fetch(`/user/${userId}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            // 화면 갱신
           await updateTable();
        } else {
            const errorMessage = await response.text();
            throw new Error(`삭제 실패: ${errorMessage}`);
        }
    }

}