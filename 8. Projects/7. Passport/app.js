const express = require("express");
const session = require("express-session");
const nunjucks = require("nunjucks");
const passport = require("passport");
const path = require("path");
const flash = require("connect-flash");
const users = require("./users");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));

// 뷰엔진 설정
app.set("view engine", "html");
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// session 초기화
app.use(
  session({
    secret: "my-password-1234",
    resave: true,
    saveUninitialized: true,
  })
);

// flash 미들웨어 추가
app.use(flash());

// passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 각 전략파일을 불러오기
require(path.join(__dirname, "strategies", "local"))(app);
require(path.join(__dirname, "strategies", "kakao"))(app);

// 로그인 정보 세션에 저장
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// userid 기반 사용자 객체 다시 가져옴
passport.deserializeUser((obj, done) => {
  const user = users.find((u) => u.id === obj);
  done(null, user);
});

// 미들웨어 정적 폴더
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { messages: req.flash() });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { user: req.user, message: req.flash() });
});

app.listen(3000, () => {
  console.log("서버 레디");
});
