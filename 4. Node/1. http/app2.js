const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<H1>Hello Node!</H1>');
    res.write('<H1>Hello Node!</H1>');
    res.write('<H1>Hello Node!</H1>');
    res.write('<H1>Hello Node!</H1>');
    res.write('<H1>Hello Node!</H1>');
    res.end('<P>Hello Server1 서버1</P>')
}).listen(8000, () => {console.log('8000번 포트 생성 완료')})

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<H1>Hello Node!</H1>');
    res.end('<P>Hello Server2</P>')
}).listen(8001, () => {console.log('8001번 포트 생성 완료')})

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<H1>Hello Node!</H1>');
    res.end('<P>Hello Server3</P>')
}).listen(8002, () => {console.log('8002번 포트 생성 완료')})