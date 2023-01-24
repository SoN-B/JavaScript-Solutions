/**
 * 전형적인 BFS 최단거리 문제
 * 1 - testcase
 * 4 2 - n m: 노드개수, 간선개수
 * 1 2 - 연결된 노드목록 1과 2연결
 * 1 3 - 1과 3연결
 * 1 - 1로부터 각각의 노드들 까지의 거리는?
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
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */

// if) n = 4, m = 2, edges = [ [ 1, 2 ], [ 1, 3 ] ], s = 1
function bfs(n, m, edges, s) {
    const graph = Array.from(new Array(n + 1), () => []); 
    // n + 1 (노드개수 + 1) 이중 배열 생성
    // [ [], [], [], [], [] ]

    edges.forEach(([u, v]) => {
        graph[u].push(v);
        graph[v].push(u);
    });
    // [ [], [ 2, 3 ], [ 1 ], [ 1 ], [] ] -> 1에는 2,3연결, 2에는 1연결...
    
    const visited = new Array(n + 1).fill(0); // 방문처리
    const queue = [[s, Infinity]]; // 시작노드
    
    visited[s] = Infinity;
    
    while(queue.length) {
        const [current, distance] = queue.shift();
        
        for (const next of graph[current]) {
            if (!visited[next]) { // current 1일때 -> 2,3
                const _distance = distance === Infinity ? 1 : distance + 1;
                visited[next] = _distance;
                queue.push([next, _distance]);
            }
        }
    }
    // visited = [ 0, Infinity, 1, 1, 0 ] -> 각각 1로부터의 거리
    
    // 배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);
    return visited.reduce((ret, distance, i) => {
        if (i != 0 && i != s) { // 0과 시작노드 제외
            ret.push(distance ? distance * 6 : -1);
        }
        return ret; // -> [ 6, 6, -1 ]
    }, []);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine().trim(), 10);

        const result = bfs(n, m, edges, s);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
