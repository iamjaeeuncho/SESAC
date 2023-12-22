const express = require('express');
const expressWs = require('express-ws');
const WebSocket = require('ws')
const path = require('path');

const port = 3000;
const app = express();
expressWs(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client3.html'))
})

// 접속자 정보를 저장하기 위한 자료 구조
const wsClients = new Map();

// 웹소켓 핸들링 코드
app.ws('/chat', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log('클라이언트가 접속하였습니다: ', clientIp);

    // 연결된 이후 내부 메세지 처리 부분
    ws.on('message', (message) => {
        // 받은 메세지는 네트워크 바이트 스트림 형태 (소켓 버퍼 타입)
        console.log(message); // 글자
        console.log(message.toString()); // 글자

        let parsedMessage = ""
        let messageType;
        let username;

        // 받은 문자열을 파싱해서 객체 형태로 만듬
        try {
            parsedMessage = JSON.parse(message);
            messageType = parsedMessage.type;
            username = parsedMessage.username;

            console.log(parsedMessage)  // 객체
            console.log(clientIp, parsedMessage.username)
        } catch (error) {
            console.error("Invalid JSON Format: ", error)
            return;
        }
        
        // 세션ID, 유저네임,을 한번도 저장한 적이 없을 경우 저장하기
        if (username && !wsClients.has(username)) {
            wsClients.set(username, ws);
            return;
        }

        console.log(`${username}으로부터 메세지 받음`)

        if (messageType !== 'session') {
            wsClients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    const messageType = client === ws ? 'sent' : 'received'
                    const messageObj = { type: messageType, sender: username, content: parsedMessage.content}
    
                    client.send(JSON.stringify(messageObj))
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`익스프레스 서버랑 웹소켓 ${port} 포트에 준비 완료`)
})