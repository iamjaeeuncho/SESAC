const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = 3000;

nunjucks.configure('views', { express: app });
app.set('view engine', 'html');

app.get('/page', (req, res) => {
    const data = {
        title: '마이 페이지',
        content: '본문에 들어갈 내용을 작성하시오'
    };
    res.render('page', data)
})

app.listen(port, () => {
     console.log(`서버 ${port} 레디`)
})