export class CodeExecutor {
    constructor() {
        this.timeout = 5000; // 5 second timeout
    }

    async execute(userCode, testCase, problemType = 'simple') {
        return new Promise((resolve) => {
            const timeoutId = setTimeout(() => {
                resolve({
                    success: false,
                    error: 'Code execution timed out (5 seconds)'
                });
            }, this.timeout);

            try {
                let result;

                if (problemType === 'class') {
                    result = this.executeClassBased(userCode, testCase);
                } else {
                    result = this.executeSimple(userCode, testCase);
                }

                clearTimeout(timeoutId);
                resolve(result);
            } catch (error) {
                clearTimeout(timeoutId);
                resolve({
                    success: false,
                    error: error.message
                });
            }
        });
    }

    executeSimple(userCode, testCase) {
        // Create a safe execution environment
        const safeGlobals = {
            console: {
                log: (...args) => console.log(...args)
            },
            Array,
            Object,
            Math,
            String,
            Number,
            Boolean,
            Date,
            JSON,
            parseInt,
            parseFloat,
            isNaN,
            isFinite
        };

        // Extract function from user code
        const functionMatch = userCode.match(/(?:var|let|const|function)\s+(\w+)|(\w+)\s*=\s*function/);
        if (!functionMatch) {
            throw new Error('No function found in code');
        }

        const functionName = functionMatch[1] || functionMatch[2];

        // Create execution context
        const executionCode = `
            ${userCode}
            return ${functionName};
        `;

        const userFunction = new Function(...Object.keys(safeGlobals), executionCode)
            (...Object.values(safeGlobals));

        // Execute with test input
        const output = userFunction(...testCase.input);
        const expected = testCase.output;

        return {
            success: this.compareOutputs(output, expected),
            output,
            expected
        };
    }

    executeClassBased(userCode, testCase) {
        // Create a safe execution environment
        const safeGlobals = {
            console: {
                log: (...args) => console.log(...args)
            },
            Array,
            Object,
            Math,
            String,
            Number,
            Boolean,
            Date,
            JSON,
            parseInt,
            parseFloat,
            isNaN,
            isFinite
        };

        // Extract class from user code
        const classMatch = userCode.match(/class\s+(\w+)/);
        if (!classMatch) {
            throw new Error('No class found in code');
        }

        const className = classMatch[1];

        // Create execution context
        const executionCode = `
            ${userCode}
            return ${className};
        `;

        const UserClass = new Function(...Object.keys(safeGlobals), executionCode)
            (...Object.values(safeGlobals));

        // Instantiate class
        const instance = new UserClass(...(testCase.constructorArgs || []));

        // Execute method calls
        const results = [];
        for (const call of testCase.calls) {
            const result = instance[call.method](...call.args);
            results.push(result);

            // Check if this call has an expected result
            if ('expected' in call) {
                if (!this.compareOutputs(result, call.expected)) {
                    return {
                        success: false,
                        output: results,
                        expected: testCase.calls.map(c => c.expected)
                    };
                }
            }
        }

        return {
            success: true,
            output: results,
            expected: testCase.calls.map(c => c.expected)
        };
    }

    compareOutputs(actual, expected) {
        if (actual === expected) return true;
        
        // Handle arrays
        if (Array.isArray(actual) && Array.isArray(expected)) {
            if (actual.length !== expected.length) return false;
            return actual.every((val, index) => this.compareOutputs(val, expected[index]));
        }

        // Handle objects
        if (typeof actual === 'object' && typeof expected === 'object' && 
            actual !== null && expected !== null) {
            const actualKeys = Object.keys(actual).sort();
            const expectedKeys = Object.keys(expected).sort();
            
            if (actualKeys.length !== expectedKeys.length) return false;
            if (!actualKeys.every((key, index) => key === expectedKeys[index])) return false;
            
            return actualKeys.every(key => this.compareOutputs(actual[key], expected[key]));
        }

        // Handle NaN
        if (Number.isNaN(actual) && Number.isNaN(expected)) return true;

        return false;
    }
}