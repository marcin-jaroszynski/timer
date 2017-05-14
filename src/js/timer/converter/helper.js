export class Helper {
  static convertToHours(aTimeToConvert) {
    var strHours = '';
    if (this._isValidInteger(aTimeToConvert)) {
      let hours = Math.floor((aTimeToConvert / 60) / 60);
      if (10 > hours) {
        strHours += '0' + hours + ':';
      } else {
        strHours = hours + ':';
      }
    } else {
      strHours = '00:';
    }
    return strHours.toString();
  }

  static convertToMinutes(aTimeToConvert) {
    var strMinutes = '';
    if (this._isValidInteger(aTimeToConvert)) {
      let minutes = Math.floor((aTimeToConvert / 60) % 60);
      if (10 > minutes) {
        strMinutes = '0' + minutes + ':';
      } else {
        strMinutes = minutes + ':';
      }
    } else {
      strMinutes = '00:';
    }
    return strMinutes.toString();
  }

  static convertToSeconds(aTimeToConvert) {
    var strSeconds = '';
    if (this._isValidInteger(aTimeToConvert)) {
      let seconds = Math.round(aTimeToConvert % 60);
      if (10 > seconds) {
        strSeconds = '0' + seconds;
      } else {
        strSeconds = seconds;
      }
    } else {
      strSeconds = '00';
    }
    return strSeconds.toString();
  }

  static _isValidInteger(aTimeToConvert) {
    return Number(aTimeToConvert) === aTimeToConvert && aTimeToConvert % 1 === 0 && aTimeToConvert > 0;
  }
}