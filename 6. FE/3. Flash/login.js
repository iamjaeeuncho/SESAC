const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const nunjucks = require('nunjucks');

const app = express();
const port = 3000;

// nunjucks 초기화
nunjucks.configure('views', {
    express: app
})

app.set('view engine', 'html');

// 세션 설정
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}))

// Flash 미들웨어 설정
app.use(flash());

// 바디 파서 미들웨어 추가
app.use(express.urlencoded({ extended: true }));

// curl -X POST 127.0.0.1:3000/login -d username=user -d password=pass 
// curl -X POST 127.0.0.1:3000/login -d username=user -d password=pass --cookie-jar cookie.txt
// curl -X POST 127.0.0.1:3000 --cookie cookie.txt
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 메세지 담기
    if (username === 'user' && password === 'pass') {
        req.flash('message', [
            { type: 'success', text: '로그인 성공' },
            { type: 'info', text: '신규 버전 출시' },
            { type: 'warning', text: '구 버전 한달 후 삭제' }
        ]);
    } else {
        req.flash('error', 'Login Failed')
    }

    const successMessage = req.flash('message');
    const errorMessage = req.flash('error');
    // req.flash('info', 'Welcome to my homepage');
    // res.redirect('/');
    // res.redirect('/login');
    res.render('login', { successMessage, errorMessage })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/', (req, res) => {
    const successMessage = req.flash('success');
    const errorMessage = req.flash('error');

    // 메세지 가져오기
    res.json({ successMessage, errorMessage })
})

app.listen(port, () => {
    console.log('서버 레디')
})
