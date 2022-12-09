/**
 * 입력으로 주어지는 배열 속 한 쌍의 숫자들 중, 단 한 개만 존재하는 수를 찾는 문제.
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
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function lonelyinteger(a) {
    // 수 정렬 -> 0, 0, 1, 1, 2, 3, 3
    a.sort(function (a, b) {
        return a - b;
    });

    // 수를 2개씩 나눠 생각해 볼 수 있는데, 해당 인덱스와 다음 인덱스 수를 비교하여 다를 때, 그 수를 결과값으로 출력하면 된다.
    // 따라서 증감식은 x += 2
    for (let x = 0; x < a.length; x += 2) {
        if (a[x] !== a[x + 1]) return a[x];
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const a = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((aTemp) => parseInt(aTemp, 10));

    const result = lonelyinteger(a);

    ws.write(result + "\n");

    ws.end();
}
