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
