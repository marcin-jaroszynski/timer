import { Helper } from './../helper.js';

export class Hours {
  static get(aTimeToConvert) {
    let strTime = Helper.convertToHours(aTimeToConvert);
    strTime += Helper.convertToMinutes(aTimeToConvert);
    strTime += Helper.convertToSeconds(aTimeToConvert);
    return strTime;
  }
}