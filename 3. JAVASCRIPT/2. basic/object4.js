let car = { make: "Kia", model: "K3" }

console.log(car.make);
console.log(car.model);

console.log("make" in car);
console.log("year" in car);

function Car(make, model) {
    this.make = make;
    this.model = model;
}

let myCar = new Car("Kia", "K3");
console.log(myCar);
console.log(myCar.make);
console.log(myCar.model);

let Car1 = new Car("Kia", "K3");
let Car2 = new Car("Kia", "스포티지");
let Car3 = new Car("Kia", "셀토스");
let Car4 = new Car("Tesla", "테슬라");