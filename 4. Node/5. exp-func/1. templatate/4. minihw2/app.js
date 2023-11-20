const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
const csv = require('csv-parser') // 선택사항

const app = express();
const port = 3000;

// 눈적스 초기화
nunjucks.configure

app.get('/', (req, res) => {
    const data = [];
    
    fs.함수정하기('data.csv', { encoding: 'utf8' })
        파일읽기
        res.render('index', 데이터 전달)
});

// 서버 생성
app.listen