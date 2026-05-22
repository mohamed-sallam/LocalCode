## Approach

This problem uses **binary search** to efficiently find the magic index.

### Algorithm:
1. Use binary search on the sorted array
2. At each midpoint, compare nums[mid] with mid
3. If nums[mid] = mid, we found the magic index
4. If nums[mid] > mid, search the left half (magic index must be smaller)
5. If nums[mid] < mid, search the right half (magic index must be larger)

### Time Complexity: O(log n)
Binary search reduces the search space by half each iteration.

### Space Complexity: O(log n)
for the recursion stack.

### Key Insights:
- Since array is sorted and elements are distinct, we can use binary search
- If nums[mid] > mid, no magic index can exist to the right
- If nums[mid] < mid, no magic index can exist to the left