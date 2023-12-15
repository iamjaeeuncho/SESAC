const request = require('request');
require('dotenv').config()

const client_id = process.env.NAVER_API_SESAC_ID;
const client_secret = process.env.NAVER_API_SESAC_SECRET;

const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
const query = "안녕하세요. 이 문장을 번역해주세요."

var options = {
    url: api_url,
    form: {'source':'ko', 'target':'en', 'text':query},
    headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
 };

request.post(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body);
        const result = JSON.parse(body);
        console.log('번역 결과:', result.message.result.translatedText);
    } else {
        console.log('error = ' + response.statusCode);
    }
});

console.log('끝')