/**
 * 'U'(up) or 'D'(down)의 연속된 문자들의 배열을 입력으로 받아, 계곡의 수를 세는 문제
 *
 * 예시) _(해수면)을 기준으로 내려가는 순간 계곡의 시작을 알리고, 그 후 올라가서 다시 _(해수면)을 만나면 계곡의 끝을 알림
 *
 *   _/\      _
 *(시작)\    /(끝)
 *       \/\/
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
 * Complete the 'countingValleys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER steps
 *  2. STRING path
 */

function countingValleys(steps, path) {
    let level = 0, // 현재 높이
        valley = 0, // 계곡의 수
        point = 0; // 계곡임을 알리는 변수, 양수(계곡 O), 음수(계곡 X)

    for (let step of path) {
        if (step === "U") {
            level++;
            if (point === 1 && level === 0) {
                // 계곡이었는데, 올라오면서 계곡의 끝을 만남(계곡 +1)
                point--; // 계곡 종료
                valley++;
            }
        } else {
            level--;
            if (point === 0 && level < 0) point++; // 내려가면서 높이가 음수가 되는 순간 계곡의 시작임
        }
    }

    return valley;

    // let altitude = 0;
    // let valleys = 0;
    // for (const currentStep of path) {
    //    if (currentStep === 'U') {
    //        altitude += 1;
    //
    //        if (altitude === 0) { // 단순히 올라오고 높이가 0이 되는 순간만 계곡+1 하면 되는 거였음
    //            valleys += 1;
    //        }
    //    } else {
    //        altitude -= 1;
    //    }
    // }
    //
    // return valleys;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const steps = parseInt(readLine().trim(), 10);

    const path = readLine();

    const result = countingValleys(steps, path);

    ws.write(result + "\n");

    ws.end();
}
