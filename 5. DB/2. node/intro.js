const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("mydb1.db");

db.run(`CREATE TABLE IF NOT EXISTS greeting (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
)`);

// 데이터 삽입
const msg1 = ["Hello, World4"];
db.run(`INSERT INTO greeting (message) VALUES (?)`, msg1, function (err) {
  if (err) {
    console.error("데이터 삽입 실패");
    return;
  }
  console.log("데이터 성공적으로 추가 : ", this.lastID);
});

// 데이터 조회
db.each("SELECT * FROM greeting", (err, row) => {
  if (err) {
    console.error("쿼리 실패");
    return;
  }
  console.log("Greeting : ", row.message);
});

db.close();