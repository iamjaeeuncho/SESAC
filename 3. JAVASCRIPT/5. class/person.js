class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet() {
        console.log(`안녕 나는 ${this.name}이고, ${this.age}살이야`);
    }

    walk() {
        console.log(`${this.name}이가 걷고 있습니다`)
    }

    eat() {
        console.log(`${this.name}이가 식사 중 입니다`)
    }
}

class Employee extends Person {
    constructor(name, age, gender, jobtitle, salary) {
        super(name, age, gender);
        this.jobtitle = jobtitle;
        this.salary = salary;
    }

    displayInfo() {
        console.log(`직원 ${this.name}의 직위는 ${this.jobtitle}이며, 급여는 ${this.salary}원 입니다`);
    }

    work() {
        console.log(`${this.name}이가 업무 중입니다.`);
    }
}

const person1 = new Person("철수", 25, "남성");
person1.greet();
person1.walk();
person1.eat();
