/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    const originalColor = image[sr][sc];
    
    // If the new color is the same as original, no change needed
    if (originalColor === newColor) {
        return image;
    }
    
    const rows = image.length;
    const cols = image[0].length;
    
    function dfs(row, col) {
        // Check bounds and color
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            image[row][col] !== originalColor) {
            return;
        }
        
        // Fill current cell
        image[row][col] = newColor;
        
        // Recursively fill adjacent cells (4-directional)
        dfs(row + 1, col); // down
        dfs(row - 1, col); // up
        dfs(row, col + 1); // right
        dfs(row, col - 1); // left
    }
    
    dfs(sr, sc);
    return image;
};