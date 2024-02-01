const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("users.db");

// 10000 = 10_000
const numData = 100_000;

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY,
        name TEXT,
        department TEXT,
        salary INTEGER
    )`);
});

function getRandomName() {
  const lastNames = ["김", "이", "박", "최", "정"];
  const firstName1 = ["가", "나", "다", "라", "마"];
  const firstName2 = ["바", "사", "아", "자", "차"];

  const randomFirstName1 =
    firstName1[Math.floor(Math.random() * firstName1.length)];
  const randomFirstName2 =
    firstName2[Math.floor(Math.random() * firstName2.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return randomLastName + randomFirstName1 + randomFirstName2;
}

function getRandomDepartment() {
  const departments = ["IT", "HR", "ENG", "MD"];
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomSalary() {
  // 10000 ~ 100000 사이 급여
  return Math.floor(Math.random() * 90) * 1000 + 1000;
}

db.serialize(() => {
  db.run("BEGIN TRANSACTION");
  // 수동으로 하나하나 넢고 DB 동기화 과정을 거치는 비효율적인 코드
  const insertStmt = db.prepare(
    `INSERT INTO employees(name, department, salary) VALUES (?, ?, ?)`
  );
  for (let i = 0; i < numData; i++) {
    const name = getRandomName();
    const department = getRandomDepartment();
    const salary = getRandomSalary();

    console.log(name, department, salary);
    insertStmt.run(name, department, salary);
  }

  insertStmt.finalize();
  db.run("COMMIT");
});

db.close();
