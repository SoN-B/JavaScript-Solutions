/**
 * 윤년 평년 계산후 날짜 출력
 * 율리우스력, 그레고리력 무시
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
 * Complete the 'dayOfProgrammer' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER year as parameter.
 */
let common_year = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let leap_year = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function dayOfProgrammer(year) {
    let day = 256, month = 0;
    if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) { // leap year
        for(month = 0; month < leap_year.length; month++) {
            console.log(day);
            day -= leap_year[month];
            if(day <= 31) break;
        }
        
        if(parseInt((month + 2) / 10) >= 1) return `${day}.${month + 2}.${year}`
        else return `${day}.0${month + 2}.${year}`
    } else {
        for(month = 0; month < common_year.length; month++) {
            day -= common_year[month];
            if(day <= 31) break;
        }
        
        if(parseInt((month + 2) / 10) >= 1) return `${day}.${month + 2}.${year}`
        else return `${day}.0${month + 2}.${year}`
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}
