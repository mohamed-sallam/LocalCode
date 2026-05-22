## Approach

This problem uses **backtracking with memoization** to find a path from top-left to bottom-right.

### Algorithm:
1. Start from position (0,0)
2. At each cell, try moving right or down
3. Mark visited cells to avoid cycles
4. If we reach the destination, return the path
5. If no valid move exists, backtrack and try alternative paths
6. Use memoization to avoid recalculating failed paths

### Time Complexity: O(r * c)
where r and c are the grid dimensions. Each cell is visited at most once.

### Space Complexity: O(r * c)
for the visited array and recursion stack.

### Key Points:
- Check for obstacles and bounds before moving
- Use visited array to prevent infinite loops
- Backtrack by removing current position from path if no solution found
- Early termination if start or end position is blocked