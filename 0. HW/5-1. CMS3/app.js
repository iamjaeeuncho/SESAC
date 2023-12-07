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
  res.redirect('/user');
});


// USER
app.get('/user/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.get('/users/:pagenum?', (req, res) => {
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

app.get('/search/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.get('/searchform/:page?', (req, res) => { 
  const { name, gender } = req.query;
  console.log(req.url)

  let query = 'SELECT * FROM users';
  const param = [];

  if (name || gender) {
    query += ' WHERE';
  }

  if (name) {
    query += ' Name LIKE ?';
    param.push(`%${name}%`);
  }

  if (name && gender) {
    query += ' AND';
  }

  if (gender) {
    query += ' Gender = ?';
    param.push(`${gender}`);
  }

  db.all(query, param, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    // 원하는 페이지로 이동
    const itemsPerPage = 10;
    let page = req.params.page || 1;
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    // 전체 페이지수 계산
    const totalPages = Math.ceil(rows.length / itemsPerPage);
    
    // 읽은 데이터 앞에 itemsPerPage개만 주기
    const currPageRows = rows.slice(startIndex, endIndex);
    console.log(currPageRows, totalPages, page)

    res.json({
      currPageRows: currPageRows,
      totalPages: totalPages,
      page: parseInt(page)
    })
  });
});


// STORE

app.get('/store/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'stores.html'));
});

app.get('/stores/:pagenum?', (req, res) => {
  // 데이터베이스에서 users 테이블 조회
  const query = 'SELECT * FROM stores';

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

app.get('/storedetail/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'storedetails.html'));
});

app.get('/storedetails/:storeId?', (req, res) => {
  // 데이터베이스에서 users 테이블 조회
  const storeId = req.params.storeId;
  
  const query = `SELECT s.id AS StoreId
                  , s.name AS StoreName
                  , s.type AS StoreType
                  , s.address AS StoreAddress
                  , strftime('%Y-%m', o.orderat) AS OrderAt
                  , COUNT(o.id) AS OrderNum
                  , SUM(i.unitprice) AS TotalSales
                FROM stores s 
                JOIN orders o ON s.id = o.storeid 
                JOIN orderitems oi ON o.id = oi.orderid
                JOIN items i ON oi.itemid = i.id
                WHERE s.Id = '${storeId}'
                GROUP BY s.id, strftime('%m', o.orderat);`
  
  db.all(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
  console.log('쿼리', query)
  console.log('데이터', data)

  res.json( data )
  });
});


// ITEM

app.get('/item/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'items.html'));
});

app.get('/items/:pagenum?', (req, res) => {
  // 데이터베이스에서 users 테이블 조회
  const query = 'SELECT * FROM items';

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


// ORDERITEM

app.get('/orderitem/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'orderitems.html'));
});

app.get('/orderitems/:pagenum?', (req, res) => {
  // 데이터베이스에서 users 테이블 조회
  const query = 'SELECT * FROM orderitems';

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


// ORDER

app.get('/order/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'orders.html'));
});

app.get('/orders/:pagenum?', (req, res) => {
  // 데이터베이스에서 users 테이블 조회
  const query = 'SELECT * FROM orders';

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



// 서버 생성
app.listen(port, () => {
  console.log(`서버가 ${port}에서 실행 중입니다`);
});