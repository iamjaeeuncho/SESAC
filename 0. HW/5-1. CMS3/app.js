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
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/users', (req, res) => {
  // 데이터베이스에서 users 테이블 조회
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  // 원하는 페이지로 이동
  const itemsPerPage = 20;
  let page = req.query.page || 1;
  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;

  // 전체 페이지수 계산
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  
  // 읽은 데이터 앞에 itemsPerPage개만 주기
  const currPageRows = rows.slice(startIndex, endIndex);
  
  // res.json(rows);
    res.json({
      currPageRows: currPageRows,
      totalPages: totalPages,
      page: parseInt(page)
    })
  });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
    // console.log(data)
    // res.send(`도착한 ID: ${id}`);

    res.render('detail', {
      headers: fieldnames,
      row: data.find(person => person.Id === id),
    })
});



// 서버 생성
app.listen(port, () => {
  console.log(`서버가 ${port}에서 실행 중입니다`);
});
