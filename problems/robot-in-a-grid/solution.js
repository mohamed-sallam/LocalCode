/**
 * @param {number[][]} obstacleGrid
 * @return {number[][]}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    const rows = obstacleGrid.length;
    const cols = obstacleGrid[0].length;
    
    // If start or end is blocked, no path exists
    if (obstacleGrid[0][0] === 1 || obstacleGrid[rows-1][cols-1] === 1) {
        return [];
    }
    
    const path = [];
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    
    function findPath(row, col) {
        // Check bounds and obstacles
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            obstacleGrid[row][col] === 1 || visited[row][col]) {
            return false;
        }
        
        // Mark as visited
        visited[row][col] = true;
        path.push([row, col]);
        
        // If we reached the destination
        if (row === rows - 1 && col === cols - 1) {
            return true;
        }
        
        // Try moving right or down
        if (findPath(row, col + 1) || findPath(row + 1, col)) {
            return true;
        }
        
        // Backtrack
        path.pop();
        return false;
    }
    
    if (findPath(0, 0)) {
        return path;
    }
    
    return [];
};