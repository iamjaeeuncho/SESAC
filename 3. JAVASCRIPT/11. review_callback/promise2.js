// Promise로 변경
function asyncFunc1() {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log('함수1 완료');
            resolve('결과1');
        }, 1000);
    });
}

function asyncFunc2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('함수2 완료');
            resolve('결과2');
        }, 1000);
    });
}

// 콜백헬을 프로미스의 요청(콜)을 통해 해결
asyncFunc1()
    .then(response1 => asyncFunc2(response1))
    .then(response2 => asyncFunc2(response2))
    .then(response3 => asyncFunc2(response3))
    .then(response4 => {
        console.log('최종 결과: ', response4);
    })
    .catch(error => {
        console.error('에러 발생', error);
    })