/**
 * 일련의 작업을 수행하여 ascii['a'..'z'] 범위의 소문자 문자열을 줄입니다. 
 * 각 작업에서 일치하는 인접한 문자 쌍을 선택하고 삭제합니다. 
 * 이 메서드를 사용하여 가능한 한 많은 문자를 삭제하고 결과 문자열을 반환합니다. 
 * 마지막 문자열이 비어 있으면 Empty String을 반환합니다.
 * 
 * Ex) s = fsbddbs
 * fsbddbs -> fsdds -> fss -> f
 * 
 * Ex) s = aaabccddd
 * aaabccddd → abccddd → abddd → abd
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
 * Complete the 'superReducedString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function superReducedString(s) {
    let arr = [...s];
    
    let count;
    while(1) {
        count = 0;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === arr[i + 1]) { 
                arr.splice(i, 2);
                count++;
            }
        }
        
        if(count === 0) break; // 중복된 문자를 지울게 없어질때 까지
    }
    
    if(arr.length > 0) {
        return arr.join('');
    } else return 'Empty String';
}

/*
    var arr = readLine().split('');

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
            arr.splice(i, 2);
            i = -1; 아예 for문 처음부터 하는생각이 좋은듯
        }
    }

    if (arr.length === 0) {
        console.log('Empty String');
    } else {
    console.log(arr.join(''));
    }
*/

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = superReducedString(s);

    ws.write(result + '\n');

    ws.end();
}
