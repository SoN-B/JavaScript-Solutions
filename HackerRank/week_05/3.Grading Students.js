/**
 * 35이하 낙제 (반올림 없음)
 * ex) 84점 -> 85점 (반올림) 85 - 84 = 1 -> 3보다 작음
 * ex) 57점 -> 57점 (반올림 없음) 60 - 57 = 3 -> 3보다 작지 않음
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
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */

function gradingStudents(grades) {
    let result = [];
    for(let i = 0; i < grades.length; i++) {
        if(grades[i] < 35) {
            result.push(grades[i]);
        } else if (grades[i] % 10 > 5) {
            if ((parseInt(grades[i] / 10) * 10 + 10) - grades[i] > 2) {
                result.push(grades[i]);
            } else {
                result.push((parseInt(grades[i] / 10) * 10 + 10));
            }
        } else {
            if ((parseInt(grades[i] / 10) * 10 + 5) - grades[i] > 2) {
                result.push(grades[i]);
            } else {
                result.push((parseInt(grades[i] / 10) * 10 + 5));
            }
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

    ws.write(result.join('\n') + '\n');

    ws.end();
}
