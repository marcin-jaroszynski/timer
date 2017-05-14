import { Event } from '../../event.js';
import * as TimerEvent from '../event.js';
import { Converter as TimerConverter } from '../converter/converter.js';

export class Timer {
  constructor(config) {
    this.id = null;
    this.event = new Event();
    this.currentTime = config.currentTime ? config.currentTime : 0;
    this.tickTime = config.tickTime ? (config.tickTime * 1000) : 1000;
    this.repeatable = config.repeatable ? true : false; 
    this.format = config.format;
  }

  start() {
    let that = this;
    this.id = setInterval(function() {
      that._update();
      that.event.fire(TimerEvent.TICK, [that.currentTime, that.maxTime]);
    }, this.tickTime);

    if (this.id) {
      this.event.fire(TimerEvent.START);
    }
  }

  stop() {
    let elapsedTime = this.restart();
    return elapsedTime;
  }

  pause() {
    clearInterval(this.id);
    this.id = null;
    return this.currentTime;
  }

  restart() {
    let elapsedTime = this.pause();
    this._setInitCurrentTime();
    this.event.fire(TimerEvent.END, [elapsedTime]);
    return elapsedTime;
  }

  isPause() {
    return (this.id == null && this.currentTime > 0);
  }

  convert() {
    return TimerConverter.convert(this.currentTime, this.format);
  }

  _update() {
    
  }

  _setInitCurrentTime() {
    this.currentTime = 0;
  }
}