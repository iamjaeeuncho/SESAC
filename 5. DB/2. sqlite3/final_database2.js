const sqlite3 = require("sqlite3");

class Database {
    constructor(dbName) {
        this.db = new sqlite3.Database(dbName);
    }

    // 테이블 생성
    createTable() {
        return new Promise ((resolve, reject) => {
            this.db.run(`CREATE TABLE IF NOT EXISTS users (
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
    insertUser(newUser){
        return new Promise ((resolve, reject) => {
            this.db.run('INSERT INTO users (username, email) VALUES (?, ?)',
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
    updateUser(updateUser) {
        return new Promise ((resolve, reject) => {
            this.db.run('UPDATE users SET username=?, email=? WHERE id=?',
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
    deleteUser(delUser) {
        return new Promise ((resolve, reject) => {
            this.db.run('DELETE FROM users WHERE id=?',
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
    readUser() {
        return new Promise ((resolve, reject) => {
            this.db.each("SELECT * FROM users", (err, row) => {
            if (err) {
            console.error("쿼리 실패");
            reject(err);
            }
            console.log("ALL users : ", row);
            resolve();
            });
        })
    }

    close(){
        this.db.close();
    }
}


module.exports = Database;