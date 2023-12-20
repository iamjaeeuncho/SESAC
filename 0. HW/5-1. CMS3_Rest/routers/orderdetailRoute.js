const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mycrm.db');

// ORDER DETAIL
router.get('/:orderId?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'orderdetail.html'));
});

router.get('/list/:orderId?', (req, res) => {
  const orderId = req.params.orderId;
  const query = `SELECT * FROM orders WHERE id = '${orderId}'`;
  
  db.all(query, (err, data) => {
    if (err) return handleDatabaseError(res, err);
    
    res.json( data );
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