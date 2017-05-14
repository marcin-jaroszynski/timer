# Features

Timer is simple library that give you to create timer, that:
- Two types:
  - Up - that count up time.
  - Down - that count down time.
- Format display timer: seconds, minutes, hours.
- Set to maximum time to count.
- Set timer to be repeatable.
- Handle three events: Start, Tick, End.

## Setup Project

Commands:

To install:
```
make install
```

To run development mode:
```
make dev
```

To run production mode:
```
make prod
```

To run tests:
```
make testing
```

## Types of timer
1. UP - This type of timer count up time. You can set maximum time value to count up. 
2. DOWN - This type of timer count down time. 

Both types of timer you can set as repeatable.

## Creating timer
To create timer use getInstance method from timer factory:
```
let timerUp = TimerFactory.getInstance(TimerType.UP, {format: TimerFormat.HOURS});
```

## Configuratiom timer
In first argument you set type of timer, there are two types:
- TimerType.UP
- TimerType.DOWN

In second argument you set attributes of your timer:
- **format** - Type of display format your timer. You can set:
  - TimerFormat.SECONDS - Seconds display format.
  - TimerFormat.MINUTES - Minutes display format.
  - TimerFormat.HOURS - Hours display format.

- **currentTime** - Current time given in seconds from which timer must start counting time. Default value is: **0**.

- **tickTime** - Amount of time given in milliseconds after elaps timer will execute tick event and update counter of timer. Default value is: **1000** milliseconds(1 second).

- **repeatable** - Tells whether timer will repeat counting after elaps specific amount of time. For type of timer: **UP** if attribute: **repeateable** is set to: **true** you have to also set value for attribute: **maxTime**. Default value is: **false**.

- **maxTime** - Maximum value to counting up time. After elaps this amount of time, the timer will be stopped if attribute: **repeatable** is setted to: **false** otherwise timer will be reset and count up again. Default value is: **0**.

## Methods timer
- **start** - Start timer counting.

- **stop** - Stop timer counting.

- **pause** - Pause timer counting.

- **restart** - Restart timer.

- **isPause** - Returns: **true** if timer is paused or: **false** otherwise.

- **convert** - Returns current time of timer as a string in specific format defined in attribute: **format**.

## Events timer
You can handle three types of events:

- **START** - This event is execute when timer is start counting(when method of timer: **start** has been called). Example:
```
timerInstance.event.on(TimerEvent.START, function() {
  console.log('Timer start counting!');
});
```

- **TICK** - This event is execute always after elaps specific amount of time defined in attribute: **tickTime**. Returns two arguments: **currentTime** - current time of timer given in seconds, and: **maxTime** - Maximum time of timer to counting. Example:
```
timerInstance.event.on(TimerEvent.END, function(currentTime, maxTime) {
  console.log('Current time: ' + currentTime);
});
```

- **END** - This event is execute when timer stop counting. Returns one argument: **elapsedTime** - Elapsed time after stop of timer given in seconds. Example:
```
timerInstance.event.on(TimerEvent.END, function(elapsedTime) {
  console.log('Timer is stopped. Elapsed time: ' + elapsedTime);
});
```