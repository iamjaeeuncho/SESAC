const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

// SQLite3 DB
const db = new sqlite3.Database('mycrm.db');

app.use((req, res, next) => {
  console.log(req.url);
  next();
})
// Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'utils')));

// Main Page
app.get('/', (req, res) => {
    res.redirect('/user');
});

// Function for pagination
function paginateData(rows, page, itemsPerPage) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const currPageRows = rows.slice(startIndex, endIndex);
    
    return currPageRows;
}

function calculateTotalPages(totalRows, itemsPerPage) {
    return Math.ceil(totalRows / itemsPerPage);
}

// Funtion to handle DB Error
function handleDatabaseError(res, err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
}

// USER
app.get('/user/:page?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user.html'));
});

app.get('/api/user/:page?', (req, res) => {
    const query = 'SELECT * FROM users';

    db.all(query, (err, rows) => {
        if (err) return handleDatabaseError(res, err);
        
        const itemsPerPage = 20;
        const page = parseInt(req.params.page) || 1;
        const currPageRows = paginateData(rows, page, itemsPerPage);
        const totalPages = calculateTotalPages(rows.length, itemsPerPage);

        res.json({
          currPageRows,
          totalPages,
          page,
        });
    });
});

// USER SEARCH
app.get('/search/:page?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user.html'));
});

app.get('/api/search/:page?', (req, res) => { 
    const { name, gender } = req.query;

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
        if (err) return handleDatabaseError(res, err);
    
        const itemsPerPage = 20;
        const page = parseInt(req.params.page) || 1;
        const currPageRows = paginateData(rows, page, itemsPerPage);
        const totalPages = calculateTotalPages(rows.length, itemsPerPage);

        res.json({
            currPageRows,
            totalPages,
            page,
        });
    });
});

// USER DETAIL
app.get('/userdetail/:userid?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'userdetail.html'));
});

app.get('/api/userdetail/:userid?', (req, res) => {
    const userid = req.params.userid;
    const query = `SELECT u.id AS UserId
                    , u.name AS UserName
                    , u.gender AS UserGender
                    , u.age AS UserAge
                    , u.birthdate AS UserBirthdate
                    , u.address AS UserAddress
                    , o.id AS OrderId
                    , o.orderat AS OrderAt
                    , o.storeid AS StoreId
                FROM users u
                JOIN orders o ON u.id = o.userid
                WHERE u.id = '${userid}'`;

    db.all(query, (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json( data )
    });
});

app.get('/api/userstoretop5/:userid?', (req, res) => {
    const userid = req.params.userid;
    const query = `SELECT o.userid AS UserId
                        , s.name AS StoreName
                        , COUNT(DISTINCT oi.orderid) AS OrderNum
                FROM orders o
                JOIN stores s ON o.storeid = s.id
                JOIN orderitems oi ON o.id = oi.orderid
                WHERE o.userid = '${userid}'
                GROUP BY o.userid, s.id
                ORDER BY COUNT(DISTINCT oi.orderid) DESC LIMIT 5
                `;

    db.all(query, (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json( data )
    });
});

app.get('/api/useritemtop5/:userid?', (req, res) => {
    const userid = req.params.userid;
    const query = `SELECT o.userid AS UserId
                    , i.id AS ItemId
                    , i.name AS ItemName
                    , COUNT(oi.orderid) AS OrderNum
                FROM orders o
                JOIN orderitems oi ON o.id = oi.orderid
                JOIN items i ON oi.itemid = i.id
                WHERE o.userid = '${userid}'
                GROUP BY o.userid, i.id
                ORDER BY COUNT(oi.orderid) DESC LIMIT 5
                `;

    db.all(query, (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json( data )
    });
});

// STORE
app.get('/store/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'store.html'));
});

app.get('/api/store/:page?', (req, res) => {
    const query = 'SELECT * FROM stores';

    db.all(query, (err, rows) => {
    if (err) return handleDatabaseError(res, err);

    const itemsPerPage = 20;
    const page = parseInt(req.params.page) || 1;
    const currPageRows = paginateData(rows, page, itemsPerPage);
    const totalPages = calculateTotalPages(rows.length, itemsPerPage);

    res.json({
        currPageRows,
        totalPages,
        page,
    });
    });
});

app.get('/storedetail/:storeId?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'storedetail.html'));
});

app.get('/api/storedetail/:storeId?', (req, res) => {
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

  res.json( data )
  });
});

app.get('/storedaily/:storeId/:orderAt?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'storedaily.html'));
});

