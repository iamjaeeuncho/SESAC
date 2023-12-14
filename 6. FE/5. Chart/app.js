const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3'); 

const app = express();
const port = 3000;

// Nunjucks 초기화
nunjucks.configure('views', {
    autoescape: true,
    express: app,
})

// 기본값이 NJK라서 변환
app.set('view engine', 'html')

app.get('/', (req, res) => {
    // DB 접속
    const db = new sqlite3.Database('crm.db');
    console.log('DB 접속 성공')

    // 월간 매출 쿼리로 테이블 그리기
    db.all(`SELECT 
                  strftime('%Y-%m', o.orderat) AS YearMonth
                , SUM(i.unitprice) AS MonthlyRevenue
            FROM orders o
            JOIN orderitems oi ON o.id = oi.orderid
            JOIN items i ON oi.itemid = i.id
            WHERE o.orderat >= DATE('NOW', '-1 YEAR')
            GROUP BY strftime('%Y-%m', o.orderat)
            ORDER BY strftime('%Y-%m', o.orderat) ASC
    `, (err, rows) => {
        if (err) {

        } else {
            const labels = JSON.stringify(rows.map((row) => row.YearMonth));
            const revenues = JSON.stringify(rows.map((row) => row.MonthlyRevenue));
            console.log(labels, revenues)

            // 쿼리 결과 전달
            res.render('monthly_revenue', { labels: labels, revenues: revenues, rows: rows })
        }
    })

    

    // DB 접속 종료
    db.close();
})

app.listen(port, () => {
    console.log('서버 레디')
})