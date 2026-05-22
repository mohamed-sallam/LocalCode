## Approach

This problem uses **backtracking** to generate all possible subsets.

### Algorithm:
1. Use backtracking to build subsets incrementally
2. At each step, decide whether to include the current element or not
3. For each element, recursively generate subsets with and without it
4. Add each generated subset to the result

### Time Complexity: O(2^n * n)
where n is the number of elements. There are 2^n subsets, each taking O(n) time to copy.

### Space Complexity: O(2^n * n)
for storing all subsets plus recursion stack.

### Alternative Approach - Bit Manipulation:
- Use integers from 0 to 2^n - 1
- Each bit position represents whether to include that element
- More efficient for implementation but same complexity

### Key Points:
- Empty set is always included in power set
- Total number of subsets is always 2^n
- Order of subsets may vary depending on implementation