/**
 * 알파벳 배열을 입력받고, 그 배열속 알파벳들에 특정 수를 더하여, 그 수 만큼 뒤에 있는 알파벳을 출력하는문제
 * 단, 문자들만 가능하고, 특수문자나 숫자는 제외
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

const shiftCharGen = (char, sv) => {
    const ac = char.charCodeAt();
    let av;
    
    if(ac >= 65 && ac <= 90) { // 대문자
        av = ac + (sv % 26); 
        // 알파벳 개수는 총 26개이기에, 더할 숫자가 26을 넘어가면 그 나머지를 더한다.
        if(av > 90) av = 64 + (av - 90); // 최대 문자인 Z,z를 넘어갈 시, 다시처음부터
        return String.fromCharCode(av);
    } else if(ac >= 97 && ac <= 122) { // 소문자
        av = ac + (sv % 26);

        if(av > 122) av = 96 + (av - 122);
        return String.fromCharCode(av);
    } else return char;
};

function caesarCipher(s, k) {
    // upper = 65 ~ 90
    // lower = 97 ~ 122
    
    let es = '';
    
    for(let i = 0 ; i < s.length; i++) es = es + shiftCharGen(s.charAt(i), k);
    return es; 
};

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine();

    const k = parseInt(readLine().trim(), 10);

    const result = caesarCipher(s, k);

    ws.write(result + '\n');

    ws.end();
}
