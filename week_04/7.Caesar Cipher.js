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
    
    if(ac >= 65 && ac <= 90){
        av = ac + sv % 26; // rotation  
        if(av > 90){
            av = 64 + (av - 90);
        };
        return String.fromCharCode(av);
    }else if(ac >= 97 && ac <= 122){
        av = ac + sv % 26;
        if(av > 122){
            av = 96 + (av - 122);
        };
        return String.fromCharCode(av);
    }else{
        return char;
    };
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
