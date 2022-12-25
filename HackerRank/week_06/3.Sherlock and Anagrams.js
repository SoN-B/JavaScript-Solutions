/**
 * 하나의 문자열속, 세부 문자열들끼리 Anagram이 성립하는 쌍의 개수
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
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */
function sherlockAndAnagrams(s) {
    let temp1 = [], temp2;
    // 순서대로 1개, 2개, 3개...씩 고르는경우
    for(let i = 1; i <= s.length; i++) { // 갯수
        for(let j = 0; j < s.length; j++) {
            if(j + i > s.length) break;
            temp1.push(s.slice(j,j+i));
        }
    }
    // [
    //     'a',    'b',   'b',
    //     'a',    'ab',  'bb',
    //     'ba',   'abb', 'bba',
    //     'abba'
    // ] 
    
    // 배열안의 각각의 문자열들 정렬
    for(let i = 0; i < temp1.length; i++) {
        temp2 = [...temp1[i]];
        temp1[i] = temp2.sort();
        temp1[i] = temp1[i].join('');
    }
    // [
    //     'a',    'b',   'b',
    //     'a',    'ab',  'bb',
    //     'ab',   'abb', 'abb',
    //     'aabb'
    // ] 
    
    temp1.sort(); // 알파벳 순으로 재정렬
    // [
    //     'a',   'a',  'aabb',
    //     'ab',  'ab', 'abb',
    //     'abb', 'b',  'b',
    //     'bb'
    //   ]

    let result = 0, count;
    while(temp1.length > 0) {
        count = 0;
        // 자기 자신과 같은 요소 count++;
        for(let i = 1; i < temp1.length; i++) if(temp1[0] === temp1[i]) count++;
        
        if(count !== 0) { 
            result += ((count + 1) * count) / 2; 
            // 서로다른 n개의 요소중 2개를 뽑는경우 nC2, (n * (n - 1)) / 2
            // 여기서 count는 자기자신 제외이므로 + 1
            temp1.splice(0, count + 1);
        } else {
            temp1.splice(0,1);
        }
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = sherlockAndAnagrams(s);

        ws.write(result + '\n');
    }

    ws.end();
}