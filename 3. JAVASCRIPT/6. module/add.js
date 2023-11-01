function add2(a, b) {
    return a + b;
}

function add3(a, b, c) {
    return a + b + c;
}

// 다른 모듈에서 이 모듈을 사용하려면
module.exports = {
    add2,
    add3
}