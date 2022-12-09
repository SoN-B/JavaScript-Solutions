/**
 * 인수로 주어지는 k를 받아 해당 배열 요소의 i < j 조건을 만족시키며 두 배열 요소 합이 k의 배수가 돼야 함.
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
 * Complete the 'divisibleSumPairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER_ARRAY ar
 */

function divisibleSumPairs(n, k, ar) {
    let result = 0;

    // i < j 조건을 지켜야함
    for (let i = 0; i < n - 1; i++) {
        // 0 ~ 4
        for (let j = i + 1; j < n; j++) {
            // 1 ~ 5
            if ((ar[i] + ar[j]) % k === 0) result++;
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const ar = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((arTemp) => parseInt(arTemp, 10));

    const result = divisibleSumPairs(n, k, ar);

    ws.write(result + "\n");

    ws.end();
}
