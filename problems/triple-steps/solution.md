## Approach

This problem uses **dynamic programming** similar to the Fibonacci sequence but with three previous values.

### Algorithm:
1. Base cases: 
   - ways(0) = 1 (one way to stay at ground)
   - ways(1) = 1 (only one 1-step)
   - ways(2) = 2 (1+1 or 2)
2. For n ≥ 3: ways(n) = ways(n-1) + ways(n-2) + ways(n-3)
3. Use iterative approach with three variables to track previous values

### Time Complexity: O(n)
We iterate through the sequence once.

### Space Complexity: O(1)
We only use constant extra space.

### Recurrence Relation:
- To reach step n, child can come from step (n-1), (n-2), or (n-3)
- Total ways = sum of ways to reach each of these previous steps
- This gives us the recurrence: f(n) = f(n-1) + f(n-2) + f(n-3)