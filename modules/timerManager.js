export class TimerManager {
    constructor() {
        this.startTime = null;
        this.elapsed = 0;
        this.interval = null;
        this.display = document.getElementById('stopwatch');
    }

    start() {
        this.startTime = Date.now() - this.elapsed * 1000;
        this.interval = setInterval(() => {
            this.elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateDisplay();
        }, 1000);
    }

    pause() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    reset() {
        this.pause();
        this.elapsed = 0;
        this.updateDisplay();
    }

    getElapsedTime() {
        return this.elapsed;
    }

    updateDisplay() {
        const hours = Math.floor(this.elapsed / 3600);
        const minutes = Math.floor((this.elapsed % 3600) / 60);
        const seconds = this.elapsed % 60;
        
        this.display.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}