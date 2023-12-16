const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;
let randomNumber = Math.floor(Math.random() * 10000000).toString();

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'emailauth.html'));
});

app.get('/api/sendEmail', (req, res) => {
    const email = req.query.email;

    // 메일 서버 설정
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASS
        }
    });
    
    // 이메일 내용 정의

    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: '할로할로',
        text: `인증코드: ${randomNumber}`
    };

    // 이메일 발송
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('이메일 전송 완료:' + info.response);
            res.redirect('/emailauthafter.html');
        }
    });
});

app.get('/api/authNum', (req, res) => {
    const auth = parseInt(req.query.auth);
    randomNumber = parseInt(randomNumber);
    
    if (auth === randomNumber) {
        console.log('같음')
        res.json('회원가입이 완료되었습니다');
    } else {
        console.log('다름')
        res.json('인증코드가 일치하지 않습니다');
    }
})


app.listen(port, () => {
    console.log(`${port}포트 서버 준비 완료`);
});
