Imagine a robot sitting on the upper left corner of grid with r rows and c columns. The robot can only move in two directions, right and down, but certain cells are "off limits" such that the robot cannot step on them. Design an algorithm to find a path for the robot from the top left to the bottom right.

## Example 1:

**Input:** obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]  
**Output:** [[0,0],[0,1],[0,2],[1,2],[2,2]]  
**Explanation:** One possible path from (0,0) to (2,2)

## Example 2:

**Input:** obstacleGrid = [[0,1],[1,0]]  
**Output:** []  
**Explanation:** No path exists

## Example 3:

**Input:** obstacleGrid = [[0,0],[0,0]]  
**Output:** [[0,0],[0,1],[1,1]]

## Constraints:

- `1 <= obstacleGrid.length, obstacleGrid[i].length <= 100`
- `obstacleGrid[i][j]` is 0 or 1
- 0 represents an empty cell, 1 represents an obstacle