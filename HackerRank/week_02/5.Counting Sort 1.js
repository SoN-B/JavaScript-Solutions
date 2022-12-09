/**
 * 계수정렬 구현하는 문제 (SoNB Github's JavaScript-Algorithms : Counting Sort 참고)
 */

"use strict";

const fs = require("fs");

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
 * Complete the 'countingSort' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function countingSort(arr) {
    let count = [];

    for (let i = 0; i < 100; i++) {
        // 문제에선, 숫자의 범위가 0 ~ 99이다.
        count.push(0);
    }
    for (let i = 0; i < arr.length; i++) {
        // 숫자가 0부터 시작하기 때문에, 인덱스 맞춰줄 필요 없다.
        count[arr[i]]++;
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((arrTemp) => parseInt(arrTemp, 10));

    const result = countingSort(arr);

    ws.write(result.join(" ") + "\n");

    ws.end();
}
