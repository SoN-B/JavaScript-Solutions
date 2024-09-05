
import java.util.Arrays;

class Solution {
    public int solution(int[] A) {
        Arrays.sort(A);

        int result = 0;

        if (A[A.length - 1] > 0) result = A[A.length - 1] + 1;
        else if (A[A.length - 1] < 0) result = 1;

        for(int i = 0; i < A.length; i++) {
            if(i < A.length - 1 && (A[i] > 0 && A[i + 1] > 0)) {
                if(A[i + 1] - A[i] > 1) return A[i] + 1;
            }
        }

        return result;
    }
}