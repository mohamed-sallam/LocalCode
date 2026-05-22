/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function(nums) {
    function binarySearch(left, right) {
        if (left > right) return -1;
        
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === mid) {
            return mid;
        } else if (nums[mid] > mid) {
            // Magic index must be on the left side
            return binarySearch(left, mid - 1);
        } else {
            // Magic index must be on the right side
            return binarySearch(mid + 1, right);
        }
    }
    
    return binarySearch(0, nums.length - 1);
};