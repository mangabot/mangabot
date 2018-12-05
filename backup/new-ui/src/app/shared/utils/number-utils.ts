export class NumberUtils {

  static isInt(val) {
    if (val == null || isNaN(val)) {
      return false;
    }

    let str = new String(val);
    return new RegExp(/^[0-9]+$/, "gi").test(str.toString());
  }

  static isNotAnInteger(val) {
    return !this.isInt(val);
  }

  static roundTo2Digits(amount: number): number {
    let digit = 2;
    return Math.round(amount * Math.pow(10, digit)) / Math.pow(10, digit);
  }

  static roundTo3Digits(amount: number): number {
    let digit = 3;
    return Math.round(amount * Math.pow(10, digit)) / Math.pow(10, digit);
  }
}