declare var moment: any;

export class DateUtils {

  static format(date: any, format: string): string {
    return moment(date).format(format);
  }

  static addDays(date: any, days: number): Date {
    return moment(date).add(days, 'days').toDate();
  }

  static addMonths(date: any, months: number): Date {
    return moment(date).add(months, 'months').toDate();
  }

  static str2Date(dateString: string, format: string): Date {
    return moment(dateString, format).toDate();
  }

  static isValidDateString(dateStr: string, format: string): boolean {
    let d = moment(dateStr, format);
    return d.isValid();
  }

  static displayText(dateTs: number): string {
    let text = "";
    let date = new Date(dateTs);
    let msDate = dateTs;
    let msNow = new Date().getTime();

    let miliSeconds = msNow - msDate;

    let seconds = miliSeconds / 1000;

    let minutes = seconds / 60;
    let remainingSeconds = seconds % 60;

    let hours = minutes / 60;
    let remaningMinutes = minutes % 60;

    let days = hours / 24;

    if (hours < 22) {
      return moment(date).fromNow();
    }

    if (hours >= 22 && hours <= 35) {
      return moment(date).format("[Yesterday at] hh:mm A");
    }

    if (hours > 35 && hours <= 179) {
      return moment(date).fromNow() + " at " + moment(date).format("hh:mm A");;
    }

    return moment(date).format("DD MMM YYYY [at] hh:mm A");
  }
}