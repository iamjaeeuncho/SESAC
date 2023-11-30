const sqlite = require('better-sqlite3');

// const db = sqlite('mydb1.db')
const db = sqlite(':memory:')

db.exec(`CREATE TABLE IF NOT EXISTS greeting (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
)`);

// 데이터 삽입
const msg1 = ["Hello, World33"];
const insert = db.prepare(`INSERT INTO greeting (message) VALUES (?)`);
const result = insert.run(msg1);
console.log('데이터 성공적으로 추가: ', result.lastInsertRowid);

// 데이터 조회
const read = db.prepare('SELECT * FROM greeting');
const greetings = read.all();
console.log(greetings);

greetings.forEach((row) => {
    console.log('Greeting: ', row.message);
});

// 데이터베이스 연결 종료
db.close();