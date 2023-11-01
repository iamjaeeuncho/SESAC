const Employee = require('./employee');
const Student = require('./student');
const Manager = require('./manager');

const employee1 = new Employee("영희", 20, "남성", "매니저", "500");
const student1 = new Student("하늘", 32, "여성", "차장", "1000");
const manager1 = new Manager("재은", 33, "여성", "사장", "5000");

employee1.greet();
student1.greet();
manager1.greet();