const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mycrm.db');

// USER DETAIL
router.get('/:userid?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'userdetail.html'));
  });
  
  router.get('/list/:userid?', (req, res) => {
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
  
  router.get('/userstoretop5/:userid?', (req, res) => {
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
  
  router.get('/useritemtop5/:userid?', (req, res) => {
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