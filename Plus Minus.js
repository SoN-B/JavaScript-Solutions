/**
 * 정수형 배열을 입력받아서 양수, 음수, 0순대로 각 개수의 분수 비율을 구하는 문제
 * 단 소수점 6자리까지 출력
 */

"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = ""; // 사용자의 입력이 저장되는 문자열
let currentLine = 0; // 처음 입력은 0인덱스에

process.stdin.on("data", function (inputStdin) {
    inputString += inputStdin; // 사용자로부터 입력을 받아, inputString에 저장
    /* 추가설명
    보통 평상시 입력은 상시 엔터를 동반하지만, 코딩테스트의 입력은 줄바꿈 포함 그 입력 표본을 전부 받는 것이기에
    표본상 줄바꿈이 존재해도 사용자가 엔터를 입력하기 전까지는 입력으로 처리함
    
    즉, 여기서 inputString에는 줄바꿈 포함 표본 전체가 처음에 한 번만 입력된다.
    */
});

process.stdin.on("end", function () {
    inputString = inputString.split("\n"); // 줄바꿈(\n)으로 각 입력을 구분, 엔터 = end 처리
    // 입력값 예시
    // 6
    // -4 3 -9 0 4 1
    // inputString = ['6','-4 3 -9 0 4 1']

    main();
});

function readLine() {
    return inputString[currentLine++]; // 사용자의 다음 입력을 받기 위해, 배열 인덱스 증가한다
}

function plusMinus(arr) {
    let positives = 0;
    let negatives = 0;
    let zeros = 0;

    const arrLength = arr.length;

    for (const number of arr) {
        if (number > 0) {
            positives++;
        } else if (number < 0) {
            negatives++;
        } else {
            zeros++;
        }
    }

    console.log((positives / arrLength).toFixed(6)); // toFixed() : 소수점 자릿수 지정
    console.log((negatives / arrLength).toFixed(6));
    console.log((zeros / arrLength).toFixed(6));
}

function main() {
    const n = parseInt(readLine().trim(), 10); // trim() : 공백 제거 함수
    // parseInt()
    // 1번째 인수 : 숫자로 변환할 문자열
    // 2번째 인수 : string 문자열을 읽을 진법 - 여기선 10진법
    const arr = readLine()
        .replace(/\s+$/g, "") // 뒤에 공백이 있는 모든 문자(g)를 찾아서 공백을 제거한다. (사이사이 X)
        .split(" ") // 공백으로 각 문자들을 나눈다
        .map((arrTemp) => parseInt(arrTemp, 10)); // 나눠진 문자들을 바탕으로 배열 생성
    // 위에서 ['-4 3 -9 0 4 1']를 받았으니 -> ['-4','3','-9','0','4','1']로 만듦

    plusMinus(arr);
}
