const request = require('request');
require('dotenv').config()

const client_id = process.env.NAVER_API_SESAC_ID;
const client_secret = process.env.NAVER_API_SESAC_SECRET;

const text = "반갑습니다"
const encText = encodeURIComponent(text);

console.log(text, encText)

const url = `https://openapi.naver.com/v1/search/blog.json?query=${encText}`

const headers = {
    'X-Naver-Client-Id':client_id,
    'X-Naver-Client-Secret': client_secret,
}

request.get({
    url: url,
    headers: headers,
}, (error, response, body) => {
    // 요청이 끝난 이후에 할 일
    if (error) {
        console.log('요청 실패')
    } else {
        const data = JSON.parse(body);
        console.log(data)
    }
})

console.log('끝')
