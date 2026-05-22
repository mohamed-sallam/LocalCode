## Approach

This problem uses **dynamic programming with memoization** to count the number of ways to make change.

### Algorithm:
1. Use recursion to try all combinations of coins
2. For each coin type, try using 0, 1, 2, ... coins until we exceed the amount
3. Recursively solve for remaining amount with remaining coin types
4. Use memoization to avoid recalculating the same subproblems

### Time Complexity: O(n * c)
where n is the amount and c is the number of coin types.

### Space Complexity: O(n * c)
for the memoization cache and recursion stack.

### Key Points:
- Process coins in decreasing order to avoid duplicate counting
- Base case: amount = 0 has exactly 1 way (use no coins)
- Memoization prevents exponential time complexity