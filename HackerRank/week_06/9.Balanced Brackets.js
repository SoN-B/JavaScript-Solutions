/**
 * 백준에도 있는 괄호 균형 문제
 * Ex. s = {[()]} -> 여는 괄호 & 닫는 괄호가 균형을 이룸 YES
 * Ex. s = {{}}]] -> NO
 * Ex. s = {{{{{{ or }}}}}}}}} -> NO
 * 
 * 반절로 나눠서 보는게 아니라, 열린 괄호들은 push하고, 닫힌 괄호들일때, pop해서 바로 비교해줘야함
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
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isBalanced(s) {
    let arr = [...s];
    let check = [];
    
    let word, flag = 'YES';
    for(let i = 0; i < arr.length ; i++) {
        if(arr[i] === '{' || arr[i] === '(' || arr[i] === '[') check.push(arr[i]);
        else {
            word = check.pop();
            if(word === undefined) return 'NO'; // }}}} -> 이런 상황 대비, 이럴때는 나올게 없음 (닫힌괄호가 더 많았을때)

            if(word === '{') arr[i] === '}' ? flag = 'YES' : flag = 'NO';
            else if(word === '(') arr[i] === ')' ? flag = 'YES' : flag = 'NO';
            else if(word === '[') arr[i] === ']' ? flag = 'YES' : flag = 'NO';
        }
        if(flag === 'NO') return 'NO';
    }
    
    if(flag === 'YES' && check.length === 0) return 'YES'; // 모두 비어있어야 YES임 Ex. check = {{ (여는괄호가 더 많았을때)
    else return 'NO';
}

// function isBalanced(s) {
//     var result = 'YES';
//     var stack = [];
//     s.split('').forEach(function(val) {
//         switch(val) {
//             case '{':
//                 stack.push('}'); // 여는 괄호는 닫는괄호로 고쳐 반대로 넣는생각
//                 break;
//             case '[':
//                 stack.push(']');
//                 break;
//             case '(':
//                 stack.push(')');
//                 break;
//             default:
//                 var test = stack.pop();
//                 if (val !== test) { // 현요소와 pop한 요소 비교
//                     result = 'NO';
//                 }    
//         }
//     })
//     if (stack.length) {
//         result = 'NO';
//     }
//     return result;
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = isBalanced(s);

        ws.write(result + '\n');
    }

    ws.end();
}
