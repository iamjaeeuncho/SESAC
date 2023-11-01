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

const person1 = new Person("철수", 25, "남성");
person1.greet();
person1.walk();
person1.eat();



class Employee extends Person {
    constructor(name, age, gender, jobtitle, salary) {
        super(name, age, gender);
        this.jobtitle = jobtitle;
        this.salary = salary;
    }

    displayInfo() {
        console.log(`${this.name}의 직위는 ${this.jobtitle}이며, 급여는 ${this.salary}원 입니다`);
    }

    work() {
        console.log(`${this.name}이가 업무 중입니다.`);
    }

    greet() {
        console.log(`안녕하세요 저는 ${this.name} 이고, 직위는 ${this.jobtitle} 입니다`)
    }
}

const employee1 = new Employee("영희", 30, "여성", "매니저", 500000);
employee1.greet();
employee1.displayInfo();
employee1.walk();
employee1.work();


class Manager extends Employee {
    constructor(name, age, gender, jobtitle, salary, team) {
        super(name, age, gender, jobtitle, salary);
        this.team = team;
    }

    assignTasks() {
        console.log(`${this.name} 매니저가 ${this.team}에 업무를 배분하고 있습니다.`);
    }
}

const manager1 = new Manager("영민", 35, "남성", "팀장", 600000, "개발팀");
manager1.assignTasks();


class Student extends Person {
    constructor(name, age, gender, birthday, major) {
        super(name, age, gender);
        this.birthday = birthday;
        this.major = major;
    }

    study() {
        console.log(`${this.name} 학생이 ${this.major}을 공부하고 있습니다.`)
    }
}

const student1 = new Student("지연", 20, "여성", "2023001", "컴퓨터공학");
student1.study();


class Customer extends Person {
    constructor(name, age, gender, cnum, order) {
        super(name, age, gender);
        this.cnum = cnum;
        this.order = order;
    }
    
    placeOrder() {
        console.log(`${this.name} 고객이 ${this.order}을 완료했습니다.`)
    }
}

const customer1 = new Customer("태식", 30, "남성", "C1001", ["주문1", "주문2"]);
customer1.placeOrder();




// 함수에서 다형성 활용
// 하나의 객체가 여러가지 타입을 가질 수 있는 것 = 하나의 타입에 여러 객체를 대입할 수 있는 성질
function introduce(people){
    // for (const person of people) {
    //     person.greet()
    // }
    for (let i = 0; i < people.lenght; i++){
        people[1].greet();
    }
}

const employee2 = new Employee("영희", "매니저");
const student2 = new Student("철수", "컴퓨터 공학");
const people = [manager1, student1, customer1, employee2, student2];

console.log('----------');
introduce(people);