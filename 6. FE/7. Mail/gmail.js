const nodemailer = require('nodemailer');
require('dotenv').config();

// 메일 서버 설정
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
    }
})

// 이메일 내용 정의
const mailOptions = {
    from: process.env.GMAIL_ID,
    to: process.env.GMAIL_ID,
    subject: '할로할로',
    text: '안녕하세요 이것은 지메일로 보내는 테스트 메일이에오'
};

// 이메일 발송
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error)
    } else {
        console.log('이메일 전송 완료:' + info.response);
    }
})
