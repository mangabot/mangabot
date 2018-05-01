export class PercentageConverter {

  static toPercent(val: number): number {
    return val ? Math.floor(val * 10000) / 100 : 0;
  }

  static toRealValue(percent: number): number {
    return percent / 100;
  }
}