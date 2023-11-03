function sub(a, b, callback) {
    const sum = a - b;
    callback(a, b, sum);
}

function showResult(a, b, result) {
    console.log('Result: ', a, b, result);
}

res = sub(8, 9, showResult);