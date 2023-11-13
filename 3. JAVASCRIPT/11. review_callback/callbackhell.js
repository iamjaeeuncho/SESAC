function asyncFunc1(response, callback) {
    setTimeout(() => {
        console.log('함수1 완료');
        callback('결과1');
    }, 1000);
}

function asyncFunc2(response, callback) {
    setTimeout(() => {
        console.log('함수2 완료');
        callback(결과2);
    }, 1000)
}


// 콜백 헬. 동작에는 문제가 없지만 코드가 이쁘지 않음
asyncFunc1(null, function(response1) {
    asyncFunc2(response1, function(response2) {
        asyncFunc1(response2, function(response3) {
            asyncFunc2(response3, function(response4) {
                console.log('최종결과:', response4);
            })
        })
    })
})