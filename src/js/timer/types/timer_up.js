import { Timer } from './timer.js';

export class TimerUp extends Timer {
  constructor(config) {
    super(config);
    this.maxTime = parseInt(config.maxTime);
    if (0 > this.maxTime || isNaN(this.maxTime)) {
      this.maxTime = 0;
    }
  }

  restart() {
    let elapsedTime = super.restart();
    return elapsedTime;
  }


  _update() {
    if (this.maxTime === 0 || this.maxTime > this.currentTime) {
      this.currentTime++;
    } else {
      if (this.repeatable) {
        this.restart();
      } else {
        this.stop();
      }
    }
  }

  _setInitCurrentTime() {
    this.currentTime = 0;
  }
}