/**
 * 팬그램 맞는지 여부 출력 - 대소문자를 무시
 * 팬그램은 알파벳의 모든 문자를 포함하는 문자열
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
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function pangrams(s) {
    let letters = [];
    for (let letter of s) {
        const ltr = letter.toLowerCase();
        // 공백이 아니고, 문자열 배열 속에 속해있지 않는 문자라면 삽입한다.
        if (!letters.includes(ltr) && letter != " ") letters.push(ltr);
    }

    return letters.length == 26 ? "pangram" : "not pangram";
    // 그 후, 길이가 26라면(알파벳 개수 = 26) pangram
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = pangrams(s);

    ws.write(result + "\n");

    ws.end();
}
