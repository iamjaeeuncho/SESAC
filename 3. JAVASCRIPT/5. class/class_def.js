// Class declaration = 객체 선언(정의)
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    drive() {
        return `${this.make} ${this.model} 이 운전중입니다`
    }

    stop() {
        return `${this.make} ${this.model} 이 멈췄습니다`
    }
}

const myCar = new Car('Kia', 'K3');
const yourCar = new Car('Tesla', 'Model3');

console.log(myCar.make);
console.log(myCar.drive());
console.log(yourCar.drive());