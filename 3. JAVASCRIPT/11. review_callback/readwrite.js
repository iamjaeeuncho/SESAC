function asyncTask(callback) {
    setTimeout(() => {
        const rand = Math.random();
        if (rand >= 0.5) {
            callback(null, '작업완료');
        } else {
            callback("작업실패", null);
        }
    }, 1000)
}

console.log('비동기 호출전');

asyncTask((err, res) => {
    if (err) {
        console.log("실패:", err);
    } else {
        console.log("성공:", res);
    }
});

console.log('비동기 호출후')