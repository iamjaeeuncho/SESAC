const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

const users = {}

// 정적 파일 요청시 제공할 폴더 설정
// 앞: URL, 뒤: 로컬 폴더명
app.use('/static', express.static('public/static'));
app.use('/images', express.static('public/static')); // 여러개 만들수도 있음

app.use(bodyParser.json())
// express 4.16 이후 부터 bodyparser 안써도 
// app.user(express.json())

// 각종 라우트 셋업
// --- GET ---
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'about.html'))
});

app.get('/user', (req, res) => {
    res.json(users)
});

// --- POST ---
app.post('/user', (req, res) => {
    console.log(req.body);

    const id = Date.now();
    const { name } = req.body;
    // const name = req.body.name;

    users[id] = name;
    res.status(201).send('등록 성공')
})

// --- PUT ---
app.put('/user/:id', (req, res) => {
    // id 접근
    const id = req.params.id;
    // 로직 처리
    users[id] = req.body.name;
    // 응답 처리
    res.status(200).send('수정 성공');
});

// --- DELETE ---
app.delete('/user/:id', (req, res) => {
    try {
        // id 접근
        const id = req.params.id;
        // 로직 처리
        delete users[id];
        // 응답 처리
        res.status(200).send('삭제 완료');
    } catch (error) {
        console.log('삭제 중 오류 발생', error)
        res.status(500).send('서버 내부 오류')
    }
});

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}에서 대기 중입니다`)
})