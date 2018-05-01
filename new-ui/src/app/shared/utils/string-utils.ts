export class StringUtils {

  static isBlank(str: string): boolean {
    return str == null || typeof str !== "string" ||
      str.trim && str.trim().length === 0 ||
      !str.trim && str.replace(/^\s+|\s+$/gi, '').length === 0;
  }

  static isNotBlank(str: string): boolean {
    return !this.isBlank(str);
  }
}