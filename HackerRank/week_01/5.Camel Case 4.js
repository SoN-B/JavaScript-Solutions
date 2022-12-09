/**
 * Camel Case 변수, 메소드, 클래스 이름을 결합하거나 분할하는 문제
 *
 * 예시) S - Split, C - Combine
 *      V - Variable, M - Method, C - Class
 *
 * S;M;plasticCup() -> plastic cup
 * S;V;pictureFrame -> picture frame
 * S;C;LargeSoftwareBook -> large software book
 *
 * C;M;white sheet of paper -> whiteSheetOfPaper()
 * C;V;mobile phone -> mobilePhone
 * C;C;coffee machine -> CoffeeMachine
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
    inputString = inputString.split("\r\n"); // \r\n -> 윈도우 형식의 줄바꿈, 입력예시) S;V;iPad\r\n
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
        let point = 0, // 대문자 or 공백의 위치
            pointArr = []; // point index를 저장

        switch (split.SC) {
            case "S":
                switch (split.VMC) {
                    case "V":
                        for (let x of split.words) {
                            if (x === x.toUpperCase()) pointArr.push(point); // 대문자 위치의 인덱스 저장
                            point++;
                        }

                        split.words = split.words.toLowerCase(); // 소문자 변경

                        stringArr = [...split.words]; // 중간 공백 삽입을 위한 문자열 -> 배열
                        for (let x = 0; x < pointArr.length; x++) {
                            stringArr.splice(pointArr[x] + x, 0, " "); // 대문자 위치에 공백삽입, 삽입후 인덱스가 늘어나므로 + x
                            // pointArr[x] + x인덱스로부터, 0개 지우고 공백 " " 삽입
                        }

                        result.push(stringArr.join("")); // 배열 -> 문자열 (결과 배열에 삽입)

                        (stringArr = []), (pointArr = []), (point = 0);

                        break;
                    case "M":
                        let string = split.words.substring(0, split.words.length - 2); // 뒤 '()' 제거
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
                        stringArr.shift(); // 첫문자 제거 (클래스는 앞문자도 대문자라 0인덱스에 공백이 삽입됨)

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
                            stringArr[pointArr[x] - x + 1] = stringArr[pointArr[x] - x + 1].toUpperCase(); // 공백 바로앞 인덱스의 문자 대문자로
                            stringArr.splice(pointArr[x] - x, 1); // 공백을 삭제하므로, - x
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
                        stringArr.push("(", ")"); // 뒤 '()' 추가

                        result.push(stringArr.join(""));

                        (stringArr = []), (pointArr = []), (point = 0);

                        break;
                    case "C":
                        for (let x of split.words) {
                            if (x === " ") pointArr.push(point);
                            point++;
                        }

                        stringArr = [...split.words];
                        stringArr[0] = stringArr[0].toUpperCase(); // 첫 문자 대문자로
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
        ws.write(result[i] + "\n");
    }

    ws.end();
}
