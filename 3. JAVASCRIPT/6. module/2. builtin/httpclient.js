const http = require('http');

// 요청하고 싶은 주소 정의
const options = {
    hostname: 'www.example.com',
    port: 80,
    path: '/',
    method: 'GET'
}

const req = http.request(options, (res) => {
    console.log(`상태 코드: ${res.statusCode}`);
    res.on('data', (chuck) => {
        console.log(`데이터 수신: ${chuck}`);
    })
});

req.on('error', (error) => {
    console.error(`요청 중 오류 발생: ${error}`);
});

req.end();