// Node.js의 http 모듈 가져옴
const http = require('http');

// 클라이언트로부터의 요청(req)과 서버로의 응답(res)을 다루는 HTTP 서버를 생성
// 요청과 응답은 콜백 함수로 처리

const server = http.createServer((req, res) => {
    // 헤더
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    // 본문
    res.write('<H1>나의 첫번째 WAS서버</H1>')
    res.end('<P>안녕하세요</P>')
})

server.listen(3000, () => {
    console.log('서버가 3000번 포트에 잘 열려있습니다. 서버가 준비되었습니다.');
});