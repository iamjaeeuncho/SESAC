const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');

const app = express();
const port = 3000;
const dbFile = 'mydb1.db';

// SQLite 데이터베이스 연결
const db = new sqlite3.Database(dbFile);

// DB 초기화 함수
function init_database() {
    return new Promise((resolve, reject) => {
        // init_database.sql 파일 읽어와 실행
        const sql = fs.readFileSync('init_database.sql', 'utf8');
        console.log(sql);
    
        db.exec(sql, (err) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    console.warn('DB가 이미 초기화되어 있음')
                    resolve();
                } else {
                    console.error('초기화 실패: ', err);
                    reject();
                }
            } else {
                console.log('초기화 성공');
                resolve();
            }
        })
    })
}

// init_database();


// 서버 URL
app.get('/:table', (req, res) => {
    // DB로부터 특정 테이블을 조회하는 코드
    const db_table = req.params.table;
    const query = `SELECT * FROM ${db_table}`;
    console.log(query)

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            res.json(rows);
        }
    })
})

app.get('/:table/:id', (req, res) => {
    const db_table = req.params.table;
    const id = req.params.id;

    const query = `SELECT * FROM ${db_table} WHERE id = ${id}`

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err);
        } else {
            res.send(row);
        }
    })
})

// Express 서버 시작
async function startServer() {
    try {
        await init_database();
    
        app.listen(port, () => {
            console.log(`서버 레디 ${port}`)
        })
    } catch (error) {
        console.error(error);
    }
}

startServer();