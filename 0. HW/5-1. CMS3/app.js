const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

// SQLite3 데이터베이스 연결
const db = new sqlite3.Database('mycrm1.db');


// Views 폴더 지정
app.use(express.static(path.join(__dirname, 'views')));


// 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.get('/user/:id?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.get('/users/:pagenum', (req, res) => {
  // 데이터베이스에서 users 테이블 조회
  const query = 'SELECT * FROM users';

  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // 원하는 페이지로 이동
    const itemsPerPage = 10;
    let page = req.params.pagenum || 1;
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    // 전체 페이지수 계산
    const totalPages = Math.ceil(rows.length / itemsPerPage);
    
    // 읽은 데이터 앞에 itemsPerPage개만 주기
    const currPageRows = rows.slice(startIndex, endIndex);
    
    res.json({
      currPageRows: currPageRows,
      totalPages: totalPages,
      page: parseInt(page)
    })
  });
});

app.get('/search', (req, res) => {
  const { name, gender } = req.query;

  let query = 'SELECT * FROM users';
  const params = [];

  if (name || gender) {
    query += ' WHERE';
  }

  if (name) {
    query += ' Name LIKE ?';
    params.push(`%${name}%`);
  }

  if (name && gender) {
    query += ' AND';
  }

  if (gender) {
    query += ' Gender = ?';
    params.push(`${gender}`);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    res.json({
      searchResults: rows
    });
  });
});

// 서버 생성
app.listen(port, () => {
  console.log(`서버가 ${port}에서 실행 중입니다`);
});
