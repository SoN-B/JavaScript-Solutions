/**
 * ascii[a-z] 범위의 소문자 문자열이 주어지면 문자열을 회문으로 만들기 위해 제거할 수 있는 문자의 인덱스를 결정하십시오. 
 * 하나 이상의 솔루션이 있을 수 있지만 아무거나 할 수 있습니다. 단어가 이미 회문이거나 솔루션이 없으면 -1을 반환합니다. 그렇지 않으면 제거할 문자의 인덱스를 반환합니다.
 * 
 * 회문: 앞에서 읽거나, 뒤에서 읽어도 같은 문자열
 * ljqukwwuqjl
 * 앞) ljqukwwuqjl
 * 뒤) ljquwwkuqjl
 * 
 * 반절로 잘라서 생각했음 ljquk(w - 중간)wuqjl -> (앞) ljquk, (뒤) ljquw -> k제거후, 회문 성립하는지 확인
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
 * Complete the 'palindromeIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function palindromeIndex(s) {
    let temp = [...s];
    let count = 0, result = [];

    for(let i = 0; i < parseInt(s.length / 2); i++) { // 반절로 나누고 앞,뒤로 읽어 다른 문자개수 count
        if(s[i] !== s[s.length - 1 - i]) { 
            result.push([i, s.length - 1 - i]);
            count++;
        }
    }
    
    // count === 1만 체크하면 되지 않을까? 생각할 수 있는데
    // 다른문자 한가지가 더있어서 count가 많아질 수 있음을 생각해야함
    // abcdef(g)gfedba
    // 앞 abcdef -> c가 하나 더있어서, def가 밀려나 서로 다름
    // 뒤 abdefg
    if(count >= 1) { // 하나이상
        temp.splice(result[0][0], 1); // 앞문자 제거
        
        count = 0;
        for(let i = 0; i < parseInt(temp.length / 2); i++) { // 제거후, 다시 회문 성립하는지 확인
            if(temp[i] !== temp[temp.length - 1 - i]) { 
                count++;
            }
        }
        
        if(count === 0) return result[0][0]; // 성립되면 앞문자의 인덱스 리턴
        else return result[0][1]; // 그게 아니라면 뒤문자 제거했어야함
    }
    else return -1; // 다른게 없다면 -1
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = palindromeIndex(s);

        ws.write(result + '\n');
    }

    ws.end();
}
