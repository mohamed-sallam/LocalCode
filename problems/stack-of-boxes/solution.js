/**
 * @param {number[][]} boxes
 * @return {number}
 */
var stackOfBoxes = function(boxes) {
    // Sort boxes by height in descending order for optimization
    boxes.sort((a, b) => b[1] - a[1]);
    
    const memo = new Map();
    
    function canStack(bottom, top) {
        return bottom[0] > top[0] && bottom[1] > top[1] && bottom[2] > top[2];
    }
    
    function maxHeight(index) {
        if (index >= boxes.length) return 0;
        
        if (memo.has(index)) {
            return memo.get(index);
        }
        
        const currentBox = boxes[index];
        let maxHeightWithCurrent = currentBox[1]; // height of current box
        
        // Try stacking each subsequent box on top of current box
        for (let i = index + 1; i < boxes.length; i++) {
            if (canStack(currentBox, boxes[i])) {
                maxHeightWithCurrent = Math.max(
                    maxHeightWithCurrent,
                    currentBox[1] + maxHeight(i)
                );
            }
        }
        
        // Also consider not using current box
        const maxHeightWithoutCurrent = maxHeight(index + 1);
        
        const result = Math.max(maxHeightWithCurrent, maxHeightWithoutCurrent);
        memo.set(index, result);
        return result;
    }
    
    return maxHeight(0);
};