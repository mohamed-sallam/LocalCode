export class ThemeManager {
    constructor() {
        this.storageKey = 'localcode_theme';
        this.toggle = this.toggle.bind(this);
    }

    init() {
        this.loadTheme();
        this.updateToggleButton();
    }

    toggle() {
        const currentTheme = document.documentElement.dataset.theme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(this.storageKey, theme);
        this.updateToggleButton();
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme } 
        }));
    }

    getTheme() {
        return document.documentElement.dataset.theme || 'light';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem(this.storageKey) || 'light';
        this.setTheme(savedTheme);
    }

    updateToggleButton() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            const isDark = this.getTheme() === 'dark';
            button.textContent = isDark ? '☀️' : '🌙';
            button.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
        }
    }
}