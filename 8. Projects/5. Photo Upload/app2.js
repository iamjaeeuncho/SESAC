const express = require("express");
const nunjucks = require("nunjucks");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const debug = require("debug")("upload");

const app = express();
const port = 3000;

app.use(express.static("public"));
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
  res.render("index2", { posts }); // post=posts를 {}로 대체
});

app.get("/write", (req, res) => {
  res.render("write2");
});

// 파일 업로드를 위한 멀터 함수 정의
const upload = multer({
  dest: "public/uploads/",
  limits: { fieldSize: 10 * 1024 * 1024 }, // 10MB로 제한
  fileFilter: (req, file, cb) => {
    // 최소한의 필터
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("그림 파일만 첨부 가능합니다"), false);
    }
    cb(null, true);
  },
});

// debug.enabled = true; // 디버그 기능 온오프

app.post("/write", upload.single("photo"), (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  // const photo = req.body.photo;
  const date = new Date();

  // 업로드한 파일 경로
  const filepath = req.file ? req.file.path : null;

  // 원본 이미지와 썸네일을 각각 관리
  const filename = filepath ? `${req.file.filename}` : null;
  const thumbnailpath = filepath
    ? `thumbnails/thumb_${req.file.filename}`
    : null;

  posts.push({ title, content, filepath, filename, thumbnailpath, date });
  // console.log(posts)
  debug(posts);

  // 썸네일 생성
  if (filepath) {
    // 이미지 리사이즈 라이브러리 사용
    sharp(filepath)
      .resize(100)
      .toFile(`public/${thumbnailpath}`, (err, info) => {
        if (err) {
          console.error(err);
        }
      });
  }

  // res.send('작성완료');
  res.redirect("/");
});

app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "public", "uploads", filename);

  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile(filepath);
});

app.post("/delete/:index", (req, res) => {
  const index = req.params.index - 1; // 실제 인덱스로 변환
  const post = posts[index];

  // 글 삭제시 이미지 삭제
  if (post?.filepath) {
    fs.unlinkSync(post.filepath);
    const thumbpath = path.join(__dirname, "public", post.thumbnailpath);
    fs.unlinkSync(thumbpath);
  }

  posts.splice(index, 1);

  // res.send('삭제완료');
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`${port} 서버 레디 `);
});
