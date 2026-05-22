You have a stack of n boxes, with widths w_i, heights h_i, and depths d_i. The boxes cannot be rotated and can only be stacked on top of one another if each box in the stack is strictly smaller than the box below it in width, height, and depth. Implement a method to compute the height of the tallest possible stack.

## Example 1:

**Input:** boxes = [[1,1,1],[2,2,2],[3,3,3]]  
**Output:** 6  
**Explanation:** Stack all boxes: height = 1 + 2 + 3 = 6

## Example 2:

**Input:** boxes = [[1,3,2],[2,1,2],[2,2,1]]  
**Output:** 3  
**Explanation:** Can only use one box at a time due to constraints

## Example 3:

**Input:** boxes = [[2,1,2],[3,2,3],[1,1,1]]  
**Output:** 4  
**Explanation:** Stack boxes [1,1,1] and [3,2,3]: height = 1 + 3 = 4

## Constraints:

- `1 <= boxes.length <= 100`
- `1 <= boxes[i][j] <= 1000`
- Each box is represented as [width, height, depth]