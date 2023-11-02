// 검색함수 구현, 검색된 위치의 index를 출력

let numbers = [4, 2, 7, 1, 9, 5];

function search_numbers(numbers, num) {
    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers.indexOf(num)) {
            // console.log(numbers.indexOf(num));
            result = numbers.indexOf(num);
        }
    }
    if (result === -1) {
        return '없는 번호입니다';
    } else {
        return result;
    }
}

let result = search_numbers(numbers, 2);
console.log('인덱스 번호:', result);


// 선생님 답
// const array = [64, 25, 12, 22, 11];
const array = Array.from({length: 100}, () => Math.floor(Math.random() * 100));

function selectionSort(arr) {
    const length = arr.length;

    for (let i = 0; i < length - 1; i++){
        let minIndex = i;

        // i부터 배열의 끝까지 최소값을 찾음
        for (let j = i + 1; j < length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

        // 최소값을 현재 위치로 교환
        if (minIndex !== i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
            }
        }
    }
    return arr;
}

console.log('정렬전: ', array);
console.timeEnd('selectionSort');
const sortedArray = selectionSort(array);
console.timeEnd('selectionSort');
console.log('정렬후: ', sortedArray);
