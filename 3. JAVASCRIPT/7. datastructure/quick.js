const array = [64, 25, 12, 22, 11];

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    } else {
        const pivot = arr[arr.length - 1];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return [...quickSort(left), pivot, ...quickSort(right)];
    }
    return arr;
}


console.log('정렬전: ', array);
console.timeEnd('quickSort');
const sortedArray = quickSort(array);
console.timeEnd('quickSort');
console.log('정렬후: ', sortedArray);