const express = require('express');
const fs = require("fs").promises;
const path = require('path')

const app = express();
const port = 3000;

app.use(express.static('public'));

// 1. 라우팅: 루트 경로 생성
app.get('/', (req, res) => {
    res.send(index.html)
});

app.get('/about', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'about.html')
    res.sendFile(htmlFilePath, (err) => {
        if (err) {
            console.error("파일 전송 오류:", err)
            res.status(500).send('서버 오류');
        }
    })
})

app.get('/user', (req, res) => {
    res.send(users)  // user 객체 나와야함
})


app.post('/', (req, res) => {
    res.send('Hello, World!\nPOST received')
})

app.put('/', (req, res) => {
    res.send('PUT received')
})

app.delete('/', (req, res) => {
    res.send('DELETE received')
})

// 특정 포트에서 서버 시작
app.listen(port, () => {
    console.log(`서버가 ${port} 에서 실행 중`);
});