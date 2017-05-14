import {assert} from 'chai';
import * as TimerType from '../src/js/timer/type.js';
import * as TimerFormat from '../src/js/timer/format.js';
import { Factory as TimerFactory } from '../src/js/timer/factory.js';
import { TimerUp } from '../src/js/timer/types/timer_up.js';
import { TimerDown } from '../src/js/timer/types/timer_down.js';
import { Converter as TimerConverter } from '../src/js/timer/converter/converter.js';
import { Helper as TimerConverterHelper } from '../src/js/timer/converter/helper.js';

describe('Creating instances', function() {
  it('Instance object class of TimerUp', function() {
     var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS});
     assert.ok(timerInstance instanceof TimerUp);
  });
 
  it('Instance object class of TimerDown', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.SECONDS});
    assert.ok(timerInstance instanceof TimerDown);
  });

  it('Not exist instance', function() {
    var timerInstance = TimerFactory.getInstance(-1, {format: TimerFormat.SECONDS});
    assert.ok(timerInstance === null);
  });
});

describe('Tick time', function() {
  it('Initializng tick time(default - 1 second)', function() {
     var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS});
     assert.ok(timerInstance.tickTime === 1000);
  });

  it('Initializng tick time some value', function() {
     var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS, tickTime: 3});
      assert.ok(timerInstance.tickTime === 3000);
  });
});

describe('Timer up', function() {
  it('Update timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS});
    timerInstance._update();
    timerInstance._update();
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 3);
  });
  
  it('Init maxTime as string(invalid value), it should be set as 0', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS, maxTime: 'foo'});
    assert.ok(timerInstance.maxTime === 0);
  });

  it('Init maxTime below 0(invalid value), it should be set as 0', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS, maxTime: -15});
    assert.ok(timerInstance.maxTime === 0);
  });

  it('Do not init maxTime, by default it should be set as 0', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS});
    assert.ok(timerInstance.maxTime === 0);
  });

  it('Init maxTime to 15, it should be set as 15', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS, maxTime: 15});
    assert.ok(timerInstance.maxTime === 15);
  });

  it('With setted maxTime, after reach counter to maximum next update reset counter', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS, maxTime: 3});
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 1, 'It should be 1!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 2, 'It should be 2!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 3, 'It should be 3(maximum)!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 0, 'It should be 0(start count from beginning)!');
    assert.ok(timerInstance.id === null, 'ID timer is NULL!');
  });

  it('Without setted maxTime, after reach counter to maximum next update reset counter', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS});
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 1, 'It should be 1!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 2, 'It should be 2!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 3, 'It should be 3(maximum)!');
    timerInstance.stop();
    assert.ok(timerInstance.currentTime === 0, 'It should be 0(start count from beginning)!');
    assert.ok(timerInstance.id === null, 'ID timer is NULL!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 1, 'It should be 1!');
  });

  it('Restart timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS, maxTime: 5});  
    timerInstance._update();
    timerInstance._update();
    timerInstance._update();
    timerInstance.restart();
    assert.ok(timerInstance.currentTime === 0, 'It should be 0!');
  });

  it('Stop timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS, maxTime: 5});
    timerInstance._update();
    timerInstance._update();
    var elapsedTime = timerInstance.stop();
    assert.ok(timerInstance.id === null, 'Id should be NULL!');
    assert.ok(timerInstance.currentTime === 0, 'currentTime should be 0!');
    assert.ok(elapsedTime === 2, 'After two update timer, it should elaps 2');
  });

  it('Pause timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS});
    timerInstance.start();
    timerInstance._update();
    timerInstance._update();
    timerInstance.pause();
    assert.ok(timerInstance.isPause() === true, 'The timer is paused');
  });

  it('Repeatable timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.SECONDS, maxTime: 3, repeatable: true});
    assert.ok(timerInstance.currentTime === 0, 'Before update, current time is 0!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 1, 'Current time should be 1!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 2, 'Current time should be 2!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 3, 'Current time should be 3!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 0, 'Next iteration. Current time should be 0!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 1, 'Current time should be 1!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 2, 'Current time should be 2!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 3, 'Current time should be 3!');
  });
});

describe('Timer down', function() {
  it('Update timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.SECONDS, currentTime: 3});
    timerInstance._update();
    timerInstance._update();
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 0, 'Timer is 0!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 3, 'After next update timer is 0!');
  });

  it('Restart timer', function() {
    var startTime = 15;
    var timerInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.SECONDS, currentTime: startTime});
    timerInstance._update();
    timerInstance._update();
    timerInstance._update();
    timerInstance.restart();
    assert.ok(timerInstance.currentTime === startTime, 'It should be ' + startTime +' !');
  });

  it('Stop timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.SECONDS, currentTime: 15});
    timerInstance._update();
    timerInstance._update();
    var elapsedTime = timerInstance.stop();
    assert.ok(timerInstance.id === null, 'Id should be NULL!');
    assert.ok(timerInstance.currentTime === 15, 'currentTime should be 15!');
    assert.ok(elapsedTime === 2, 'After two update timer, elapsed time should be 2');
  });

  it('Pause timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.SECONDS, currentTime: 15});
    timerInstance.start();
    timerInstance._update();
    timerInstance._update();
    assert.ok(timerInstance.isPause() === false, 'The timer is not paused');
  });

  it('Repeatable timer', function() {
    var timerInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.SECONDS, currentTime: 3, repeatable: true});
    assert.ok(timerInstance.currentTime === 3, 'Before update, current time is 3!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 2, 'Current time should be 2!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 1, 'Current time should be 1!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 0, 'Current time should be 0!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 3, 'Next iteration. Current time should be 3!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 2, 'Current time should be 2!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 1, 'Current time should be 1!');
    timerInstance._update();
    assert.ok(timerInstance.currentTime === 0, 'Current time should be 0!');
  });
});

