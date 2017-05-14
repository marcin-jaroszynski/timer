import { Helper } from './../helper.js';

export class Minutes {
  static get(aTimeToConvert) {
    let strTime = Helper.convertToMinutes(aTimeToConvert);
    strTime += Helper.convertToSeconds(aTimeToConvert);
    return strTime;
  }
}