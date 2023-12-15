const express = require('express');
const nunjucks = require('nunjucks');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express()
const port = 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app,
})

app.get('/', (req, res) => {
    res.render('emailauth.html')
})

app.get('/api/sendemail', (req, res) => {
    const email = req.params.email;

    // 메일 서버 설정
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASS
        }
    })

    // 이메일 내용 정의
    let randomNumber = Math.floor(Math.random() * 10000000).toString();

    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: '할로할로',
        text: `인증코드: ${randomNumber}`
    };

    // 이메일 발송
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error)
        } else {
            console.log('이메일 전송 완료:' + info.response);
        }
    })

    res.json(randomNumber)
})

app.listen(port, () => {
    console.log(`${port}포트 서버 준비 완료`)
})