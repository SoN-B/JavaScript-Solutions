/**
 * 정사각형의 행렬(2차원 배열)이 입력으로 주어져, 서로 다른 대각선의 합 사이의 절대 차이를 계산합니다.
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
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr) {
    let left_to_right = 0,
        right_to_left = 0;

    for (let x = 0; x < arr.length; x++) {
        left_to_right += arr[x][x]; // arr[0][0], arr[1][1], arr[2][2], ...
        right_to_left += arr[x][arr.length - 1 - x]; // arr[0][3], arr[1][2], arr[2][2], ...
    }

    return Math.abs(left_to_right - right_to_left); // 절댓값 구하는 함수
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine()
            .replace(/\s+$/g, "")
            .split(" ")
            .map((arrTemp) => parseInt(arrTemp, 10));
    }

    const result = diagonalDifference(arr);

    ws.write(result + "\n");

    ws.end();
}
