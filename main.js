import { ProblemManager } from './problems/problems.js';
import { CodeExecutor } from './modules/codeExecutor.js';
import { TabManager } from './modules/tabManager.js';
import { TimerManager } from './modules/timerManager.js';
import { StorageManager } from './modules/storageManager.js';
import { ThemeManager } from './modules/themeManager.js';
import { ResizeManager } from './modules/resizeManager.js';

class LocalCodeIDE {
    constructor() {
        this.problemManager = new ProblemManager();
        this.codeExecutor = new CodeExecutor();
        this.tabManager = new TabManager();
        this.timerManager = new TimerManager();
        this.storageManager = new StorageManager();
        this.themeManager = new ThemeManager();
        this.resizeManager = new ResizeManager();
        
        this.codeEditor = null;
        this.currentProblem = null;
        this.isTimerRunning = false;
        this.viewMode = 'problem'; // 'problem' or 'solution'
        this.userCode = ''; // Store user's code when viewing solution
        
        // Make IDE instance globally accessible for button callbacks
        window.ide = this;
        
        this.init();
    }

    async init() {
        await this.initCodeEditor();
        await this.loadProblems();
        this.setupEventListeners();
        this.themeManager.init();
        this.resizeManager.init();
        this.loadUserData();
    }

    async initCodeEditor() {
        const textarea = document.getElementById('code-editor');
        
        this.codeEditor = CodeMirror.fromTextArea(textarea, {
            mode: 'javascript',
            theme: 'default',
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            styleActiveLine: true,
            indentUnit: 2,
            tabSize: 2,
            indentWithTabs: false,
            hintOptions: {
                hint: CodeMirror.hint.javascript,
                completeSingle: false
            },
            extraKeys: {
                "Ctrl-Space": "autocomplete"
            },
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
    }

    async loadProblems() {
        try {
            const problems = await this.problemManager.getProblems();
            const problemSelect = document.getElementById('problems');
            
            problems.forEach(problem => {
                const option = document.createElement('option');
                option.value = problem.id;
                option.textContent = problem.title;
                problemSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Failed to load problems:', error);
        }
    }

    setupEventListeners() {
        // Problem selection
        document.getElementById('problems').addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadProblem(e.target.value);
            }
        });

        // Timer controls
        document.getElementById('start-timer').addEventListener('click', () => {
            this.toggleTimer();
        });

        // Run samples
        document.getElementById('run-samples').addEventListener('click', () => {
            this.runSamples();
        });

        // Submit
        document.getElementById('submit').addEventListener('click', () => {
            this.submitSolution();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.themeManager.toggle();
            this.updateCodeEditorTheme();
        });

        // Modal controls
        document.getElementById('close-solution').addEventListener('click', () => {
            this.closeSolutionModal();
        });

        // Close modal on outside click
        document.getElementById('solution-modal').addEventListener('click', (e) => {
            if (e.target.id === 'solution-modal') {
                this.closeSolutionModal();
            }
        });
    }

    async loadProblem(problemId) {
        try {
            const problem = await this.problemManager.getProblem(problemId);
            this.currentProblem = problem;
            this.viewMode = 'problem';
            
            // Load problem statement with styled header
            this.displayProblemContent();
            
            // Load code template
            this.codeEditor.setValue(problem.template || '// Write your solution here\n');
            
            // Setup tabs
            this.tabManager.setupTabs(problem.sampleCases);
            
            // Load user's previous code if exists
            const savedCode = this.storageManager.getUserCode(problemId);
            if (savedCode) {
                this.codeEditor.setValue(savedCode);
            }
            
            // Reset timer
            this.timerManager.reset();
            
        } catch (error) {
            console.error('Failed to load problem:', error);
            alert('Failed to load problem. Please check the console for details.');
        }
    }

    toggleTimer() {
        const button = document.getElementById('start-timer');
        
        if (!this.isTimerRunning) {
            this.timerManager.start();
            this.isTimerRunning = true;
            button.textContent = 'Pause Timer';
            button.classList.remove('btn-primary');
            button.classList.add('btn-secondary');
        } else {
            this.timerManager.pause();
            this.isTimerRunning = false;
            button.textContent = 'Resume Timer';
            button.classList.remove('btn-secondary');
            button.classList.add('btn-primary');
        }
    }

    displayProblemContent() {
        const problemContent = document.getElementById('problem-content');
        const problem = this.currentProblem;
        
        if (this.viewMode === 'problem') {
            const submissions = this.storageManager.getSubmissions(problem.id);
            const canViewSolution = this.canViewSolution(submissions);
            
            problemContent.innerHTML = `
                <div class="problem-header">
                    <div class="problem-title-row">
                        <h1 class="problem-title">${problem.meta.title}</h1>
                        <div class="title-controls">
                    ${canViewSolution ? `
                        <span class="solution-button-container">
                            <button class="btn btn-ghost solution-toggle" onclick="window.ide?.toggleSolutionView()">
                                <span class="icon">💡</span>
                                Solution
                            </button>
                        </span>
                    ` : ''}
                            <span class="difficulty-badge difficulty-${problem.meta.difficulty.toLowerCase()}">${problem.meta.difficulty}</span>
                        </div>
                    </div>
                    
                    ${problem.meta.companies.length > 0 ? `
                        <div class="problem-companies">
                            <span class="companies-icon">🏢</span>
                            <span>Asked by: ${problem.meta.companies.join(", ")}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="problem-content">
                    ${marked.parse(problem.statement)}
                </div>
            `;
        } else {
            // Show solution
            this.displaySolutionContent();
        }
    }

    async displaySolutionContent() {
        try {
            const solution = await this.problemManager.getSolution(this.currentProblem.id);
            const problemContent = document.getElementById('problem-content');
            const problem = this.currentProblem;

            problemContent.innerHTML = `
                <div class="problem-header">
                    <div class="problem-title-row">
                        <h1 class="problem-title">${this.currentProblem.meta.title} - Solution</h1>
                        <div class="title-controls">
                            <span class="solution-button-container">
                                 <button class="btn btn-ghost solution-toggle" onclick="window.ide?.toggleSolutionView()">
                                     <span class="icon">📄</span>
                                     Problem
                                 </button>
                            </span>
                            <span class="difficulty-badge difficulty-${this.currentProblem.meta.difficulty.toLowerCase()}">${this.currentProblem.meta.difficulty}</span>
                        </div>
                    </div>
                    
                    <div class="problem-tags">
                        ${problem.meta.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>

                    
                <div class="problem-content">
                    ${marked.parse(solution.explanation)}
                </div>
            `;
            
            // Load solution code into editor
            this.codeEditor.setValue(solution.code);
        } catch (error) {
            console.error('Failed to load solution:', error);
        }
    }

    canViewSolution(submissions) {
        const hasSuccessfulSubmission = submissions.some(s => s.success);
        const hasThreeAttempts = submissions.length >= 3;
        return hasSuccessfulSubmission || hasThreeAttempts;
    }

    async toggleSolutionView() {
        if (!this.currentProblem) return;
        
        const submissions = this.storageManager.getSubmissions(this.currentProblem.id);
        if (!this.canViewSolution(submissions)) {
            alert('Solution not available yet. Complete the problem or make more attempts!');
            return;
        }
        
        if (this.viewMode === 'problem') {
            // Switch to solution view
            this.userCode = this.codeEditor.getValue(); // Save current code
            this.viewMode = 'solution';
            
            await this.displaySolutionContent();
        } else {
            // Switch back to problem view
            this.viewMode = 'problem';
            this.codeEditor.setValue(this.userCode); // Restore user's code
            this.displayProblemContent();
        }
    }

    async runSamples() {
        if (!this.currentProblem) {
            alert('Please select a problem first.');
            return;
        }

        const userCode = this.codeEditor.getValue();
        if (!userCode.trim()) {
            alert('Please write some code first.');
            return;
        }

        // Save user's code
        this.storageManager.saveUserCode(this.currentProblem.id, userCode);

        // Always run all samples
        await this.runAllSamples(userCode);
    }

    async runSingleSample(sampleIndex, userCode) {
        if (!userCode) {
            userCode = this.codeEditor.getValue();
        }
        
        // Get sample case from either built-in or custom cases
        let sampleCase;
        if (sampleIndex < this.currentProblem.sampleCases.length) {
            sampleCase = this.currentProblem.sampleCases[sampleIndex];
        } else {
            const customIndex = sampleIndex - this.currentProblem.sampleCases.length;
            sampleCase = this.tabManager.customSampleCases[customIndex];
        }
        
        if (!sampleCase) return;

        try {
            const result = await this.codeExecutor.execute(userCode, sampleCase, this.currentProblem.type);
            this.displaySampleResult(sampleIndex, result);
            this.tabManager.updateTabStatus(sampleIndex, result.success);
        } catch (error) {
            this.displaySampleResult(sampleIndex, { 
                success: false, 
                error: error.message 
            });
            this.tabManager.updateTabStatus(sampleIndex, false);
        }
    }

    async runAllSamples(userCode) {
        // Get all sample cases including custom ones
        const allSampleCases = [...this.currentProblem.sampleCases, ...this.tabManager.customSampleCases];
        
        for (let i = 0; i < allSampleCases.length; i++) {
            await this.runSingleSample(i, userCode);
        }
    }

    displaySampleResult(sampleIndex, result) {
        const resultDiv = document.querySelector(`#sample-${sampleIndex} .result`);
        if (!resultDiv) return;

        resultDiv.className = `result ${result.success ? 'success' : 'error'}`;
        
        if (result.success) {
            resultDiv.innerHTML = `<strong>✓ Passed</strong><br>Output: ${JSON.stringify(result.output)}`;
        } else {
            let errorMsg = `<strong>✗ Failed</strong><br>`;
            if (result.error) {
                errorMsg += `Error: ${result.error}`;
            } else {
                errorMsg += `Expected: ${JSON.stringify(result.expected)}<br>`;
                errorMsg += `Got: ${JSON.stringify(result.output)}`;
            }
            resultDiv.innerHTML = errorMsg;
        }
    }

    async submitSolution() {
        if (!this.currentProblem) {
            alert('Please select a problem first.');
            return;
        }

        const userCode = this.codeEditor.getValue();
        if (!userCode.trim()) {
            alert('Please write some code first.');
            return;
        }

        // Stop timer
        const solvingTime = this.timerManager.getElapsedTime();
        this.timerManager.pause();
        this.isTimerRunning = false;
        
        const button = document.getElementById('start-timer');
        button.textContent = 'Start Solving';
        button.classList.remove('btn-secondary');
        button.classList.add('btn-primary');

        // Run against test cases
        let passedTests = 0;
        let totalTests = this.currentProblem.testCases.length;
        let firstFailedTest = null;

        for (let i = 0; i < totalTests; i++) {
            try {
                const result = await this.codeExecutor.execute(
                    userCode, 
                    this.currentProblem.testCases[i], 
                    this.currentProblem.type
                );
                
                if (result.success) {
                    passedTests++;
                } else {
                    firstFailedTest = {
                        index: i + 1,
                        input: this.currentProblem.testCases[i].input,
                        expected: this.currentProblem.testCases[i].output,
                        got: result.output
                    };
                    break;
                }
            } catch (error) {
                firstFailedTest = {
                    index: i + 1,
                    input: this.currentProblem.testCases[i].input,
                    error: error.message
                };
                break;
            }
        }

        const submission = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            solvingTime: this.formatTime(solvingTime),
            passedTests,
            totalTests,
            success: passedTests === totalTests,
            code: userCode,
            firstFailedTest
        };

        // Save submission
        this.storageManager.saveSubmission(this.currentProblem.id, submission);

        // Update submissions tab
        this.tabManager.updateSubmissions(
            this.storageManager.getSubmissions(this.currentProblem.id)
        );

        // Show result
        this.showSubmissionResult(submission);
        
        // Update problem header to show solution button if now available
        this.displayProblemContent();
    }

    showSubmissionResult(submission) {
        if (submission.success) {
            alert(`🎉 Congratulations! All tests passed!\nSolving time: ${submission.solvingTime}`);
        } else {
            let message = `❌ Solution failed on test case ${submission.firstFailedTest.index}\n`;
            message += `Passed: ${submission.passedTests}/${submission.totalTests} tests\n`;
            message += `Input: ${JSON.stringify(submission.firstFailedTest.input)}\n`;
            
            if (submission.firstFailedTest.error) {
                message += `Error: ${submission.firstFailedTest.error}`;
            } else {
                message += `Expected: ${JSON.stringify(submission.firstFailedTest.expected)}\n`;
                message += `Got: ${JSON.stringify(submission.firstFailedTest.got)}`;
            }
            
            alert(message);
        }
        
        // Switch to submissions tab
        this.tabManager.switchTab('submissions');
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    updateCodeEditorTheme() {
        const isDark = document.documentElement.dataset.theme === 'dark';
        this.codeEditor.setOption('theme', isDark ? 'dracula' : 'default');
    }

    async showSolution() {
        if (!this.currentProblem) return;
        
        const submissions = this.storageManager.getSubmissions(this.currentProblem.id);
        const hasSuccessfulSubmission = submissions.some(s => s.success);
        const hasThreeAttempts = submissions.length >= 3;
        
        if (!hasSuccessfulSubmission && !hasThreeAttempts) {
            alert('Solution not available yet. Complete the problem or make more attempts!');
            return;
        }
        
        try {
            const solution = await this.problemManager.getSolution(this.currentProblem.id);
            const modal = document.getElementById('solution-modal');
            const content = document.getElementById('solution-content');
            
            content.innerHTML = `
                <div class="solution-explanation">
                    ${marked.parse(solution.explanation)}
                </div>
                <div class="solution-code">
                    <h4>Solution Code:</h4>
                    <pre><code>${solution.code}</code></pre>
                </div>
            `;
            
            modal.classList.add('show');
        } catch (error) {
            alert('Failed to load solution. Please try again.');
        }
    }

    closeSolutionModal() {
        document.getElementById('solution-modal').classList.remove('show');
    }

    loadSubmissionCode(submissionId) {
        if (!this.currentProblem) return;
        
        const submission = this.storageManager.getSubmission(this.currentProblem.id, submissionId);
        if (submission && submission.code) {
            this.codeEditor.setValue(submission.code);
        }
    }

    loadUserData() {
        // Restore theme preference
        this.themeManager.loadTheme();
        this.updateCodeEditorTheme();
        
        // Update placeholder content
        const problemContent = document.getElementById('problem-content');
        if (!this.currentProblem) {
            problemContent.innerHTML = `
                <div class="placeholder">
                    <div class="placeholder-icon">🎯</div>
                    <h3>Select a Problem</h3>
                    <p>Choose a coding challenge from the dropdown to get started</p>
                </div>
            `;
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new LocalCodeIDE();
});