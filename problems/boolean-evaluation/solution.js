/**
 * @param {string} expression
 * @param {boolean} result
 * @return {number}
 */
var countEval = function(expression, result) {
    // Memoization cache
    const memo = new Map();
    
    function countWays(expr, targetResult) {
        // Base case: single character
        if (expr.length === 1) {
            const val = expr === '1';
            return val === targetResult ? 1 : 0;
        }
        
        // Check memo
        const key = `${expr}_${targetResult}`;
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        let ways = 0;
        
        // Try splitting at each operator
        for (let i = 1; i < expr.length; i += 2) {
            const operator = expr[i];
            const left = expr.substring(0, i);
            const right = expr.substring(i + 1);
            
            // Count ways for left and right subexpressions
            const leftTrue = countWays(left, true);
            const leftFalse = countWays(left, false);
            const rightTrue = countWays(right, true);
            const rightFalse = countWays(right, false);
            
            // Calculate total ways based on operator
            let totalWays = 0;
            
            if (operator === '&') {
                if (targetResult) {
                    totalWays = leftTrue * rightTrue;
                } else {
                    totalWays = leftFalse * rightFalse + 
                               leftTrue * rightFalse + 
                               leftFalse * rightTrue;
                }
            } else if (operator === '|') {
                if (targetResult) {
                    totalWays = leftTrue * rightTrue + 
                               leftTrue * rightFalse + 
                               leftFalse * rightTrue;
                } else {
                    totalWays = leftFalse * rightFalse;
                }
            } else if (operator === '^') {
                if (targetResult) {
                    totalWays = leftTrue * rightFalse + leftFalse * rightTrue;
                } else {
                    totalWays = leftTrue * rightTrue + leftFalse * rightFalse;
                }
            }
            
            ways += totalWays;
        }
        
        memo.set(key, ways);
        return ways;
    }
    
    return countWays(expression, result);
};