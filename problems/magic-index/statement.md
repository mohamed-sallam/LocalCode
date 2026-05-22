A magic index in an array A[0...n-1] is defined to be an index such that A[i] = i. Given a sorted array of distinct integers, write a method to find a magic index, if one exists, in array A.

**FOLLOW UP:** What if the values are not distinct?

## Example 1:

**Input:** nums = [-1, 0, 1, 2, 4, 10]  
**Output:** 4  
**Explanation:** nums[4] = 4

## Example 2:

**Input:** nums = [0, 2, 3, 4, 5]  
**Output:** 0  
**Explanation:** nums[0] = 0

## Example 3:

**Input:** nums = [-1, 0, 2, 4, 5]  
**Output:** -1  
**Explanation:** No magic index exists

## Constraints:

- `0 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `nums` is sorted in ascending order
- All elements in `nums` are distinct