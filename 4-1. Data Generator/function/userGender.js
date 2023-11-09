// 성별
export function gendergen() {
    let gender = Math.floor(Math.random() * 2);
    return gender < 0.5 ? "남자" : "여자";
}

// console.log(gendergen());