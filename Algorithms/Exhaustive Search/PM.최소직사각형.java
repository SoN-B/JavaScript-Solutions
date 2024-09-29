import java.util.*;

/**
 * @description 명함의 가로, 세로 길이가 주어졌을 때, 모든 명함을 수납할 수 있는 최소 사각형의 넓이를 구하는 문제
 * @param sizes 명함의 가로, 세로 길이
 *
 * 접근방식)
 * 전달 받은, sizes 배열의 각각의 요소에 대하여, 큰 값을 가로, 작은 값을 세로로 설정 (모든 명함을 긴 방향으로 놓는다고 가정)
 * Ex) 30, 70 -> 70, 30
 * 이렇게 재 배열한 명함들 중, 가로, 세로 길이의 최대값을 구하여, 최소 사각형의 넓이를 구함
 */
class Solution {
    public int solution(int[][] sizes) {
        int answer = 0;
        int max_v=0;
        int max_h=0;
        for(int i=0;i<sizes.length;i++){
            int v=Math.max(sizes[i][0],sizes[i][1]);
            int h=Math.min(sizes[i][0],sizes[i][1]);
            max_v=Math.max(max_v,v);
            max_h=Math.max(max_h,h);
        }
        return answer=max_v*max_h;
    }
}
