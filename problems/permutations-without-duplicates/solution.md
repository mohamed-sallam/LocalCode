## Approach

This problem uses **backtracking** to generate all permutations of unique characters.

### Algorithm:
1. Use backtracking to build permutations character by character
2. At each step, try each remaining unused character
3. Recursively build permutations with the chosen character added
4. When no characters remain, we have a complete permutation

### Time Complexity: O(n! * n)
where n is the length of the string. We generate n! permutations, each taking O(n) time to construct.

### Space Complexity: O(n! * n)
for storing all permutations plus recursion stack.

### Key Points:
- Since characters are unique, no duplicate handling needed
- Each recursive call works with remaining unused characters
- Base case: when no characters remain, add current permutation to result