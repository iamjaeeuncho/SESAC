const Person = require('./calculator');

class EngineeringCal extends Calculator {
    log(a, b) {
        return '로그'
    }
}

module.exports = EngineeringCal;