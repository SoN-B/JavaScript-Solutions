/**
 * 일부 SOS 메시지의 문자는 전송 중 우주선에 의해 변경됩니다.
 * 지구가 문자열로 수신한 신호가 주어지면 SOS 메시지의 몇 글자가 방사선에 의해 변경되었는지 확인하십시오.
 *
 * 예시) SOSSPSSQSSOR -> 3 리턴
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
 * Complete the 'marsExploration' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function marsExploration(s) {
    // Write your code here
    let cnt = 0,
        result = 0;

    for (let x of s) {
        // S -> O -> S -> S ...
        // 0 -> 1 -> 2 -> 1 ...
        if (cnt === 3) cnt = 0;

        switch (cnt) {
            case 0:
                if (x !== "S") result++;
                cnt++;
                break;
            case 1:
                if (x !== "O") result++;
                cnt++;
                break;
            case 2:
                if (x !== "S") result++;
                cnt++;
                break;
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = marsExploration(s);

    ws.write(result + "\n");

    ws.end();
}
