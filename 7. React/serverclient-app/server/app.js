const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(morgan('dev'))

// 모든 출처에 대한 허용 but 보안적으로는 좋지 않지만 쉬움
// app.use(cors())
const corsOptions = {
    origin: [
            'http://127.0.0.1:3000',       // 허용할 클라이언트 주소
            'http://localhost:3000'
    ],
    // optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//     next();
// })

const data = [
    {id: 1, name: 'Itme 1'},
    {id: 2, name: 'Itme 2'},
    {id: 3, name: 'Itme 3'},
]

app.get('/api/data', (req, res) => {
    // res.json({ message: 'Hello From Express Server'})
    res.json(data)
})

app.listen(port, () => {
    console.log(`${port} 포트 서버 준비 완료`)
})