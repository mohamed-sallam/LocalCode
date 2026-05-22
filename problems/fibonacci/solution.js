/**
 * @param {number} n
 * @return {number}
 */
var fibonacci = function(n) {
    // Handle base cases
    if (n <= 1) return n;
    
    // Use iterative approach for optimal performance
    let prev2 = 0; // F(0)
    let prev1 = 1; // F(1)
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
};