describe('TimerConverter tests', function() {
  it('Seconds', function() {
    assert.ok(TimerConverterHelper.convertToSeconds(null) === "00", 'Seconds (1)');
    assert.ok(TimerConverterHelper.convertToSeconds('test') === "00", 'Seconds (2)');
    assert.ok(TimerConverterHelper.convertToSeconds(undefined) === "00", 'Seconds (3)');
    assert.ok(TimerConverterHelper.convertToSeconds(NaN) === "00", 'Seconds (4)');
    assert.ok(TimerConverterHelper.convertToSeconds(-1) === "00", 'Seconds (5)');
    assert.ok(TimerConverterHelper.convertToSeconds([]) === "00", 'Seconds (6)');
    assert.ok(TimerConverterHelper.convertToSeconds({}) === "00", 'Seconds (7)');
    assert.ok(TimerConverterHelper.convertToSeconds(0) === "00", 'Seconds (8)');
    assert.ok(TimerConverterHelper.convertToSeconds(1) === "01", 'Seconds (9)');
    assert.ok(TimerConverterHelper.convertToSeconds(10) === "10", 'Seconds (10)');
    assert.ok(TimerConverterHelper.convertToSeconds(59) === "59", 'Seconds (11)');
    assert.ok(TimerConverterHelper.convertToSeconds(60) === "00", 'Seconds (12)');
  });

  it('Minutes', function() {
    assert.ok(TimerConverterHelper.convertToMinutes(null) === "00:", 'Minutes (1)');
    assert.ok(TimerConverterHelper.convertToMinutes('test') === "00:", 'Minutes (2)');
    assert.ok(TimerConverterHelper.convertToMinutes(undefined) === "00:", 'Minutes (3)');
    assert.ok(TimerConverterHelper.convertToMinutes(NaN) === "00:", 'Minutes (4)');
    assert.ok(TimerConverterHelper.convertToMinutes(-1) === "00:", 'Minutes (5)');
    assert.ok(TimerConverterHelper.convertToMinutes([]) === "00:", 'Minutes (6)');
    assert.ok(TimerConverterHelper.convertToMinutes({}) === "00:", 'Minutes (7)');
    assert.ok(TimerConverterHelper.convertToMinutes(0) === "00:", 'Minutes (8)');
    assert.ok(TimerConverterHelper.convertToMinutes(1) === "00:", 'Minutes (9)');
    assert.ok(TimerConverterHelper.convertToMinutes(59) === "00:", 'Minutes (10)');
    assert.ok(TimerConverterHelper.convertToMinutes(60) === "01:", 'Minutes (11)');
    assert.ok(TimerConverterHelper.convertToMinutes(119) === "01:", 'Minutes (12)');
    assert.ok(TimerConverterHelper.convertToMinutes(120) === "02:", 'Minutes (13)');
    assert.ok(TimerConverterHelper.convertToMinutes(3599) === "59:", 'Minutes (14)');
    assert.ok(TimerConverterHelper.convertToMinutes(3600) === "00:", 'Minutes (15)');
  });

  it('Hours', function() {
    assert.ok(TimerConverterHelper.convertToHours(null) === "00:", 'Hours (1)');
    assert.ok(TimerConverterHelper.convertToHours('test') === "00:", 'Hours (2)');
    assert.ok(TimerConverterHelper.convertToHours(undefined) === "00:", 'Hours (3)');
    assert.ok(TimerConverterHelper.convertToHours(NaN) === "00:", 'Hours (4)');
    assert.ok(TimerConverterHelper.convertToHours(-1) === "00:", 'Hours (5)');
    assert.ok(TimerConverterHelper.convertToHours([]) === "00:", 'Hours (6)');
    assert.ok(TimerConverterHelper.convertToHours({}) === "00:", 'Hours (7)');
    assert.ok(TimerConverterHelper.convertToHours(0) === "00:", 'Hours (8)');
    assert.ok(TimerConverterHelper.convertToHours(1) === "00:", 'Hours (9)');
    assert.ok(TimerConverterHelper.convertToHours(60) === "00:", 'Hours (10)');
    assert.ok(TimerConverterHelper.convertToHours(3599) === "00:", 'Hours (11)');
    assert.ok(TimerConverterHelper.convertToHours(3600) === "01:", 'Hours (12)');
    assert.ok(TimerConverterHelper.convertToHours(7200) === "02:", 'Hours (13)');
    assert.ok(TimerConverterHelper.convertToHours(86400) === "24:", 'Hours (14)');
  });
});


describe('Format display timer', function() {
  it('Seconds', function() { 
    var secondsInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.SECONDS, currentTime: 39});
    assert.ok(TimerConverter.convert(secondsInstance.currentTime, TimerFormat.SECONDS) == "39");
  });

  it('Minutes', function() {
    var minutesInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.MINUTES, currentTime: 80});
    assert.ok(TimerConverter.convert(minutesInstance.currentTime, TimerFormat.MINUTES) === "01:20");
  });

  it('Hours', function() {
    var houresInstance = TimerFactory.getInstance(TimerType.DOWN, {format: TimerFormat.HOURS, currentTime: 3605});
    assert.ok(TimerConverter.convert(houresInstance.currentTime, TimerFormat.HOURS) === "01:00:05");
  });
});