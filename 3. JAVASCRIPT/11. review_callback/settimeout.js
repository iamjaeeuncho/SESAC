function sayHello() {
    console.log('지연콜백함수');
}

console.log('지연시작');
setTimeout(sayHello, 1000);
console.log('지연종료');