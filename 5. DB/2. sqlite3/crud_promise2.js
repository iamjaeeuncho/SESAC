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
function insertUser(newUser){
  return new Promise ((resolve, reject) => {
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
function updateUser(updateUser) {
  return new Promise ((resolve, reject) => {
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

// 데이터 삭제 (DELETE) >> DELETE
function deleteUser(delUser) {
  return new Promise ((resolve, reject) => {
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

//데이터 조회 (READ) >> SELECT
function readUser() {
    return new Promise ((resolve, reject) => {
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

    const newUserA = { username: 'iamjaeeuncho', email: 'iamjaeeuncho@sesac.com'};
    const newUserB = { username: 'iamjaeeuncho2', email: 'iamjaeeuncho2@sesac.com'};
    await insertUser(newUserA);
    await insertUser(newUserB);

    const changeUser = { id: 2, username: 'iamjaeeuncho222', email: 'iamjaeeuncho222@sesac.com' }
    await updateUser(changeUser);

    await readUser();

    const delUser = { id: 2 };
    await deleteUser(delUser);

    const delUser2 = { id: 6 };
    await deleteUser(delUser2);

    //데이터베이스 연결 종료
    db.close();
}

main();
