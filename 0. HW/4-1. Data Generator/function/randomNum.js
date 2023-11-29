export function randomNum(originData) {
    let num = Math.floor(Math.random() * originData.length);
  
    if (num === 0) {
        return originData[num + 1][1];
    } else {
        return originData[num][1];
    }
}