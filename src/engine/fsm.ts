class FSM {
    private state: string;
    private completedSessions: number;
    private cyclesForLongBreak: number;

    constructor(cyclesForLongBreak: number = 4) {
        this.state = 'Idle';
        this.completedSessions = 0;
        this.cyclesForLongBreak = cyclesForLongBreak;
    }

    public start() {
        if (this.state === 'Idle') {
            this.state = 'Study';
        }
    }

    public pause() {
        if (this.state === 'Study' || this.state === 'ShortBreak' || this.state === 'LongBreak') {
            this.state = 'Paused';
        }
    }

    public resume() {
        if (this.state === 'Paused') {
            this.state = this.getPreviousState();
        }
    }

    public reset() {
        this.state = 'Idle';
        this.completedSessions = 0;
    }

    public timerEnd() {
        if (this.state === 'Study') {
            this.completedSessions++;
            if (this.completedSessions % this.cyclesForLongBreak === 0) {
                this.state = 'LongBreak';
            } else {
                this.state = 'ShortBreak';
            }
        } else if (this.state === 'ShortBreak' || this.state === 'LongBreak') {
            this.state = 'Study';
        }
    }

    public finishDay() {
        this.state = 'Completed';
    }

    private getPreviousState(): string {
        switch (this.state) {
            case 'Study':
                return 'Study';
            case 'ShortBreak':
                return 'Study';
            case 'LongBreak':
                return 'Study';
            default:
                return 'Idle';
        }
    }

    public getState(): string {
        return this.state;
    }

    public getCompletedSessions(): number {
        return this.completedSessions;
    }
}

export default FSM;