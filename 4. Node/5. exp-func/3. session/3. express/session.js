const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

// 세션 설정
app.use(session({
    // 세션 데이터를 암호화하기 위한 키
    secret: 'my-secret-key',
    // 세션 데이터가 변경되지 않아도 다시 저장할지 여부
    resave: false,
    // 초기화되지 않은 세션을 저장소에 저장할지 여부
    saveUninitialized: true
}))

// 미들웨어를 사용해서 이 사람의 방문횟수 트래킹
app.use((req, res, next) => {
    req.session.visitCount = req.session.visitCount || 0;

    req.session.visitCount++;

    console.log('SessionID', req.sessionID);
    console.log('SessionInfo', req.session);
    next();
});


app.get('/', (req, res) => {
    console.log(req.session);
    res.send(`당신의 방문 횟수는 ${req.session.visitCount}입니다. 나는 너를 지켜보고 있다아`)
})

app.listen(port, () => {
    console.log(`서버 레디`)
})