## Approach

This problem uses **divide and conquer** to minimize the number of addition operations.

### Algorithm:
1. Ensure the smaller number is used for recursion (optimization)
2. Base cases: multiply by 0 gives 0, multiply by 1 gives the other number
3. Divide the smaller number by 2 and recursively multiply
4. If smaller number is even: result = 2 * (half * bigger)
5. If smaller number is odd: result = 2 * (half * bigger) + bigger

### Time Complexity: O(log min(a,b))
We halve the smaller number in each recursive call.

### Space Complexity: O(log min(a,b))
for the recursion stack.

### Key Optimization:
- Always recurse on the smaller number to minimize recursive calls
- Use bit shifting for division by 2
- Use addition instead of multiplication for doubling