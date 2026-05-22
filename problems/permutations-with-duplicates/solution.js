/**
 * @param {string} s
 * @return {string[]}
 */
var permuteUnique = function(s) {
    const result = [];
    const chars = s.split('').sort(); // Sort to group duplicates
    const used = new Array(chars.length).fill(false);
    
    function backtrack(current) {
        if (current.length === chars.length) {
            result.push(current);
            return;
        }
        
        for (let i = 0; i < chars.length; i++) {
            // Skip used characters
            if (used[i]) continue;
            
            // Skip duplicates: if current char is same as previous and previous is not used
            if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) {
                continue;
            }
            
            used[i] = true;
            backtrack(current + chars[i]);
            used[i] = false; // backtrack
        }
    }
    
    backtrack('');
    return result;
};