/**
 * 양수 5개의 정수가 주어져, 그중 4개의 총합 min, max를 구하는 문제
 * min, max 순으로 출력
 */

"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on("end", function () {
    inputString = inputString.split("\n");

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
    arr.sort(function (a, b) {
        return a - b;
    });

    let sum_min = 0;
    let sum_max = 0;

    for (let i = 1; i <= 4; i++) {
        sum_max += arr[i];
    }
    for (let i = 3; i >= 0; i--) {
        sum_min += arr[i];
    }

    console.log(sum_min, sum_max);

    // let sum = arr.reduce((a, b) => a + b);
    // let maxVal = Math.max(...arr);
    // let minVal = Math.min(...arr);
    // console.log((sum - maxVal) + ' ' + (sum - minVal));
}

function main() {
    const arr = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((arrTemp) => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
