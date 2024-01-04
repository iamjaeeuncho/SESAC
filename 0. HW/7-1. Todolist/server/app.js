const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, () => {
    console.log(`${port} 포트 서버 준비 완료`)
})