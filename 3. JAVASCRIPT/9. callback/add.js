function add(a, b, callback) {
    const sum = a + b;
    callback(a, b, sum);
}

function displayResult(a, b, result) {
    // console.log('결과: ', result);
    console.log('Result: ', a, b, result);
}

res = add(2, 5, displayResult);