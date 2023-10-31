// class expression

const Car = class {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    drive() {
        return `${this.make} ${this.model} is driving.`
    }
}

const myCar = new Car('Tesla', 'Model 3');
console.log(myCar.drive());