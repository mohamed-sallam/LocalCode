/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const result = [];
    
    function backtrack(start, current) {
        // Add current subset to result
        result.push([...current]);
        
        // Try adding each remaining element
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop(); // backtrack
        }
    }
    
    backtrack(0, []);
    return result;
};