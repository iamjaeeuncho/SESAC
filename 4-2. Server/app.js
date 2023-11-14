const http = require('http');
const fs = require('fs').promises;

const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;

// 서버의 개체 생성
const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);
    
    try {
        if (req.method === 'GET') {
            if (req.url === '/') {
                const data = await fs.readFile('./index.html')
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(data)
            } else if (req.url === '/about') {
                const data = await fs.readFile('./about.html')
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(data)
            } else if (req.url.startsWith('/images/')) {
                // URL 파싱해서 파일 불러와서 이미지 반환
                const data = await fs.readFile(`.${req.url}`);
                res.writeHead(SUCCESS, {'Content-Type': 'image/jpg'});
                console.log(data)
                res.end(data);
            } else if (req.url.startsWith('/static/')) {
                // URL 파싱해서 확장자 불러와서 Content-type 찾아서 파일 불러오기
                const fileName = req.url.substring('/static/'.length);
                const filePath = `./static/${fileName}`;

                const data = await fs.readFile(filePath);
                const contentType = getImageContentType(fileName);

                res.writeHead(SUCCESS, {'Content-Type': contentType});
                res.end(data);
            } else {
                res.writeHead(NOT_FOUND,  {'Content-Type': 'text/plain; charset=utf-8'});
                res.end('NOT FOUND 없어')
            }
        } else if (req.method === 'POST') {
            // 요청을 생성할 때
            res.writeHead(201);
            res.end('등록 성공');
        } else if (req.method === 'PUT') {
            // 요청을 수정할 때
            res.end('수정 성공')
        } else if (req.method === 'DELETE') {
            // 요청을 삭제할 때
            res.end('삭제 성공')
        }
    } catch(err) {
        // console.error(err);
        console.error('오류발생', err.message)
        res.writeHead(SERVER_ERROR, {'Content-Type': 'text/plain; charset=utf-8'})
        res.end('서버 오류')
    }
});

function getImageContentType(imageName) {
    const extension = imageName.split('.').pop().toLowerCase();
    if (extension === 'jpg' || extension === 'jpeg') {
        return 'image/jpeg';
    } else if (extension === 'png') {
        return 'image/png';
    } else if (extension === 'gif') {
        return 'image/gif';
    } else if (extension === 'css') {
        return 'text/css'
    } else if (extension === 'js') {
        return 'text/javascript'
    } else {
        return 'application/octet-stream';
    }
}

// 서버의 포트 정리
const port = 3000;
server.listen(port, () => {
    console.log(`${port}번 포트 열려있음`)
})