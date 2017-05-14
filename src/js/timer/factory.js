import * as TimerType from './type.js';
import * as TimerFormat from './format.js';
import { TimerUp } from './types/timer_up.js';
import { TimerDown } from './types/timer_down.js';

export class Factory {
  static getInstance(type, config) {
    switch (type) {
      case TimerType.UP:
      return new TimerUp(config);

      case TimerType.DOWN:
      return new TimerDown(config);
      
      default:
      return null;
    }
  }
}