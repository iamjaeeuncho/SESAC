const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const port = 3000;

const db = new sqlite3.Database("users.db");

db.run(
  "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)",
  (err) => {
    if (err) {
      console.log("테이블 생성 실패");
    } else {
      // 기본 계정 추가
      const initAccounts = [
        { username: "user1", password: "pass1" },
        { username: "user2", password: "pass2" },
      ];

      initAccounts.forEach(({ username, password }) => {
        db.run(
          "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
          [username, password],
          (err) => {
            if (err) {
              console.error("데이터 삽입 실패");
            }
          }
        );
      });
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // 로그인하는 쿼리문 구현
  // const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  const query = `SELECT * FROM users WHERE username=? AND password=?`;

  // 쿼리문으로 DB 확인
  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.error("DB에러");
    }

    if (row) {
      res.send(`로그인 성공: ${row.username}`);
    } else {
      res.status(401).send(`로그인 실패: ${username}`);
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.listen(port, () => {
  console.log("서버레디");
});
