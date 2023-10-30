let score = 30;

console.log("------ if -----");
if (score > 90) {
    console.log('A');
} else if (score >= 80) {
    console.log('B');
} else if (score >= 70) {
    console.log("C");
} else {
    console.log('F');
}

// -----------------------------
console.log("------switch-----");

switch (score) {                // 조건에 따라 점프
    case 90:
        console.log("A");
        console.log("AA");
        break;
        console.log("AAA");
    case 80:
        console.log("B");
        break;
    case 70:
        console.log("C");
        break;
}