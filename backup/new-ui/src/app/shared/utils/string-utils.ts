export class StringUtils {

  static isBlank(str: string): boolean {
    return str == null || typeof str !== "string" ||
      str.trim && str.trim().length === 0 ||
      !str.trim && str.replace(/^\s+|\s+$/gi, '').length === 0;
  }

  static isNotBlank(str: string): boolean {
    return !this.isBlank(str);
  }

  static trimAll(str: string): string {
    return str == null ? "" : str.replace(/(^\s+|\s+$)/g, '');
  }

  static createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  }

  static fixUrl(domain: string, url: string) {
    let fixedUrl = url == null ? "" : this.trimAll(url);

    let reg = new RegExp("((?<SCHEME>(http|https))://)?(?<HOST>[^\/]+).*", "gmi");
    let match: any = reg.exec(domain);
    let scheme = match.groups['SCHEME'];
    let host = match.groups['HOST'];

    if (fixedUrl.startsWith("//")) {
      // truyentranh8.net
      // e.g: //truyentranh8.net/manga/one-shot.html
      return scheme + ":" + fixedUrl;
    } else if (fixedUrl.startsWith("../") || (fixedUrl.startsWith("/") && fixedUrl.startsWith("//") == false)) {
      // e.g: ../manga/one-shot.html
      return scheme + "://" + host + fixedUrl.replace("../", "/");
    } else if (fixedUrl.startsWith("http://") || fixedUrl.startsWith("https://")) {
      return fixedUrl;
    } else {
      // Following links will relate with the path in <base> element.
      // e.g: manga/one-shot.html
      // manga24h.com
      return domain + fixedUrl;
    }
  }
}