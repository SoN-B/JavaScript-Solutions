/**
 * arr과 brr을 비교하여 brr에는 있지만 arr에는 없는 숫자(Missing Numbers)를 배열로 나타내는 문제.
 * arr의 요소가 여러분 누락되더라도 누락된 번호는 한 번만 포함하세요
 * 
 * 입력요소 조건중)
 * max(brr) - min(brr) <= 100
 */
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'missingNumbers' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER_ARRAY brr
 */

function missingNumbers(arr, brr) {
    arr.sort((a, b) => { return a - b });
    brr.sort((a, b) => { return a - b });

    let i = 0, j = 0, result = [];
    while(i < arr.length) {
        if(arr[i] !== brr[j] && arr[i] > brr[j]) {
            result.push(brr[j]);
            j++;
        } else if (arr[i] !== brr[j] && arr[i] < brr[j]) { // 다르고, brr이 더 큰경우
            result.push(arr[i]);
            i++;
        } else { // 두 요소가 같은경우
            i++;
            j++;
        }
    }
    
    while(j < brr.length) { // b의 남은요소 삽입
        result.push(brr[j]);
        j++;
    }
    
    let set = new Set(result); // 여러번 출력 금지
    result = [...set];
    
    return result;
}

// const missingNumbers = (a, b) => {
//     const min = Math.min(...b)
//     const dif = Array(100).fill(0) - 공간 하나
//     const res = []
    
//     for (let n of a) dif[n - min]--
//     for (let n of b) dif[n - min]++
    
//     for (let i in dif)
//         if (dif[i]) res.push(+i + min)
    
//     return res
// }

// function missingNumbers(arr, brr) {
//     let obj = {}, obj1 = {};
//     for(let i=0;i<arr.length;i++){
//       (obj[arr[i]]) ? (obj[arr[i]]++) : obj[arr[i]] = 1
//     }
//     for(let i=0;i<brr.length;i++){
//       (obj1[brr[i]]) ? (obj1[brr[i]]++) : obj1[brr[i]] = 1
//     }

//     console.log(obj); // { 203: 2, 204: 2, 205: 2, 206: 2, 207: 1, 208: 1 } 
//     console.log(obj1); // { 203: 2, 204: 3, 205: 3, 206: 3, 207: 1, 208: 1 }

//     let getVal = [];
//     for(let i in obj1) {
//         if(obj[i] !== obj1[i]) {
//             getVal.push(i);
//         }
//     }
//     return getVal
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const m = parseInt(readLine().trim(), 10);

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    let start = new Date();
    const result = missingNumbers(arr, brr);
    let end = new Date();

    console.log(end - start);
    ws.write(result.join(' ') + '\n');

    ws.end();
}
