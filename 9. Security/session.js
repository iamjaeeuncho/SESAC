const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

// 세션 설정
app.use(
  session({
    secret: "my-key", // 세션 데이터 암호화 키
    resave: false, // 변경된거 없어도 저장유무
    saveUninitialized: true, // 데이터가 없어도 저장유무
  })
);

app.get("/", (req, res) => {
  req.session.username = "user1";
  req.session.cart = ["사과", "딸기", "바나나"];

  res.send(
    `세션ID: ${req.sessionID}, 세션데이터${JSON.stringify(req.session)}`
  );
});

app.get("/user", (req, res) => {
  // console.log(req.session);
  console.log("Session Info: ", req.sessionStore.sessions);

  res.send(
    `세션ID: ${req.sessionID}, 세션데이터${JSON.stringify(req.session)}`
  );
});

app.listen(port, () => {
  console.log(`Server on ${port}`);
});
