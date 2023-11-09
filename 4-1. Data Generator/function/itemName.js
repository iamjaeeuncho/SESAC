// 아이템 이름, 타입 생성
export function itemgen() {
    let items = {
        'Americano Coffee' : 3000,
        'Espresso Coffee' : 4000,
        'Vanilla Coffee' : 5000,
        'Mocha Coffee' : 6000,
        'Watermelon Juice' : 7000,
        'Strawberry Juice' : 7000,
        'Grape Juice' : 7000,
        'Apple Juice' : 7000,
        'Carrot Cake' : 6000,
        'Red Velvet Cake' : 6500,
        'Butter Cake' : 5000,
        'Cheese Cake' : 5500
    }
    
    let itemKey = Object.keys(items);
    let item = itemKey[Math.floor(Math.random() * itemKey.length)];
    let type = item.split(" ");
    let price = items[item];
    return ` ${item}, ${type[1]}, ${price}`; 
}

// console.log(itemgen());