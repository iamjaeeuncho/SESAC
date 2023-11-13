function externalAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = Math.random() >= 0.8;
            if (result) {
                resolve('결과 왔음')
            } else {
                reject('응답 없음')
            }
        }, 2000);
    })
}

async function waitForResult(retryCount = 0) {
    try {
        result = await externalAPI();
        console.log("결과도착:", result);
        return result;
    } catch (error) {
        console.error(`에러발생: ${error}, 재시도 ${retryCount}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                waitForResult(retryCount+1)
            }, 1000)
        })
    }
}

// redult = waitForResult();
// console.log("최종 비동기 결과: ", result);

waitForResult()
    .then((finalResult) => {
        console.log("최종 비동기 결과는", finalResult)
    })

console.log("실행 완료")