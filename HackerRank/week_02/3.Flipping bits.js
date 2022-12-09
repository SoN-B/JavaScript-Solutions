/**
 * 32비트, 즉 4바이트인 부호 없는 정수 int를 입력받아 각 비트를 뒤집어 출력하는 문제
 * 10진수 숫자 q 개를 입력받아, 함수에서 값을 도출해낸다.
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
 * Complete the 'flippingBits' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER n as parameter.
 */

function flippingBits(n) {
    return ~n >>> 0;
    // ~ (부정 논리 연산자) : 각 비트들의 값을 뒤집어 버립니다.
    // >>> (부호 없는 쉬프트) : 맨 왼쪽 비트(부호 비트)의 의미를 상쇄시키고, 오른쪽으로 쉬프트 될 경우 왼쪽에 0이 붙습니다.

    // 참고) https://jam-ws.tistory.com/19
    // JS는 비트 단위 연산을 할 경우에 32비트 int를 기준으로 연산을 한다.
    // 2147483647 -> 1111111111111111111111111111111 (31개) 여기서, ~ 연산자를 쓰면
    // 32비트 기준 비트가 전부 뒤집어져 버리기 때문에, 없던 0이 1이 되면서 - > 10000000000000000000000000000000 (32개)가 됩니다.
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);

        const result = flippingBits(n);

        ws.write(result + "\n");
    }

    ws.end();
}
