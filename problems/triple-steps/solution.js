/**
 * @param {number} n
 * @return {number}
 */
var countWays = function(n) {
    // Handle base cases
    if (n < 0) return 0;
    if (n === 0) return 1;
    if (n === 1) return 1;
    if (n === 2) return 2;
    
    // Use iterative DP for optimal performance
    let prev3 = 1; // ways(0)
    let prev2 = 1; // ways(1)  
    let prev1 = 2; // ways(2)
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2 + prev3;
        prev3 = prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
};