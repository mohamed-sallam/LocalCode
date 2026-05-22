## Approach

This problem uses **backtracking** to find all valid arrangements of N queens on an NxN chessboard.

### Algorithm:
1. Place queens row by row, trying each column in the current row
2. For each placement, check if it conflicts with previously placed queens
3. If valid, recursively place queens in the next row
4. If we reach the last row, we found a valid solution
5. Backtrack by removing the queen and trying the next position

### Time Complexity: O(N!)
In the worst case, we try all possible arrangements.

### Space Complexity: O(N²)
for the board representation and recursion stack.

### Key Points:
- Only need to check conflicts with previously placed queens (above current row)
- Check three types of conflicts: same column, same diagonal
- Backtracking ensures we explore all possible valid arrangements