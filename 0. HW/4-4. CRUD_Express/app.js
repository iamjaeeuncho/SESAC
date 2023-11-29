const express = require('express');
const fs = require("fs").promises;
const path = require('path')

const app = express();
const port = 3000;

const users = {};

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
    res.send(users)
})

app.post('/user', (req, res) => {
    let body = "";
    // req에 data가 있을 때
    req.on("data", (data) => { body += data });
    // req data 처리가 끝날 때
    req.on("end", () => {
        // console.log("요청 온 내용은??", body);
        const formData = JSON.parse(body);
        // console.log("파싱한 후??", formData)
        const currentDate = Date.now();
        users[currentDate] = formData.name;
    });
    // 결과 response 주는 코드
    res.send("등록 성공")
})

app.put('/user/:id', (req, res) => {
    const key = req.params.id;
    
    let body = "";
    req.on("data", (data) => { body += data });
    req.on("end", () => {
        const formData = JSON.parse(body);
        users[key] = formData.name;
        console.log(users);
    })

    res.end("수정 성공")
})

app.delete('/user/:id', (req, res) => {
    const key = req.params.id;
    delete users[key];
    try {
        res.send(JSON.stringify(users));
    } catch (error) {
        console.error("삭제 중 오류 발생", error);
        res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
        res.send("서버에서 알수없는 오류가 발생하여 삭제에 실패했습니다.");
    }
})

// 특정 포트에서 서버 시작
app.listen(port, () => {
    console.log(`서버가 ${port} 에서 실행 중`);
});