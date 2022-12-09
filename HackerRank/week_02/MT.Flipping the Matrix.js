/**
 * 2n * 2n의 행렬을 입력받아 좌측 상단 1사분면에 서로 다른 위치들의 최댓값들을 찾아, 행과 열을 뒤집어가며 삽입하여 최댓값들의 합을 구하는 문제
 * 그냥 뿔뿔이 흩어져 있는 서로 다른 위치들에 존재하는 최댓값들을 모두 더해주기만 하면 됩니다.
 *
 * 행렬의 크기는 최대 256 * 256
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
 * Complete the 'flippingMatrix' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */

function flippingMatrix(matrix) {
    let subMatrix = []; // 최댓값을 저장해줄 추가적인 1사분면의 역할
    let sum = 0;

    // if matrix.length -> 6이라면, 6 x 6 행렬을 뜻함
    // 대충 값이 matrix[1] = { ?, ?, ?, ?, ?, ? }
    //         matrix[2] = { ?, ?, ?, ?, ?, ? }
    //         matrix[3] = { ?, ?, ?, ?, ?, ? }
    //         . . .
    //         matrix[5] = { ?, ?, ?, ?, ?, ? }
    // 이런 식으로 들어옵니다.

    // 0 1 2
    for (let y = 0; y < matrix.length / 2; y++) {
        subMatrix.push(Array(matrix.length / 2).fill(0));
        // 좌측 상단의 숫자들만 보는 것이니 전체 9 * 4(사분면 개수) = 36개 중 최댓값이 들어갈 9개만 봅니다.
        // 0 0 0 (첫 번째 수행 시 생성)
        // 0 0 0 (두 번째 수행 시 생성)
        // 0 0 0 (세 번째 //)

        // 0 1 2, 2n * 2n이니 -> matrix.length / 2
        for (let x = 0; x < matrix.length / 2; x++) {
            // 1사분면의 최댓값 찾기
            if (matrix[y][x] > subMatrix[y][x]) {
                subMatrix[y][x] = matrix[y][x];
            }

            // 2사분면 ~
            if (matrix[y][matrix.length - 1 - x] > subMatrix[y][x]) {
                subMatrix[y][x] = matrix[y][matrix.length - 1 - x];
            }

            // 3사분면 ~
            if (matrix[matrix.length - 1 - y][x] > subMatrix[y][x]) {
                subMatrix[y][x] = matrix[matrix.length - 1 - y][x];
            }

            // 4사분면 ~
            if (matrix[matrix.length - 1 - y][matrix.length - 1 - x] > subMatrix[y][x]) {
                subMatrix[y][x] = matrix[matrix.length - 1 - y][matrix.length - 1 - x];
            }

            sum += subMatrix[y][x];
            // ! 0 0 -> 첫 번째 수행 시 (! 자리에 최댓값 존재)
            // 0 0 0
            // 0 0 0
        }
    }

    return sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);

        let matrix = Array(2 * n); // n = 2, Array(4)

        for (let i = 0; i < 2 * n; i++) {
            // i = 0 ~ 3
            matrix[i] = readLine()
                .replace(/\s+$/g, "")
                .split(" ")
                .map((matrixTemp) => parseInt(matrixTemp, 10));
        }

        const result = flippingMatrix(matrix);

        ws.write(result + "\n");
    }

    ws.end();
}

// https://www.hackerrank.com/challenges/flipping-the-matrix/forum/comments/1160360 그림참고
