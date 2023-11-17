const { json } = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

// 미들웨어를 통한 body 데이터 처리
// 원래는 body-parser라고 불리는 모듈이 해주는것이었으나 지금은 그냥 빌트인 express 모듈 사용 예정
app.use(express.json())

app.post('/submit2', (req, res) => {
    const jsonData = req.body;
    console.log(jsonData);
    res.json({receivedData: jsonData})
})

app.post('/submit', (req, res) => {
    let data = '';
    
    req.on('data', (body) => {
        data += body;
    })

    req.on('end', () => {
        try {
            console.log(data);
            const jsonData = JSON.parse(data);
            res.json({ receivedData: jsonData })
        } catch(error) {
            res.status(400).json({error: "잘못된 입력값"})
        }
    })

    // res.status(201);
    // res.end();
    // res.status(201).end()
})

app.listen(port, () => {
    console.log(`서버가 ${port}에 열려 있습니다`)
})