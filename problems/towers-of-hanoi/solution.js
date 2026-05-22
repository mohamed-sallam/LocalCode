/**
 * @param {number} n
 * @return {string[][]}
 */
var hanoi = function(n) {
    const moves = [];
    
    function moveDisks(numDisks, source, destination, auxiliary) {
        if (numDisks === 1) {
            // Base case: move single disk directly
            moves.push([source, destination]);
            return;
        }
        
        // Step 1: Move top n-1 disks from source to auxiliary
        moveDisks(numDisks - 1, source, auxiliary, destination);
        
        // Step 2: Move the largest disk from source to destination
        moves.push([source, destination]);
        
        // Step 3: Move n-1 disks from auxiliary to destination
        moveDisks(numDisks - 1, auxiliary, destination, source);
    }
    
    moveDisks(n, 'A', 'C', 'B');
    return moves;
};