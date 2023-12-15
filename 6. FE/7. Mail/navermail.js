const nodemailer = require('nodemailer');
require('dotenv').config();

// 네이버 메일 서버 설정
const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    auth: {
        user: process.env.NAVER_ID,
        pass: process.env.NAVER_PASS
    }
})

// 이메일 내용 정의
const mailOptions = {
    from: process.env.NAVER_ID,
    to: process.env.NAVER_ID,
    subject: '할로할로',
    text: '안녕하세요 이것은 네이버 메일로 보내는 테스트 메일이에오'
};

// 이메일 발송
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error)
    } else {
        console.log('이메일 전송 완료:' + info.response);
    }
})
