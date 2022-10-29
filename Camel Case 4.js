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
    let stringSize = inputString.length;

    main(stringSize);
});

function readLine() {
    return inputString[currentLine++];
}

function processData(input) {
    let result = [];

    input.forEach((value) => {
        let Arr = value.split(";");
        let split = {
            SC: Arr[0],
            VMC: Arr[1],
            words: Arr[2],
        };

        let stringArr = [];
        let point = 0,
            pointArr = [];

        switch (split.SC) {
            case "S":
                switch (split.VMC) {
                    case "V":
                        for (let x of split.words) {
                            if (x === x.toUpperCase()) pointArr.push(point);
                            point++;
                        }

                        split.words = split.words.toLowerCase();

                        stringArr = [...split.words];
                        for (let x = 0; x < pointArr.length; x++) {
                            stringArr.splice(pointArr[x] + x, 0, " ");
                        }

                        result.push(stringArr.join(""));

                        (stringArr = []), (pointArr = []), (point = 0);

                        break;
                    case "M":
                        let string = split.words.substring(0, split.words.length - 2);
                        for (let x of string) {
                            if (x === x.toUpperCase()) pointArr.push(point);
                            point++;
                        }

                        string = string.toLowerCase();

                        stringArr = [...string];
                        for (let x = 0; x < pointArr.length; x++) {
                            stringArr.splice(pointArr[x] + x, 0, " ");
                        }

                        result.push(stringArr.join(""));

                        (stringArr = []), (pointArr = []), (point = 0);

                        break;
                    case "C":
                        for (let x of split.words) {
                            if (x === x.toUpperCase()) pointArr.push(point);
                            point++;
                        }

                        split.words = split.words.toLowerCase();

                        stringArr = [...split.words];
                        for (let x = 0; x < pointArr.length; x++) {
                            stringArr.splice(pointArr[x] + x, 0, " ");
                        }
                        stringArr.shift();

                        result.push(stringArr.join(""));

                        (stringArr = []), (pointArr = []), (point = 0);

                        break;
                }

                break;
            case "C":
                switch (split.VMC) {
                    case "V":
                        for (let x of split.words) {
                            if (x === " ") pointArr.push(point);
                            point++;
                        }

                        stringArr = [...split.words];
                        for (let x = 0; x < pointArr.length; x++) {
                            stringArr[pointArr[x] - x + 1] = stringArr[pointArr[x] - x + 1].toUpperCase();
                            stringArr.splice(pointArr[x] - x, 1);
                        }

                        result.push(stringArr.join(""));

                        (stringArr = []), (pointArr = []), (point = 0);

                        break;
                    case "M":
                        for (let x of split.words) {
                            if (x === " ") pointArr.push(point);
                            point++;
                        }

                        stringArr = [...split.words];
                        for (let x = 0; x < pointArr.length; x++) {
                            stringArr[pointArr[x] - x + 1] = stringArr[pointArr[x] - x + 1].toUpperCase();
                            stringArr.splice(pointArr[x] - x, 1);
                        }
                        stringArr.push("(", ")");

                        result.push(stringArr.join(""));

                        (stringArr = []), (pointArr = []), (point = 0);

                        break;
                    case "C":
                        for (let x of split.words) {
                            if (x === " ") pointArr.push(point);
                            point++;
                        }

                        stringArr = [...split.words];
                        stringArr[0] = stringArr[0].toUpperCase();
                        for (let x = 0; x < pointArr.length; x++) {
                            stringArr[pointArr[x] - x + 1] = stringArr[pointArr[x] - x + 1].toUpperCase();
                            stringArr.splice(pointArr[x] - x, 1);
                        }

                        result.push(stringArr.join(""));

                        (stringArr = []), (pointArr = []), (point = 0);

                        break;
                }

                break;
        }
    });

    return result;
}

function main(stringSize) {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = [];
    for (let i = 0; i < stringSize; i++) {
        arr.push(readLine());
    }

    const result = processData(arr);

    for (let i = 0; i < stringSize; i++) {
        ws.write(result[i]);
    }

    ws.end();
}
