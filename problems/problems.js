// Problem manifest - lists all available problems
export const PROBLEMS = [
    {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy'
    },
    {
        id: 'add-two-numbers',
        title: 'Add Two Numbers',
        difficulty: 'Medium'
    },
    {
        id: 'longest-substring',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium'
    },
    {
        id: 'boolean-evaluation',
        title: 'Boolean Evaluation',
        difficulty: 'Hard'
    },
    {
        id: 'coins',
        title: 'Coins',
        difficulty: 'Medium'
    },
    {
        id: 'eight-queens',
        title: 'Eight Queens',
        difficulty: 'Hard'
    },
    {
        id: 'fibonacci',
        title: 'Fibonacci',
        difficulty: 'Easy'
    },
    {
        id: 'magic-index',
        title: 'Magic Index',
        difficulty: 'Medium'
    },
    {
        id: 'paint-fill',
        title: 'Paint Fill',
        difficulty: 'Medium'
    },
    {
        id: 'parenthesis',
        title: 'Parenthesis',
        difficulty: 'Medium'
    },
    {
        id: 'permutations-with-duplicates',
        title: 'Permutations with Duplicates',
        difficulty: 'Medium'
    },
    {
        id: 'permutations-without-duplicates',
        title: 'Permutations without Duplicates',
        difficulty: 'Medium'
    },
    {
        id: 'power-set',
        title: 'Power Set',
        difficulty: 'Medium'
    },
    {
        id: 'recursive-multiply',
        title: 'Recursive Multiply',
        difficulty: 'Medium'
    },
    {
        id: 'robot-in-a-grid',
        title: 'Robot In a Grid',
        difficulty: 'Medium'
    },
    {
        id: 'stack-of-boxes',
        title: 'Stack of Boxes',
        difficulty: 'Hard'
    },
    {
        id: 'towers-of-hanoi',
        title: 'Towers of Hanoi',
        difficulty: 'Hard'
    },
    {
        id: 'triple-steps',
        title: 'Triple Steps',
        difficulty: 'Easy'
    }
];

export class ProblemManager {
    constructor() {
        this.problems = PROBLEMS;
    }

    async getProblems() {
        return this.problems;
    }

    async getProblem(problemId) {
        try {
            // Load problem files
            const [statement, testCases, sampleCases, meta, template] = await Promise.all([
                this.loadFile(`problems/${problemId}/statement.md`),
                this.loadJSON(`problems/${problemId}/testcases.json`),
                this.loadJSON(`problems/${problemId}/samplecases.json`),
                this.loadJSON(`problems/${problemId}/meta.json`),
                this.loadJSON(`problems/${problemId}/solution_signatures.json`)
            ]);

            return {
                id: problemId,
                statement,
                testCases,
                sampleCases,
                meta,
                template: template.template,
                type: this.detectProblemType(testCases[0])
            };
        } catch (error) {
            console.error(`Error loading problem ${problemId}:`, error);
            throw error;
        }
    }

    async getSolution(problemId) {
        try {
            const [explanation, code] = await Promise.all([
                this.loadFile(`problems/${problemId}/solution.md`),
                this.loadFile(`problems/${problemId}/solution.js`)
            ]);

            return { explanation, code };
        } catch (error) {
            throw new Error('Solution not available');
        }
    }

    detectProblemType(testCase) {
        return testCase.type || 'simple';
    }

    async loadFile(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status}`);
        }
        return await response.text();
    }

    async loadJSON(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status}`);
        }
        return await response.json();
    }
}