/**
 * A, B의 정수형 배열을 입력받아, 각각 자신의 요소들을 랜덤 배치한 치환된 배열로 바꿨을 때, A'[i] + B'[i] >= k 가 모두 성립되는 경우를 찾는 문제
 * 어떤 것으로 치환될지는 랜덤이라서 전혀 모릅니다. 단 A, B의 값들을 서로 바꿀 수는 없습니다.
 *
 * 즉 n = 3일 경우
 *  A'[0] + B'[0] >= k
 *  A'[1] + B'[1] >= k
 *  A'[2] + B'[2] >= k 모두 성립해야 합니다.
 * 이런 경우가 한 가지만이라도 있다면 YES 출력합니다.
 *
 * 단순히, 생각했을 때, 모든 경우의 순열을 구하여 각각의 요소들을 비교할 수 있지만 그랬을 경우 시간 초과가 될 수 있습니다.
 * 따라서, A는 오름차순정렬, B는 내림차순 정렬을 통해 첫 요소들부터의 합이 k보다 크거나 같은지만 보면 됩니다.
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
 * Complete the 'twoArrays' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY A
 *  3. INTEGER_ARRAY B
 */

function twoArrays(k, A, B) {
    A.sort(function (a, b) {
        return a - b;
    });
    B.sort(function (a, b) {
        return a - b;
    });
    B.reverse();

    var flag = true;
    for (var i = 0; i < A.length; i++) {
        if (A[i] + B[i] < k) {
            // 이 경우의 수에서만 보면 되므로, 조건이 만족하지 않을 경우 false
            flag = false;
        }
    }
    if (flag == true) {
        return "YES";
    } else {
        return "NO";
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

        const n = parseInt(firstMultipleInput[0], 10);

        const k = parseInt(firstMultipleInput[1], 10);

        const A = readLine()
            .replace(/\s+$/g, "")
            .split(" ")
            .map((ATemp) => parseInt(ATemp, 10));

        const B = readLine()
            .replace(/\s+$/g, "")
            .split(" ")
            .map((BTemp) => parseInt(BTemp, 10));

        const result = twoArrays(k, A, B);

        ws.write(result + "\n");
    }

    ws.end();
}
