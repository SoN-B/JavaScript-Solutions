/**
 * 해당 문자열의 다음 사전식 배열은 무엇인가? (사실상, 다음 순열을 찾는 문제)
 * hefg -> hegf -> hfeg -> ,...
 * 
 * 평소처럼 순열 알고리즘 적용했다가, 너무 깊이가 깊어지니 배열 크기오류로 런타임 오류가 생김
 * 중간에 끝까지 들어가지 않고 조건에 맞을때 중지해줄 필요있었음 - 백트래킹
 * 근데 딱히 조건까지 걸 필요는 없었음
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
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */
function biggerIsGreater(w) {
    let arr = [...w];
    
    let test = [...w];
    test.sort(function compare(a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    });
    if(test.join('') === w) return 'no answer';
    
    let priv = arr[arr.length - 1], slice = [];
    for(let i = arr.length - 2; i >= 0; i--) {
        if(priv > arr[i]) {
            slice = arr.slice(i + 1);
            priv = arr[i];
            break;
        }
        priv = arr[i];
    }
    
    let temp;
    for(let i = slice.length - 1; i >= 0; i--) {
        if(priv < slice[i]) {
            temp = priv;
            priv = slice[i];
            slice[i] = temp;
            break;
        }
    }
    
    let arrange = `${priv}` + `${slice.sort().join('')}`;
    arr = arr.splice(0, w.length - arrange.length);
    return `${arr.join('')}` + arrange;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        const result = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}

// https://amunre21.github.io/boj/1-10972/ - 아이디어 참고
