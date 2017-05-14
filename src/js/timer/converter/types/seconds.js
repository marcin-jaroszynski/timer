import { Helper } from './../helper.js';

export class Seconds {
  static get(aTimeToConvert) {
    return Helper.convertToSeconds(aTimeToConvert);
  }
}