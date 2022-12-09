/**
 * 게임 맵 최단거리 (Level 2)
 * 참고 - https://msko.tistory.com/6#recentComments
 * 
 * maps)
 * [1, 0, 1, 1, 1]
 * [1, 0, 1, 0, 1]
 * [1, 0, 1, 1, 1]
 * [1, 1, 1, 0, 1]
 * [0, 0, 0, 0, 1]
 * 
 * visitCount)
 * [1, 1, 9, 10, 11]
 * [2, 1, 8, 1, 12]
 * [3, 1, 7, 8, 9]
 * [4, 5, 6, 1, 10]
 * [1, 1, 1, 1, 11]
 * 
 * queue = ~~~
 * 
 * const dy = [1,0,-1,0];
 * const dx = [0,1,0,-1];
 * 아래 오른쪽 위 왼쪽
 */

'use strict';

function solution(maps) {
    const dy = [1,0,-1,0];
    const dx = [0,1,0,-1];
    const row = maps.length;
    const col = maps[0].length;

    const visitCount = [...maps].map((r) => r.map((c) => 1));

    const queue = [[0,0]];

    while(queue.length) {
        const [y, x] = queue.shift();

        for(let i = 0; i < 4; i++ ) {
            const ny = y + dy[i];
            const nx = x + dx[i];

            if(ny >= 0 && nx >= 0 && ny < row && nx < col) {
                if(maps[ny][nx] === 1 && visitCount[ny][nx] === 1) {
                    visitCount[ny][nx] = visitCount[y][x] + 1;
                    queue.push([ny,nx]);
                }
            }
        }
    }

    return visitCount[row - 1][col - 1] === 1 ? -1 : visitCount[row - 1][col - 1];    
}