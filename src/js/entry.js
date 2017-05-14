import * as TimerType from './timer/type.js';
import * as TimerFormat from './timer/format.js';
import * as TimerEvent from './timer/event.js';
import { Factory as TimerFactory } from './timer/factory.js';

window.onload = function() {
  let timerUpEl = document.getElementById('timer-up');
  let timerUp = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.HOURS, maxTime: 15});
  timerUp.start();
  timerUp.event.on(TimerEvent.TICK, function(currentTime, maxTime) {
    timerUpEl.innerHTML = timerUp.convert();
  });

  timerUp.event.on(TimerEvent.END, function(elapsedTime) {
    timerUpEl.innerHTML = timerUp.convert();
  });

  let timerDownEl = document.getElementById('timer-down');
  let timerDown = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.MINUTES, currentTime: 10, repeatable: true});
  timerDown.start();
  timerDown.event.on(TimerEvent.TICK, function(currentTime, maxTime) {
    timerDownEl.innerHTML = timerDown.convert();
  });
}

