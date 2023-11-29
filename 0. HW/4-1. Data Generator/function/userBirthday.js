// 생년월일, 나이
export function birthdaygen() {
    let currentyear = new Date().getFullYear();
    let year = Math.floor(Math.random() * 30) + 1980;
    let month = Math.floor(Math.random() * 12) + 1;
    let age = currentyear - year

    if (month === 2) {
        let day = Math.floor(Math.random() * 28) + 1;
        return [`${year}-${month}-${day}`, `${age}`];
    } else if ([1,3,5,7,8,10,12].includes(month)) {
        let day = Math.floor(Math.random() * 31) + 1;
        return [`${year}-${month}-${day}`, `${age}`];
    } else if ([4,6,9,11].includes(month)) {
        let day = Math.floor(Math.random() * 30) + 1;
        return [`${year}-${month}-${day}`, `${age}`];
    }
}

// console.log(birthdaygen());