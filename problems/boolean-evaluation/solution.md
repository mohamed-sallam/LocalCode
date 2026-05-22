## Approach

This problem uses **dynamic programming with memoization** to count the number of ways to parenthesize a boolean expression.

### Algorithm:
1. Use recursion to try all possible ways to split the expression at each operator
2. For each split, recursively count ways for left and right subexpressions to be true/false
3. Combine results based on the operator type (AND, OR, XOR)
4. Use memoization to avoid recalculating the same subproblems

### Time Complexity: O(n³)
where n is the length of the expression. With memoization, each subproblem is solved once.

### Space Complexity: O(n²)
for the memoization cache and recursion stack.

### Key Points:
- For AND: true only when both operands are true
- For OR: false only when both operands are false  
- For XOR: true when operands have different values
- Memoization is crucial for performance optimization