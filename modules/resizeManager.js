export class ResizeManager {
    constructor() {
        this.isResizing = false;
        this.resizeHandle = null;
    }

    init() {
        this.setupVerticalResize();
        this.setupHorizontalResize();
    }

    setupVerticalResize() {
        const verticalHandle = document.getElementById('vertical-resize');
        const problemPanel = document.getElementById('problem-panel');
        const rightContainer = document.querySelector('.right-container');

        let startX, startWidthProblem, startWidthRight;

        verticalHandle.addEventListener('mousedown', (e) => {
            this.isResizing = true;
            this.resizeHandle = 'vertical';
            startX = e.clientX;
            startWidthProblem = problemPanel.offsetWidth;
            startWidthRight = rightContainer.offsetWidth;
            
            document.addEventListener('mousemove', handleVerticalResize);
            document.addEventListener('mouseup', stopResize);
            
            // Prevent text selection during resize
            document.body.style.userSelect = 'none';
        });

        const handleVerticalResize = (e) => {
            if (!this.isResizing || this.resizeHandle !== 'vertical') return;

            const deltaX = e.clientX - startX;
            const containerWidth = document.querySelector('.panel-container').offsetWidth;
            
            const newProblemWidth = startWidthProblem + deltaX;
            const minWidth = 300;
            const maxWidth = containerWidth - 300; // Ensure right side has min 300px

            if (newProblemWidth >= minWidth && newProblemWidth <= maxWidth) {
                const problemPercent = (newProblemWidth / containerWidth) * 100;
                problemPanel.style.width = `${problemPercent}%`;
            }
        };

        const stopResize = () => {
            this.isResizing = false;
            this.resizeHandle = null;
            document.removeEventListener('mousemove', handleVerticalResize);
            document.removeEventListener('mouseup', stopResize);
            document.body.style.userSelect = '';
        };
    }

    setupHorizontalResize() {
        const horizontalHandle = document.getElementById('horizontal-resize');
        const editorPanel = document.getElementById('editor-panel');
        const resultsPanel = document.getElementById('results-panel');

        let startY, startHeightEditor, startHeightResults;

        horizontalHandle.addEventListener('mousedown', (e) => {
            this.isResizing = true;
            this.resizeHandle = 'horizontal';
            startY = e.clientY;
            startHeightEditor = editorPanel.offsetHeight;
            startHeightResults = resultsPanel.offsetHeight;
            
            document.addEventListener('mousemove', handleHorizontalResize);
            document.addEventListener('mouseup', stopResize);
            
            document.body.style.userSelect = 'none';
        });

        const handleHorizontalResize = (e) => {
            if (!this.isResizing || this.resizeHandle !== 'horizontal') return;

            const deltaY = e.clientY - startY;
            const containerHeight = document.querySelector('.right-container').offsetHeight;
            
            const newEditorHeight = startHeightEditor + deltaY;
            const minHeight = 200;
            const maxHeight = containerHeight - 200; // Ensure results panel has min 200px

            if (newEditorHeight >= minHeight && newEditorHeight <= maxHeight) {
                editorPanel.style.flex = 'none';
                editorPanel.style.height = `${newEditorHeight}px`;
                resultsPanel.style.height = `${containerHeight - newEditorHeight - 4}px`; // 4px for handle
            }
        };

        const stopResize = () => {
            this.isResizing = false;
            this.resizeHandle = null;
            document.removeEventListener('mousemove', handleHorizontalResize);
            document.removeEventListener('mouseup', stopResize);
            document.body.style.userSelect = '';
        };
    }
}