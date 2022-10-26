"use strict";

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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
    let test = arr.sort(function (a, b) {
        return a - b;
    });

    let min = 0;
    let max = 0;

    for (let i = 1; i <= 4; i++) {
        max += arr[i];
    }
    for (let i = 3; i >= 0; i--) {
        min += arr[i];
    }

    console.log(min, max);
}

function main() {
    const arr = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((arrTemp) => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
