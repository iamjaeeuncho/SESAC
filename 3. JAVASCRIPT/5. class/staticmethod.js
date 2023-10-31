// 객체를 생성하지 않고 바로 안에 있는 함수를 실행하기 위해 static 함수를 사용한다

class MathOperation {
    static add(x, y) {
        return x + y
    }

    static subtract(x, y) {
        return x - y;
    }
}

console.log(MathOperation.add(5,3));
console.log(MathOperation.subtract(10,4));
