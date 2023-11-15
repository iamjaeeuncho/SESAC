// Node.js에 기본 내장되어 있는 http 모듈을 로드
const http = require('http');

// http 모듈의 createServer 메소드를 호출하여 HTTP 서버 생성
const server = http.createServer();

// server 객체에 이벤트 연결
// 이벤트 핸들러를 등록하여 서버에 HTTP 요청이 있을 때마다 메시지를 콘솔에 출력
server.on('request', function() {
    console.log('요청이 왔습니다')
})

// 서버에 클라이언트가 연결되면 메시지를 콘솔에 출력
server.on('connection', function() {
    console.log('연결되었습니다')
})

// 서버가 종료되면 메시지를 콘솔에 출력
server.on('close', function() {
    console.log('연결이 종료되었습니다')
})


console.log('The Start')
// 서버를 특정 포트(로컬 3000번 포트)에서 대기하도록 하는 메서드
server.listen(3000);          
console.log('The End')