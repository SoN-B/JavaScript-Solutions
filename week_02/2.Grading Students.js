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
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */

function gradingStudents(grades) {
    let result = [];

    for (let x of grades) {
        if (x < 38 || x % 5 === 0) result.push(x);
        else if (x % 10 < 5) {
            if (parseInt(x / 10) * 10 + 5 - x < 3) result.push(parseInt(x / 10) * 10 + 5);
            else result.push(x);
        } else if (x % 10 > 5) {
            if (parseInt(x / 10) * 10 + 10 - x < 3) result.push(parseInt(x / 10) * 10 + 10);
            else result.push(x);
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const gradesCount = parseInt(readLine().trim(), 10);

    let grades = [];

    for (let i = 0; i < gradesCount; i++) {
        const gradesItem = parseInt(readLine().trim(), 10);
        grades.push(gradesItem);
    }

    const result = gradingStudents(grades);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
