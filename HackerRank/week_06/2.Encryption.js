/**
 * 임의의 문자열이 주어지고, 공백을 제거후 문자열의 길의에 루트값에 따라 암호화된 문자열을 다시 만드는 문제
 * 
 * Ex) haveaniceday, 길이 12, 12의 루트값은 3과 4사이
 * 4개씩 나눠서 새로운 배열에 삽입
 * have
 * anic
 * eday
 * 
 * 각각의 세로줄로 새로운 문자열생성 -> hae and via ecy
 * 내가 푼 풀이는 문자열의 길이가 특정값의 사이가 아니라 딱 떨어지는 값일때 그값으로 정해야함
 */
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'encryption' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */
function encryption(s) {
    let string = s.trim();
    let string_a = [...string];
    let num;
    
    // if 문자열길이가 49일때, col = 7, row = 7
    if(Number.isInteger(Math.sqrt(string.length)) && Math.pow(Math.sqrt(string.length), 2) === string.length) {
        num = parseInt(Math.sqrt(string.length));
    } else { num = parseInt(Math.sqrt(string.length) + 1); }

    let arr = [];
    while(string_a.length > 0) arr.push(string_a.splice(0, num));
    
    let temp = "", result = [];
    for(let i = 0; i < num; i++) {
        for(let j = 0; j < arr.length; j++) {
            if(arr[j][i] === undefined) break;
            temp += arr[j][i];
        }
        result.push(temp);
        temp = "";
    }
    
    return result.join(' ');
}

// function encryption(s) {
//     s = s.replace(" ", "")
//     const len = s.length
//     const sqrt = Math.sqrt(len)
//     const col = Math.ceil(sqrt)
//     let m = ""
    
//     for (let i = 0; i < col; i++){
//         if (m){
//             m += " "
//         }
//         for (let j = i; j < len; j += col){ // len = 49라면, col = 0, 7, 14, ... 42마다의 글자를 가져옴(즉 각 로우의 다음값)
//             m += s[j]
//         }
//     }
//     return m
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = encryption(s);

    ws.write(result + '\n');

    ws.end();
}
