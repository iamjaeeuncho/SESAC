const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
// const csv = require('csv-parser');
const csv = require('fast-csv');
const app = express();


// 눈적스 초기화
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.set('view engine', 'html')


// 성능 측정 미들웨어
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const end = Date.now()
    const duration = end - start;

    console.log(`요청에서 ${req.path}에서 응답까지 ${duration}ms이 소요되었습니다.`)
  })
  next()
})

app.get('/', (req, res) => {
  // 읽을 데이터 담을 곳
  const data = []
  const fieldnames = [];

  fs.createReadStream('user.csv', {encoding: 'utf8'})
    .pipe(csv.parse( { headers: true, trim: true }))
    .on('headers', (headers) => {
      fieldnames.push(...headers);
      console.log(fieldnames);
    })
    .on('data', (row) => {
      // console.log(row)
      data.push(row);
    })
    .on('end', () => {
      console.log('파일 다 읽었음');
      res.render('index.html', { data: data, headers: fieldnames });
    })
    .on('error', (error) => {
      console.log('파일 읽기 오류', error)
    })

    // res.render('index')
    // res.send('끝')
});

// 서버 생성
const port = 3000;
app.listen(port, () => {
  console.log(`서버에 ${port}가 열려 있습니다.`)
})