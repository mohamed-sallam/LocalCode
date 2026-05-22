## Approach

This problem uses **dynamic programming with memoization** similar to the Longest Increasing Subsequence problem.

### Algorithm:
1. Sort boxes by height in descending order for optimization
2. For each box, decide whether to include it in the stack or not
3. If including a box, find the maximum height achievable by stacking valid boxes on top
4. A box can be stacked on another if it's strictly smaller in all dimensions
5. Use memoization to avoid recalculating subproblems

### Time Complexity: O(n² * log n)
O(n log n) for sorting plus O(n²) for the DP solution.

### Space Complexity: O(n)
for the memoization cache and recursion stack.

### Key Points:
- Sorting by height helps with optimization
- Each box must be strictly smaller in ALL dimensions
- Use memoization to cache results for each starting index
- Consider both including and excluding each box