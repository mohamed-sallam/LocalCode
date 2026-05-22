## Approach

This problem uses **backtracking** to generate all valid parentheses combinations.

### Algorithm:
1. Use backtracking to build valid parentheses strings character by character
2. Track the number of opening and closing parentheses used so far
3. Add '(' if we haven't used all n opening parentheses
4. Add ')' only if it won't make the string invalid (close < open)
5. When string length reaches 2*n, we have a valid combination

### Time Complexity: O(4^n / √n)
This is the nth Catalan number, which represents the number of valid combinations.

### Space Complexity: O(4^n / √n)
for storing all valid combinations plus recursion stack.

### Key Points:
- Never add ')' unless there's a matching '(' before it
- The number of valid combinations is the nth Catalan number
- Backtracking ensures we explore all valid paths