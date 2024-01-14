import java.util.*;

// N = 정점갯수
// A, B = 간선정보 (Ex. A = {1, ...}, B = {2, ...} -> 1번 정점과 2번 정점이 연결되어있다는 의미)
// 주어진 정보에서 1번 정점에서 N번 정점으로 가는 경로가 있는지 확인하는 문제
public class CT_연속노드_체크 {
  public static void main(String[] args) {
    int N = 4;
    int[] A = { 1, 2, 4, 4, 3 };
    int[] B = { 2, 3, 1, 3, 1 };
    System.out.println(hasPath(N, A, B));
  }

  public static boolean hasPath(int N, int[] A, int[] B) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i <= N; i++) {
      graph.add(new ArrayList<>());
    }

    for (int i = 0; i < A.length; i++) {
      graph.get(A[i]).add(B[i]);
      graph.get(B[i]).add(A[i]);
    }

    boolean[] visited = new boolean[N + 1];
    return dfs(1, N, graph, visited, 2);
  }

  public static boolean dfs(int node, int target, List<List<Integer>> graph, boolean[] visited, int nextNode) {
    if (node == target) {
      return true;
    }

    visited[node] = true;
    for (int next : graph.get(node)) {
      if (next == nextNode && !visited[next] && dfs(next, target, graph, visited, nextNode + 1)) {
        return true;
      }
    }

    return false;
  }
}