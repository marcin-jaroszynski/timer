import { Timer } from './timer.js';

export class TimerDown extends Timer {
  constructor(config) {
    super(config);
    this.initTime = config.currentTime;
  }

  restart() {
    let elapsedTime = super.restart();
    return elapsedTime;
  }

  stop() {
    var elapsedTime = super.stop();
    return this.initTime - elapsedTime;
  }

  _update() {
    if (this.currentTime > 0) {
      this.currentTime--;
    } else {
      if (this.repeatable) {
        this.stop();
        this.start();
      } else {
        this.stop();
      }
    }
  }

  _setInitCurrentTime() {
    this.currentTime = this.initTime;
  }
}