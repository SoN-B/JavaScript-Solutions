'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

const SinglyLinkedListNode = class {
    constructor(nodeData) {
        this.data = nodeData;
        this.next = null;
    }
};

const SinglyLinkedList = class {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData) {
        const node = new SinglyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
    }
};

function printSinglyLinkedList(node, sep, ws) {
    while (node != null) {
        ws.write(String(node.data));

        node = node.next;

        if (node != null) {
            ws.write(sep);
        }
    }
}

/*
 * Complete the 'removeDuplicates' function below.
 *
 * The function is expected to return an INTEGER_SINGLY_LINKED_LIST.
 * The function accepts INTEGER_SINGLY_LINKED_LIST llist as parameter.
 */

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
// 정렬된 링크드리스트에서의 중복요소 제거
// Ex) 1 -> 1 -> 2 -> 2 -> 3
// 1 -> 2 -> 3
function removeDuplicates(llist) {
    let result = llist; // 결과 반환을 위해 첫요소 기억
    
    let node = llist; // 현재노드
    while(llist.next !== null) {
        llist = llist.next;
        node.next = null;
        // 일단 무조건 next에 null저장
        // 1 -> 1 -> 2 -> 2 -> 2의 경우 위의 문장을 적어주지 않으면
        // 1 -> 2 -> 2 -> 2가 됨
        if(node.data !== llist.data) { // 다음요소와 현재요소가 다를경우
            node.next = llist;
            node = node.next;
        }
    }
    
    return result;
}

// function removeDuplicates(llist) {
//     let ans = llist;
        
//     while(ans.next){ 
//         ans.data == ans.next.data ? ans.next = ans.next.next : ans = ans.next; 
//     }
    
//     return llist;
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const llistCount = parseInt(readLine(), 10);

        let llist = new SinglyLinkedList();

        for (let i = 0; i < llistCount; i++) {
            const llistItem = parseInt(readLine(), 10);
            llist.insertNode(llistItem);
        }

        let llist1 = removeDuplicates(llist.head);

        printSinglyLinkedList(llist1, " ", ws)
        ws.write("\n");
    }

    ws.end();
}
