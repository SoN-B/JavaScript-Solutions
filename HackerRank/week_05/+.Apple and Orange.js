/**
 * s,t = 집 시작 끝 위치
 * a,b = 사과, 오렌지 나무 위치
 * 각 사과가 나무에서 떨어지는 거리 = apples
 * 각 오렌지가 나무에서 떨어지는 거리 = oranges
 * 
 * apples, oranges위치들에 사과, 오렌지 나무위치를 더했을때, s,t범위안에 들어오는 사과,오렌지 개수 구하는 문제
 */

'use strict';

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
 * Complete the 'countApplesAndOranges' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER s
 *  2. INTEGER t
 *  3. INTEGER a
 *  4. INTEGER b
 *  5. INTEGER_ARRAY apples
 *  6. INTEGER_ARRAY oranges
 */

function countApplesAndOranges(s, t, a, b, apples, oranges) {
    let apple = apples.map((data) => data + a);
    let orange = oranges.map((data) => data + b);
    
    let result = []
    
    let count_apple = 0;
    for(let i = 0; i < apple.length; i++) {
        if(s <= apple[i] && apple[i] <= t) count_apple++;
    }
    console.log(count_apple);
    
    let count_orange = 0;
    for(let i = 0; i < orange.length; i++) {
        if(s <= orange[i] && orange[i] <= t) count_orange++;
    }
    console.log(count_orange);
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const s = parseInt(firstMultipleInput[0], 10);

    const t = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const a = parseInt(secondMultipleInput[0], 10);

    const b = parseInt(secondMultipleInput[1], 10);

    const thirdMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(thirdMultipleInput[0], 10);

    const n = parseInt(thirdMultipleInput[1], 10);

    const apples = readLine().replace(/\s+$/g, '').split(' ').map(applesTemp => parseInt(applesTemp, 10));

    const oranges = readLine().replace(/\s+$/g, '').split(' ').map(orangesTemp => parseInt(orangesTemp, 10));

    countApplesAndOranges(s, t, a, b, apples, oranges);
}
