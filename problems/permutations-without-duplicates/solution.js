/**
 * @param {string} s
 * @return {string[]}
 */
var permute = function(s) {
    const result = [];
    const chars = s.split('');
    
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push(current);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            const char = remaining[i];
            const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            backtrack(current + char, newRemaining);
        }
    }
    
    backtrack('', chars);
    return result;
};