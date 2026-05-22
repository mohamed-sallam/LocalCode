## Approach

This problem uses **Depth-First Search (DFS)** to implement flood fill algorithm.

### Algorithm:
1. Start from the given position (sr, sc)
2. Get the original color at that position
3. If new color equals original color, return (no change needed)
4. Use DFS to visit all connected cells with the same original color
5. Change each visited cell to the new color
6. Recursively process all 4-directional neighbors

### Time Complexity: O(m * n)
where m and n are the dimensions of the image. In worst case, we visit all cells.

### Space Complexity: O(m * n)
for the recursion stack in worst case (when all cells have same color).

### Key Points:
- Handle edge case where new color equals original color
- Use DFS to traverse connected components
- Check bounds and color before recursive calls
- Alternative: BFS using queue for iterative approach