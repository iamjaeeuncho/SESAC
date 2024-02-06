const express = require("express");

const app = express();
const PORT = 3000;

// 가상 데이터
const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
console.log(data);

app.use(express.static("public"));

function getItems(start, end) {
  return data.slice(start, end);
}

// 데이터 요청을 위한 엔드 포인트
app.get("/get-items", (req, res) => {
  const { start, end } = req.query;

  const items = getItems(parseInt(start), parseInt(end));

  res.json(items);
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
