export class StorageManager {
    constructor() {
        this.prefix = 'localcode_';
    }

    // User code storage
    saveUserCode(problemId, code) {
        const key = `${this.prefix}code_${problemId}`;
        localStorage.setItem(key, code);
    }

    getUserCode(problemId) {
        const key = `${this.prefix}code_${problemId}`;
        return localStorage.getItem(key);
    }

    // Submissions storage
    saveSubmission(problemId, submission) {
        const key = `${this.prefix}submissions_${problemId}`;
        const submissions = this.getSubmissions(problemId);
        submissions.push(submission);
        localStorage.setItem(key, JSON.stringify(submissions));
    }

    getSubmissions(problemId) {
        const key = `${this.prefix}submissions_${problemId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    getSubmission(problemId, submissionId) {
        const submissions = this.getSubmissions(problemId);
        return submissions.find(s => s.id == submissionId);
    }

    // Theme storage
    saveTheme(theme) {
        localStorage.setItem(`${this.prefix}theme`, theme);
    }

    getTheme() {
        return localStorage.getItem(`${this.prefix}theme`) || 'light';
    }

    // Clear all data
    clearAllData() {
        const keys = Object.keys(localStorage).filter(key => 
            key.startsWith(this.prefix));
        keys.forEach(key => localStorage.removeItem(key));
    }

    // Export/Import functionality
    exportData() {
        const data = {};
        const keys = Object.keys(localStorage).filter(key => 
            key.startsWith(this.prefix));
        
        keys.forEach(key => {
            data[key] = localStorage.getItem(key);
        });

        return JSON.stringify(data, null, 2);
    }

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            Object.keys(data).forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.setItem(key, data[key]);
                }
            });
            return true;
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    }
}