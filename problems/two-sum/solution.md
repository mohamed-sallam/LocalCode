## Approach

The most efficient solution uses a **hash map** to achieve O(n) time complexity.

### Algorithm:
1. Create a hash map to store numbers and their indices
2. Iterate through the array once
3. For each number, calculate the complement (target - current number)
4. Check if the complement exists in the hash map
5. If found, return the indices
6. If not found, add the current number and index to the hash map

### Time Complexity: O(n)
### Space Complexity: O(n)

This approach is much more efficient than the brute force O(n²) solution that checks all pairs.