/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        // Base case: we've used all n pairs
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        // Add opening parenthesis if we haven't used all n
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        // Add closing parenthesis if it won't make string invalid
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
};