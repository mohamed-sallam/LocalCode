export class TabManager {
    constructor() {
        this.activeTab = null;
        this.customSampleCases = [];
        this.tabStatuses = new Map(); // Track pass/fail status for each tab
    }

    setupTabs(sampleCases) {
        this.customSampleCases = [];
        this.tabStatuses.clear();
        const tabsHeader = document.getElementById('tabs-header');
        const tabsContent = document.getElementById('tabs-content');
        
        // Clear existing tabs
        tabsHeader.innerHTML = '';
        tabsContent.innerHTML = '';

        // Create sample case tabs
        sampleCases.forEach((sampleCase, index) => {
            this.createSampleTab(index, sampleCase);
        });

        // Create add sample case button
        this.createAddTabButton();

        // Create submissions tab
        this.createSubmissionsTab();

        // Activate first tab
        if (sampleCases.length > 0) {
            this.switchTab(`sample-0`);
        }
    }

    createSampleTab(index, sampleCase, isCustom = false) {
        const tabsHeader = document.getElementById('tabs-header');
        const tabsContent = document.getElementById('tabs-content');

        // Create tab button
        const tabButton = document.createElement('button');
        tabButton.className = `tab-button ${isCustom ? 'closeable' : ''}`;
        tabButton.setAttribute('data-tab', `sample-${index}`);
        tabButton.innerHTML = `<span class="tab-text">Sample ${index + 1}</span><span class="tab-status"></span>`;
        
        if (isCustom) {
            const closeButton = document.createElement('button');
            closeButton.className = 'tab-close';
            closeButton.innerHTML = '×';
            closeButton.onclick = (e) => {
                e.stopPropagation();
                this.removeCustomTab(index);
            };
            tabButton.appendChild(closeButton);
        }

        tabButton.onclick = () => this.switchTab(`sample-${index}`);
        tabsHeader.insertBefore(tabButton, tabsHeader.querySelector('.add-tab'));

        // Create tab content
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = `sample-${index}`;
        tabContent.innerHTML = `
            <div class="sample-case">
                <div class="input-section">
                    <label>Input:</label>
                    <textarea readonly>${JSON.stringify(sampleCase.input, null, 2)}</textarea>
                </div>
                <div class="output-section">
                    <label>Expected Output:</label>
                    <textarea readonly>${JSON.stringify(sampleCase.output, null, 2)}</textarea>
                </div>
                <div class="actions">
                    <button class="btn btn-primary" onclick="window.ide?.runSingleSample(${index})">
                        Run This Sample
                    </button>
                </div>
                <div class="result"></div>
            </div>
        `;

        tabsContent.appendChild(tabContent);
    }

    rebuildCustomTabs() {
        // Remove all existing custom tabs
        const customTabs = document.querySelectorAll('.tab-button.closeable');
        customTabs.forEach(tab => {
            const tabId = tab.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tab) tab.remove();
            if (tabContent) tabContent.remove();
        });
        
        // Recreate custom tabs with correct indices
        const builtInSampleCount = window.ide?.currentProblem?.sampleCases?.length || 0;
        this.customSampleCases.forEach((customCase, i) => {
            const index = builtInSampleCount + i;
            this.createSampleTab(index, customCase, true);
        });
    }

    createAddTabButton() {
        const tabsHeader = document.getElementById('tabs-header');
        
        const addButton = document.createElement('button');
        addButton.className = 'tab-button add-tab';
        addButton.textContent = '+';
        addButton.title = 'Add custom sample case';
        addButton.onclick = () => this.addCustomSampleCase();
        
        tabsHeader.appendChild(addButton);
    }

    createSubmissionsTab() {
        const tabsHeader = document.getElementById('tabs-header');
        const tabsContent = document.getElementById('tabs-content');

        // Create tab button
        const tabButton = document.createElement('button');
        tabButton.className = 'tab-button';
        tabButton.setAttribute('data-tab', 'submissions');
        tabButton.textContent = 'Submissions';
        tabButton.onclick = () => this.switchTab('submissions');
        
        tabsHeader.appendChild(tabButton);

        // Create tab content
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = 'submissions';
        tabContent.innerHTML = `
            <div class="submissions-container">
                <table class="submissions-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Pass Rate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="submissions-tbody">
                        <tr>
                            <td colspan="5" style="text-align: center; color: var(--text-muted);">
                                No submissions yet
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="submissions-actions">
                </div>
            </div>
        `;

        tabsContent.appendChild(tabContent);
    }

    addCustomSampleCase() {
        const input = prompt('Enter input (JSON format):');
        if (!input) return;

        try {
            const parsedInput = JSON.parse(input);
            
            this.computeExpectedOutput(parsedInput);
            
        } catch (error) {
            alert('Invalid JSON format. Please try again.');
        }
    }
    
    async computeExpectedOutput(parsedInput) {
        if (!window.ide || !window.ide.currentProblem) {
            // If no problem loaded, create sample case with null output and let user define it
            const output = prompt('Enter expected output (JSON format):');
            if (output === null) return; // User cancelled
            
            try {
                const parsedOutput = JSON.parse(output);
                this.createCustomSampleCaseWithOutput(parsedInput, parsedOutput);
            } catch (error) {
                alert('Invalid JSON format for output. Please try again.');
            }
            return;
        }

        try {
            const response = await fetch(`problems/${window.ide.currentProblem.id}/solution.js`);
            if (!response.ok) {
                // If solution file not available, ask user for expected output
                const output = prompt('Solution file not available. Enter expected output (JSON format):');
                if (output === null) return; // User cancelled
                
                try {
                    const parsedOutput = JSON.parse(output);
                    this.createCustomSampleCaseWithOutput(parsedInput, parsedOutput);
                } catch (error) {
                    alert('Invalid JSON format for output. Please try again.');
                }
                return;
            }
            
            const solutionCode = await response.text();
            
            // Create a test case with the custom input
            const testCase = {
                input: Array.isArray(parsedInput) ? parsedInput : [parsedInput],
                output: null
            };
            
            // Execute the official solution
            const result = await window.ide.codeExecutor.execute(
                solutionCode, 
                testCase, 
                window.ide.currentProblem.type
            );
            
            this.createCustomSampleCaseWithOutput(parsedInput, result.output);
            
        } catch (error) {
            console.error('Error computing expected output:', error);
            // If computation fails, ask user for expected output
            const output = prompt('Could not compute expected output automatically. Enter expected output (JSON format):');
            if (output === null) return; // User cancelled
            
            try {
                const parsedOutput = JSON.parse(output);
                this.createCustomSampleCaseWithOutput(parsedInput, parsedOutput);
            } catch (parseError) {
                alert('Invalid JSON format for output. Please try again.');
            }
        }
    }
    
    createCustomSampleCaseWithOutput(parsedInput, expectedOutput) {
        const customCase = {
            input: parsedInput,
            output: expectedOutput,
            isCustom: true
        };

        this.customSampleCases.push(customCase);
        const builtInSampleCount = window.ide?.currentProblem?.sampleCases?.length || 0;
        const index = builtInSampleCount + this.customSampleCases.length - 1;
        
        this.createSampleTab(index, customCase, true);
        this.switchTab(`sample-${index}`);
    }
    removeCustomTab(index) {
        // Find the custom case index
        const builtInSampleCount = window.ide?.currentProblem?.sampleCases?.length || 0;
        const customIndex = index - builtInSampleCount;
        
        if (customIndex >= 0 && customIndex < this.customSampleCases.length) {
            this.customSampleCases.splice(customIndex, 1);
        }
        
        const tabButton = document.querySelector(`[data-tab="sample-${index}"]`);
        const tabContent = document.getElementById(`sample-${index}`);
        
        if (tabButton) tabButton.remove();
        if (tabContent) tabContent.remove();

        // Rebuild all custom tabs with correct indices
        this.rebuildCustomTabs();
        
        // Switch to first available tab
        const firstTab = document.querySelector('[data-tab^="sample-"]');
        if (firstTab) {
            this.switchTab(firstTab.getAttribute('data-tab'));
        }
    }

    updateTabStatus(sampleIndex, success) {
        this.tabStatuses.set(sampleIndex, success);
        const tabButton = document.querySelector(`[data-tab="sample-${sampleIndex}"]`);
        if (tabButton) {
            const statusSpan = tabButton.querySelector('.tab-status');
            if (statusSpan) {
                statusSpan.innerHTML = success ? ' ✓' : ' ✗';
                statusSpan.className = `tab-status ${success ? 'success' : 'error'}`;
            }
        }
    }

    switchTab(tabId) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-button').forEach(btn => 
            btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => 
            content.classList.remove('active'));

        // Add active class to selected tab
        const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
        const tabContent = document.getElementById(tabId);

        if (tabButton && tabContent) {
            tabButton.classList.add('active');
            tabContent.classList.add('active');
            this.activeTab = tabId;
            
            // If switching to submissions tab, update submissions
            if (tabId === 'submissions' && window.ide && window.ide.currentProblem) {
                const submissions = window.ide.storageManager.getSubmissions(window.ide.currentProblem.id);
                this.updateSubmissions(submissions);
            }
        }
    }

    getActiveTab() {
        return this.activeTab;
    }

    updateSubmissions(submissions) {
        const tbody = document.getElementById('submissions-tbody');
        if (!tbody) return;

        if (submissions.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--text-muted);">
                        No submissions yet
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = submissions.map((submission, index) => `
            <tr onclick="window.ide?.loadSubmissionCode(${submission.id})" class="submission-row">
                <td>${submissions.length - index}</td>
                <td>${submission.date}</td>
                <td>${submission.solvingTime}</td>
                <td>${submission.passedTests}/${submission.totalTests} (${Math.round(submission.passedTests / submission.totalTests * 100)}%)</td>
                <td class="${submission.success ? 'status-pass' : 'status-fail'}">
                    ${submission.success ? 'Pass' : 'Fail'}
                </td>
            </tr>
        `).join('');
    }
}