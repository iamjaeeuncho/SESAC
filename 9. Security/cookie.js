const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  // 1분 만료
  res.cookie("mycookie", "test", { maxAge: 60000 });
  res.cookie("username", "user1", { maxAge: 90000 });
  res.cookie("cart", ["사과", "딸기", "바나나"], { maxAge: 120000 });
  res.send("쿠키 1분후 만료");
});

app.get("/user", (req, res) => {
  const { mycookie, username, cart } = req.cookies;

  console.log(req.cookies);
  res.send(`${username}이 가져온 쿠키는 ${cart}`);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
