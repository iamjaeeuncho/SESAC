const sqlite3 = require("sqlite3");

function createTable() {
  return new Promise ((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT
    )`,  function (err) {
      if (err) {
        reject(err);
      } else { 
        resolve();
      }
    });
  })
}


// 데이터 삽입(CREATE) >> INSERT
function insertUser(){
  return new Promise ((resolve, reject) => {
    const newUser = { username: 'iamjaeeuncho', email: 'iamjaeeuncho@sesac.com'};
    db.run('INSERT INTO users (username, email) VALUES (?, ?)',
    [newUser.username, newUser.email], function (err) {
      if (err) {
        reject(err);
      } else { 
        resolve();
      }
    })
  })
}


//데이터 수정 (UPDATE) >> UPDATE
function updateUser() {
  return new Promise ((resolve, reject) => {
    const updateUser = {
      id: 1,
      username: 'iamjaeeuncho',
      email: 'iamjaeeuncho@sesac.com'
    }
    db.run('UPDATE users SET username=?, email=? WHERE id=?',
    [updateUser.username, updateUser.email, updateUser.id], function (err) {
      if (err) {
        reject(err);
      } else { 
        resolve();
      }
    });
  })
}

function deleteUser() {
  return new Promise ((resolve, reject) => {
    //데이터 삭제 (DELETE) >> DELETE
    const delUser = { id: 3 }
    db.run('DELETE FROM users WHERE id=?',
    [delUser.id], function (err) {
      if (err) {
        reject(err);
      } else { 
        resolve();
      }
    });
  })
}

function readUser() {
  return new Promise ((resolve, reject) => {
    //데이터 조회 (READ) >> SELECT
    db.each("SELECT * FROM users", (err, row) => {
      if (err) {
        console.error("쿼리 실패");
        reject(err);
      }
      console.log("ALL users : ", row);
      resolve();
    });
  })
}


const db = new sqlite3.Database("mydb4.db");

async function main() {
  await createTable();
  await insertUser();
  await updateUser();
  await deleteUser();
  await readUser();

  //데이터베이스 연결 종료
  db.close();
}

main();
