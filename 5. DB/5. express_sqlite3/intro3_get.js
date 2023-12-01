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
// GET 방식으로 username 받아와서 이 사용자 검색하기
// localhost:3000/users?username=user1
// localhost:3000/users?username=user2
// localhost:3000/users?username=user3
app.get('/users', (req, res) => {
    // const username = req.query.username;
    const { username } = req.query;

    let query;

    if (username) {
        query = `SELECT * FROM users WHERE username LIKE '%${username}%'`;
    } else {
        query = `SELECT * FROM users`;    
    }

    db.all(query, (err, rows) => {
        res.json(rows);
    })
})

app.get('/users/:user_id', (req, res) => {
    const tableId = req.params.user_id;
    const query = `SELECT * FROM users WHERE id = ?`;

    db.get(query, [tableId], (err, row) => {
        res.json(row)
    })
})


// GET 방식으로 price 받아와서 아래 name 검색하기
// localhost:3000/products?price=2000
// localhost:3000/products?price=1500
// localhost:3000/products?price=5000

// localhost:3000/products?name=Product 1
// localhost:3000/products?name=Product 2
// localhost:3000/products?price=3000&name=Product 2
app.get('/products', (req, res) => {
    // DB로부터 특정 테이블을 조회하는 코드
    // const name = req.query.name;
    // const price = req.query.price;
    const { name, price } = req.query;
    console.log(`name: ${name}, price: ${price}`);
    
    let query='';
    query += 'SELECT * FROM products';
    
    // if(name && price) {
    // query +=` WHERE name LIKE '${name} AND price = ${price}'`;}
    let condition = 0;

    if (name) {
	    if (condition = 0) { query += ' WHERE' } else { query += ' AND'; }
    
    query += ` name LIKE '${ name }'`; condition = 1; }
    
    if (price) {
        if (condition = 0) { query += ' WHERE' } else { query += ' AND'; }
    query += `price = ${price}`; condition = 1; }

    db.all(query, (err, rows) => {
        res.json(rows);
    })
})

app.get('/products/:products_id', (req, res) => {
    const tableId = req.params.products_id;

    const query = `SELECT * FROM products WHERE id = ?`;

    db.get(query, [tableId], (err, row) => {
        res.json(row)
    })
})



app.get('/books', (req, res) => {
    // DB로부터 특정 테이블을 조회하는 코드
    const query = `SELECT * FROM books`;

    db.all(query, (err, rows) => {
        res.json(rows);
    })
})

app.get('/books/:books_id', (req, res) => {
    const tableId = req.params.books_id;

    const query = `SELECT * FROM books WHERE id = ?`

    db.get(query, [tableId], (err, row) => {
        res.json(row);
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