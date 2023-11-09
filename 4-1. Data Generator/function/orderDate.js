export function orderdate() {
    let year = Math.floor(Math.random() * 1) + 2023;
    let month = Math.floor(Math.random() * 12) + 1;
    let hour = Math.floor(Math.random() * 24);
    let minute = Math.floor(Math.random() * 60);
    let second = Math.floor(Math.random() * 60);

    if (month === 2) {
        let day = Math.floor(Math.random() * 28) + 1;
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else if ([1,3,5,7,8,10,12].includes(month)) {
        let day = Math.floor(Math.random() * 31) + 1;
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else if ([4,6,9,11].includes(month)) {
        let day = Math.floor(Math.random() * 30) + 1;
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
}

// console.log(orderdate());

