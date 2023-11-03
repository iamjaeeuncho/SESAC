const url = require('url');

const myUrl = 'https://www.example.com/path?query=value'

// URL 파싱
const parsedUrl = url.parse(myUrl, true);
console.log('파싱된 URL', parsedUrl);
console.log('호스트', parsedUrl.host);
console.log('경로', parsedUrl.pathname);
console.log('쿼리', parsedUrl.query);

const myUrl2 = {
    protocol: 'https',
    hostname: 'www.naver.com',
    pathname: '/search.naver',
    query: {
        query: '새싹'
    }
};

// URL 조립
const assembledUrl = url.format(myUrl2);
console.log('조립된 URL', assembledUrl);
