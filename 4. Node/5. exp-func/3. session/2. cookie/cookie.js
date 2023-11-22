const http = require('http');

const server = http.createServer((req, res) => {
    // 요청 안의 정보 출력
    console.log(req.url, req.headers.cookie);
    // 응답의 헤더정보 (resp code, message)
    res.writeHead(200, {'set-cookie': 'mycookie-test'})
    // 응답의 바디를 보낸 것
    res.end('DONE')
})

server.listen(3000, () => {
    console.log('서버가 대기중')
})