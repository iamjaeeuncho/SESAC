function performAsyncTask(callback) {
    setTimeout(() => {
        const randomNumber = Math.random();
        if (randomNumber >= 0.5) {
            callback(null, '작업이 완료되었습니다')
        } else {
            callback('작업실패', null);
        }
    }, 2000);
}

function myJob() {
    performAsyncTask((error, result) => {
        if (error) {
            console.error('실패', error);
        } else {
            console.log('성공', result);
        }
    })
}

for (let i = 0; i < 10; i++) {
    myJob();
}