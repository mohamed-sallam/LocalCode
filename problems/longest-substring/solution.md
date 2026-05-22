## Approach

This problem can be efficiently solved using the **sliding window** technique with a hash map.

### Algorithm:
1. Use two pointers (left and right) to maintain a sliding window
2. Use a hash map to store characters and their most recent indices
3. Expand the window by moving the right pointer
4. When a duplicate character is found, shrink the window from the left
5. Keep track of the maximum window size seen so far

### Time Complexity: O(n)
where n is the length of the string.

### Space Complexity: O(min(m, n))
where m is the size of the character set.

### Key Points:
- The sliding window ensures we never check the same substring twice
- HashMap allows O(1) lookup for duplicate detection
- Always update the maximum length when expanding the window