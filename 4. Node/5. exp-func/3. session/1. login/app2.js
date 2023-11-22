const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 세션 미들웨어 설정
app.use(
    session( {
        secret: 'this-is-my-important-secret',
        resave: false,
        saveUninitialized: true,
    })
)

// public 폴더 정적 파일 폴더로 설정
app.use(express.static('public'));

// 배열 (1차원 배열), 두 개의 객체를 담고 있음
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' },
    { id: 4, username: 'user4', password: 'password4' },
    { id: 5, username: 'user5', password: 'password5' },
    { id: 6, username: 'user6', password: 'password6' },
]

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    
    // 검색기능
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        console.log('로그인 성공')
        req.session.user = user;
        res.json({message: '로그인 성공'})
    } else {
        console.log('로그인 실패') 
        res.status(401).json({message: '로그인 실패'})
    }
})

app.get('/profile', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({username: user.username, message: '프로필 정보'})
    } else {
        res.status(401).json({message: '로그인이 필요'})
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('세션 삭제')
            res.status(500).json({ message: '로그아웃 실패' })
        } else {
            res.json({ message: '로그아웃 성공' })
        }
    })
})

app.listen(port, () => {
    console.log(`서버가 ${port}에서 대기중`)
})
