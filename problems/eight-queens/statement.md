Write an algorithm to print all ways of arranging eight queens on an 8x8 chess board so that none of them share the same row, column, or diagonal. In this case, "diagonal" means all diagonals, not just the two that bisect the board.

For this implementation, we'll solve the general N-Queens problem where N can be any positive integer.

## Example 1:

**Input:** n = 1  
**Output:** [["Q"]]

## Example 2:

**Input:** n = 4  
**Output:** [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

## Example 3:

**Input:** n = 8  
**Output:** [All 92 valid arrangements]

## Constraints:

- `1 <= n <= 9`
- For n = 2 and n = 3, no solution exists