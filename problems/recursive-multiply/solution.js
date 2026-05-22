/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var recursiveMultiply = function(a, b) {
    // Ensure a is the smaller number for optimization
    if (a > b) {
        return recursiveMultiply(b, a);
    }
    
    function multiply(smaller, bigger) {
        // Base cases
        if (smaller === 0) return 0;
        if (smaller === 1) return bigger;
        
        // Divide smaller by 2
        const half = smaller >> 1; // equivalent to Math.floor(smaller / 2)
        const halfProduct = multiply(half, bigger);
        
        // If smaller is even, result is 2 * halfProduct
        // If smaller is odd, result is 2 * halfProduct + bigger
        if (smaller % 2 === 0) {
            return halfProduct + halfProduct;
        } else {
            return halfProduct + halfProduct + bigger;
        }
    }
    
    return multiply(a, b);
};