app.get('/api/storedaily/:storeId/:orderAt?', (req, res) => {
  const storeId = req.params.storeId;
  const orderAt = req.params.orderAt;
  
  const query = `SELECT s.id AS StoreId
                  , s.name AS StoreName
                  , s.type AS StoreType
                  , s.address AS StoreAddress
                  , strftime('%Y-%m-%d', o.orderat) AS OrderAt
                  , COUNT(o.id) AS OrderNum
                  , SUM(i.unitprice) AS TotalSales
                FROM stores s 
                JOIN orders o ON s.id = o.storeid 
                JOIN orderitems oi ON o.id = oi.orderid
                JOIN items i ON oi.itemid = i.id
                WHERE s.Id = '${storeId}' AND strftime('%Y-%m', o.orderat) = '${orderAt}'
                GROUP BY s.id, strftime('%Y-%m-%d', o.orderat);`
  
  db.all(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  res.json( data )
  });
});

app.get('/api/storeregular/:storeId/:orderAt?', (req, res) => {
  const storeId = req.params.storeId;
  const orderAt = req.params.orderAt;
  
  const query = `SELECT s.id AS StoreId
                  , s.name AS StoreName
                  , s.type AS StoreType
                  , s.address AS StoreAddress
                  , strftime('%Y-%m', o.orderat) AS OrderAt
                  , COUNT(DISTINCT oi.orderid) AS OrderNum
                  , u.id AS UserId
                  , u.name AS UserName
                FROM stores s 
                JOIN orders o ON s.id = o.storeid
                JOIN orderitems oi ON o.id = oi.orderid
                JOIN users u ON o.userid = u.id
                WHERE s.Id = '${storeId}' AND strftime('%Y-%m', o.orderat) = '${orderAt}'
                GROUP BY s.id, strftime('%Y-%m', o.orderat), u.id;`
  
  db.all(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  res.json( data )
  });
});

// ITEM
app.get('/item/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'item.html'));
});

app.get('/api/item/:page?', (req, res) => {
    const query = 'SELECT * FROM items';

    db.all(query, (err, rows) => {
    if (err) return handleDatabaseError(res, err);

    const itemsPerPage = 20;
    const page = parseInt(req.params.page) || 1;
    const currPageRows = paginateData(rows, page, itemsPerPage);
    const totalPages = calculateTotalPages(rows.length, itemsPerPage);

    res.json({
        currPageRows,
        totalPages,
        page,
    });
    });
});

app.get('/itemdetail/:itemid?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'itemdetail.html'));
});

app.get('/api/itemdetail/:itemid?', (req, res) => {
  const itemid = req.params.itemid;

  const query = `SELECT oi.itemid AS ItemId
                  , i.name AS ItemName
                  , strftime('%Y-%m', o.orderat) AS OrderAt
                  , COUNT(oi.orderId) AS OrderNum
                  , CAST(i.unitprice AS INTEGER) AS UnitPrice
                  , SUM(i.unitprice) AS TotalPrice
                FROM orders o
                JOIN orderitems oi ON o.id = oi.orderid
                JOIN items i ON oi.itemid = i.id
                WHERE oi.itemid = '${itemid}'
                GROUP BY strftime('%Y-%m', o.orderat);
                `;

  db.all(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  res.json( data )
  });
});

// ORDERITEM
app.get('/orderitem/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'orderitem.html'));
});

app.get('/api/orderitem/:page?', (req, res) => {
  const query = 'SELECT * FROM orderitems';

  db.all(query, (err, rows) => {
    if (err) return handleDatabaseError(res, err);

    const itemsPerPage = 20;
    const page = parseInt(req.params.page) || 1;
    const currPageRows = paginateData(rows, page, itemsPerPage);
    const totalPages = calculateTotalPages(rows.length, itemsPerPage);

    res.json({
        currPageRows,
        totalPages,
        page,
    });
    });
});

// ORDER
app.get('/order/:page?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'order.html'));
});

app.get('/api/order/:page?', (req, res) => {
  const query = 'SELECT * FROM orders';

  db.all(query, (err, rows) => {
    if (err) return handleDatabaseError(res, err);

    const itemsPerPage = 20;
    const page = parseInt(req.params.page) || 1;
    const currPageRows = paginateData(rows, page, itemsPerPage);
    const totalPages = calculateTotalPages(rows.length, itemsPerPage);

    res.json({
        currPageRows,
        totalPages,
        page,
    });
    });
});

app.get('/orderdetail/:orderId?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'orderdetail.html'));
});

app.get('/api/orderdetail/:orderId?', (req, res) => {
  const orderId = req.params.orderId;
  const query = `SELECT * FROM orders WHERE id = '${orderId}'`;
  
  db.all(query, (err, data) => {
    if (err) return handleDatabaseError(res, err);

    res.json( data );
    });
});

// Server Port
app.listen(port, () => {
  console.log(`서버가 ${port}에서 실행 중입니다`);
});