const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mycrm.db');

// ITEM DETAIL
router.get('/:itemid?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'itemdetail.html'));
});

router.get('/list/:itemid?', (req, res) => {
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