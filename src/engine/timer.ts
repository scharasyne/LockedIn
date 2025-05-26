import { useEffect, useRef } from 'react';

type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export class Timer {
    private duration: number;
    private remaining: number;
    private state: TimerState;
    private intervalId: NodeJS.Timeout | null;
    private onTick: (remaining: number) => void;
    private onComplete: () => void;

    constructor(duration: number, onTick: (remaining: number) => void, onComplete: () => void) {
        this.duration = duration;
        this.remaining = duration;
        this.state = 'idle';
        this.intervalId = null;
        this.onTick = onTick;
        this.onComplete = onComplete;
    }

    start() {
        if (this.state === 'idle' || this.state === 'paused') {
            this.state = 'running';
            this.intervalId = setInterval(() => {
                this.remaining -= 1000;
                this.onTick(this.remaining);

                if (this.remaining <= 0) {
                    this.complete();
                }
            }, 1000);
        }
    }

    pause() {
        if (this.state === 'running') {
            this.state = 'paused';
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    }

    resume() {
        if (this.state === 'paused') {
            this.start();
        }
    }

    reset() {
        this.state = 'idle';
        this.remaining = this.duration;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.onTick(this.remaining);
    }

    private complete() {
        this.state = 'completed';
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.onComplete();
    }
}