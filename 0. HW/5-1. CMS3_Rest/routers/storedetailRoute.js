const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mycrm.db');

// STORE DETAIL
router.get('/:storeId?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'storedetail.html'));
});

router.get('/list/:storeId?', (req, res) => {
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

module.exports = router;