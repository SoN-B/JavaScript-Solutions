/**
 * Maria 선수 경기마다의 최고, 최저 점수 돌파 횟수 카운트
 * 첫 번째 경기 점수가 기준이 되어 input으로 경기별 점수가 배열로 들어온다.
 * 배열 형식으로 최고, 최저 돌파 횟수 리턴
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
 * Complete the 'breakingRecords' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY scores as parameter.
 */

function breakingRecords(scores) {
    let max = scores[0],
        min = scores[0];
    let max_count = 0,
        min_count = 0;

    for (let i = 0; i < scores.length; i++) {
        if (max < scores[i]) {
            max_count++;
            max = scores[i];
        }
        if (min > scores[i]) {
            min_count++;
            min = scores[i];
        }
    }

    return [max_count, min_count];

    // let max=scores[0], min=scores[0], highScore=0, lowScore=0;

    // scores.forEach((score) => {
    //     if(score > max) {
    //         max = score;
    //         highScore++;
    //     } else if(score < min) {
    //         min = score;
    //         lowScore++;
    //     }
    // });

    // return [highScore, lowScore];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const scores = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((scoresTemp) => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(" ") + "\n");

    ws.end();
}
