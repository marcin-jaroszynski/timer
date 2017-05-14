import * as TimerFormat from './../format.js';
import { Hours } from './types/hours.js';
import { Minutes } from './types/minutes.js';
import { Seconds } from './types/seconds.js';

export class Converter {
  static convert(aTimerToConvert, aTimerFormat) {
    switch (aTimerFormat) {
      case TimerFormat.HOURS:
      return Hours.get(aTimerToConvert);

      case TimerFormat.MINUTES:
      return Minutes.get(aTimerToConvert);

      case TimerFormat.SECONDS:
      return Seconds.get(aTimerToConvert);
    }
  }
}