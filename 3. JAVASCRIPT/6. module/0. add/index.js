// Nodejs의 기본 파일명이 index.js
// HTML의 기본 파일명 index.html
// Python의 기본 파일명 app.py

// 인덱스 모듈에서 add 모듈의 함수를 불러옴
const { add2, add3 } = require('./add');

let sum = add2(2,3);
console.log('결과 :', sum);

let sum1 = add2(2,3);
console.log('결과 :', sum1);
