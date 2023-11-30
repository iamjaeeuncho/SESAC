const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("mydb2.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`);


// 데이터 삽입(CREATE) >> INSERT
const newUser = { username: 'iamjaeeuncho', email: 'iamjaeeuncho@sesc.com'};

db.run('INSERT INTO users (username, email) VALUES (?, ?)',
    [newUser.username, newUser.email], function (err) {
    if (err) {
        console.error("데이터 삽입 실패");
        return;
    }
    console.log("데이터 삽입 성공 : ", this.lastID);
});


// 데이터 조회 (READ) >> SELECT
db.each("SELECT * FROM users", (err, row) => {
    if (err) {
    console.error("쿼리 실패");
    return;
    }
    console.log("ALL users : ", row);
});


// 데이터 수정 (UPDATE) >> UPDATE
const updateUser = {
  id: 1,
  username: 'iamjaeeuncho',
  email: 'iamjaeeuncho@sesac.com'
}

db.run('UPDATE users SET username=?, email=? WHERE id=?',
    [updateUser.username, updateUser.email], function (err) {
    if (err) {
        console.error("수정 실패");
        return;
    }
    console.log("수정 성공 ");
});


// 데이터 삭제 (DELETE) >> DELETE
const delUser = { id: 3 }
db.run('DELETE FROM users WHERE id=?',
    [delUser.id], function (err) {
    if (err) {
        console.error("삭제 실패");
        return;
    }
    console.log("삭제 성공");
});


// 데이터베이스 연결 종료
db.close();