const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "monthly_revenue2.html"));
})

app.get('/api/chart-data', (req, res) => {
    const db = new sqlite3.Database('crm.db');

    const query = `
        SELECT strftime('%Y-%m', o.orderat) AS YearMonth
            , SUM(i.unitprice) AS MonthlyRevenue
        FROM orders o
        JOIN orderitems oi ON o.id = oi.orderid
        JOIN items i ON oi.itemid = i.id
        WHERE o.orderat >= DATE('NOW', '-1 YEAR')
        GROUP BY strftime('%Y-%m', o.orderat)
        ORDER BY strftime('%Y-%m', o.orderat) ASC
    `;
    
    db.all(query, (err, rows) => {
        if (err) {

        } else {
            const labels = rows.map((row) => row.YearMonth);
            const revenues = rows.map((row) => row.MonthlyRevenue);
            // console.log(labels, revenues)

            // 쿼리 결과 전달
            res.json({ labels, revenues, rows })
        }
    })
})

// Server Port
app.listen(port, () => {
    console.log(`서버가 ${port}에서 실행 중입니다`);
  });