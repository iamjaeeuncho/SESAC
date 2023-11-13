const myPromise = new Promise((resolve, reject) => {
    
});

// Promise 호출/사용
myPromise
    .then((result) => {
        // 성공했을 때
    }) 
    .catch((error) => {
        // 실패했을 때
    })


function asyncTask(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            if (rand >= 0.5) {
                resolve('작업완료');
            } else {
                reject("작업실패");
            }
        }, 1000)
    })
}

asyncTask()
    .then((result) => {
        console.log('성공:', result)
    })
    .catch((error) => {
        console.log('실패:', error);
    })