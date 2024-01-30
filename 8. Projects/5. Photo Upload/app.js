const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "html");

nunjucks
  .configure("views", {
    autoescape: true,
    express: app,
  })
  .addFilter("formatPostDate", function (date) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("ko-KR", options);
  });

// 게시글 담기위한 변수
let posts = [];

app.get("/", (req, res) => {
  res.render("index", { posts }); // post=posts를 {}로 대체
});

app.get("/write", (req, res) => {
  res.render("write");
});

app.post("/write", (req, res) => {
  // console.log(req.body);
  const title = req.body.title;
  const content = req.body.content;
  const date = new Date();

  posts.push({ title, content, date });

  // res.send('작성완료');
  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  const index = req.params.index - 1; // 실제 인덱스로 변환

  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
  }

  // res.send('삭제완료');
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`${port} 서버 레디 `);
});
