The classic Towers of Hanoi problem: You have 3 towers and N disks of different sizes which can slide onto any tower. The puzzle starts with disks sorted in ascending order of size from top to bottom (i.e., each disk sits on top of an even larger one). You have the following constraints:

1. Only one disk can be moved at a time
2. A disk is slid off the top of one tower onto another tower
3. A disk cannot be placed on top of a smaller disk

Write a program to move the disks from the first tower to the last using stacks.

## Example 1:

**Input:** n = 1  
**Output:** [["A","C"]]  
**Explanation:** Move disk 1 from tower A to tower C

## Example 2:

**Input:** n = 2  
**Output:** [["A","B"],["A","C"],["B","C"]]  
**Explanation:** 
- Move disk 1 from A to B
- Move disk 2 from A to C  
- Move disk 1 from B to C

## Example 3:

**Input:** n = 3  
**Output:** [["A","C"],["A","B"],["C","B"],["A","C"],["B","A"],["B","C"],["A","C"]]

## Constraints:

- `1 <= n <= 10`