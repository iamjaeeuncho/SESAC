const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');

const app = express();

// 눈적스 초기화
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.set('view engine', 'html')

app.get('/', (req, res) => {
    const datas = [];
    const csvFilePath = './user.csv'
    const csvData = fs.readFileSync(csvFilePath, 'utf-8')

    // 문자열을 줄 단위로 나누기
    // 각 줄을 객체로 변환
    csvData.split('\n').slice(1, 22).forEach((line) => {
      const [Num, Id, Name, Gender, Birthday, Age, Address] = line.split(',');
    
      // 객체 생성 및 배열에 추가
      const person = {
        Num: Num,
        Id: Id,
        Name: Name,
        Gender: Gender,
        Birthday: Birthday,
        Age: Age,
        Address: Address.trim(), // 앞뒤 공백 제거
      };

      datas.push(person);
    });
    
      res.render('index', { datas: datas })
});

// 서버 생성
const port = 3000;
app.listen(port, () => {
    console.log(`${port} 준비 완료`)
})