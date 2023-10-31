class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    // get 구문은 객체의 속성 접근 시 호출할 함수를 바인딩
    // 바인딩(binding)이란 프로그램에 사용된 구성 요소의 실제 값 또는 프로퍼티를 결정짓는 행위
    get diameter() {
        return this._radius * 2;
    }

    // set 구문은 객체의 속성에 할당을 시도할 때 호출할 함수를 바인딩
    set diameter(diameter) {
        this._radius = diameter / 2;
    }
}

const myCircle = new Circle(5);
console.log(myCircle.diameter);
myCircle.diameter = 50;
console.log(myCircle._radius);