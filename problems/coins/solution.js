/**
 * @param {number} n
 * @return {number}
 */
var makeChange = function(n) {
    const coins = [25, 10, 5, 1]; // quarters, dimes, nickels, pennies
    const memo = new Map();
    
    function countWays(amount, coinIndex) {
        // Base cases
        if (amount === 0) return 1;
        if (amount < 0 || coinIndex >= coins.length) return 0;
        
        // Check memo
        const key = `${amount}_${coinIndex}`;
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        let ways = 0;
        const coin = coins[coinIndex];
        
        // Try using 0, 1, 2, ... of current coin
        for (let i = 0; i * coin <= amount; i++) {
            ways += countWays(amount - i * coin, coinIndex + 1);
        }
        
        memo.set(key, ways);
        return ways;
    }
    
    return countWays(n, 0);
};