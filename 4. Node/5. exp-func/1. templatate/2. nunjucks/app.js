const express = require('express');
const app = express();

const nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// app.set('view engine', 'njk')
app.set('view engine', 'html')
// app.set('view', __dirname + '/this_is_my_new_directory'); // 경로 이동 가능

app.get('/', (req, res) => {
    res.render('index', { title: 'nunjucks 앱', message: `헤딩1 본문`})
});

// 라우트 추가
app.get('/', (req, res) => {
    // 뷰 엔진 (템플릿 엔진)을 통해서 렌더링을 해주어야 함
    // 렌더링(rendering) = 컨텐츠를 삽입/변경하는 과정
    res.render('index', {title: 'Express앱', message: 'EJS 처음 사용'})

    // res.json('제이슨 결과 주거나')
    // res.send('컨텐츠 주거나')
    // res.sendFile('파일 읽어주거나')
})

app.get('/greeting', (req, res) => {
    const username = '조재박'

    res.render('greeting', { username: username});
    // greeting.ejs를 만들고 안녕하세여 ***님
})

app.get('/welcome', (req, res) => {
    const isAdmin = true;
    res.render('welcome', { isAdmin: isAdmin});
})

app.get('/fruits', (req, res) => {
    const fruits = ['Apple', 'Banana', 'Orange', 'Grapes'];
    res.render('fruits', { fruits: fruits })
})

app.get('/page', (req, res) => {
    const data = {
        title: '마이 페이지',
        content: '본문에 들어갈 내용을 작성하시오'
    };
    res.render('main', data)
})

const port = 3000;
app.listen(port, () => {
    console.log(`서버가 ${port}에서 대기 중`)
})