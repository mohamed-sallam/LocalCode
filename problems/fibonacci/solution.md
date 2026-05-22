## Approach

This problem can be solved using **iterative dynamic programming** for optimal performance.

### Algorithm:
1. Handle base cases: F(0) = 0, F(1) = 1
2. Use two variables to track the previous two Fibonacci numbers
3. Iterate from 2 to n, calculating each Fibonacci number
4. Update the two tracking variables for the next iteration

### Time Complexity: O(n)
We iterate through the sequence once.

### Space Complexity: O(1)
We only use constant extra space.

### Alternative Approaches:
- **Recursive**: Simple but exponential time O(2^n)
- **Memoized Recursive**: O(n) time and space
- **Matrix Exponentiation**: O(log n) time for very large n