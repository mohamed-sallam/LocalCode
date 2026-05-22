## Approach

This problem uses **backtracking with duplicate handling** to generate unique permutations.

### Algorithm:
1. Sort the input string to group duplicate characters together
2. Use backtracking to generate permutations
3. Track which characters are currently used
4. Skip duplicates by ensuring we use duplicate characters in order
5. Only use a duplicate character if the previous identical character is already used

### Time Complexity: O(n! * n)
where n is the length of the string. We generate at most n! permutations.

### Space Complexity: O(n)
for the recursion stack and used array.

### Key Points:
- Sorting is crucial for duplicate handling
- Skip duplicate characters that are out of order
- The condition `chars[i] === chars[i-1] && !used[i-1]` prevents duplicate permutations