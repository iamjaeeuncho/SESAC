const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// 전자서명을 위한 대칭키
const secretKey = "mySecret";

app.use(cookieParser());

app.use((req, res, next) => {
  // 클라이언트에게 JWT 생성 및 전송
  const clientId = "MyClientId-1234";

  // JWT 서명
  const token = jwt.sign({ clientId }, secretKey, { expiresIn: "1m" });

  res.cookie("jwt", token);

  next();
});

app.use((req, res, next) => {
  const token = req.cookies.jwt;

  // JWT 검증
  jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorlized" });
    }

    const clientId = decode.clientId;
    if (clientId === "MyClientId-1234") {
      console.log("유저 페이지 전달");
      next();
    } else if (clientId == "MyClientId-admin") {
      console.log("관리자 페이지 전달");
      next();
    } else {
      res.status(404).send({ message: "Forbidden" });
    }
  });
});

app.get("/decode", (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);

  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.send(decodedToken);
});

app.get("/", (req, res) => {
  console.log("루트 접속");
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is on ${port}`);
});
