/**
 * 月次報酬情報の値オブジェクト
 */
export class MonthlyPayment {
  private constructor(
    public readonly basicSalary: number,
    public readonly overtimeAllowance: number,
    public readonly commutingAllowance: number,
    public readonly positionAllowance: number,
    public readonly familyAllowance: number,
    public readonly housingAllowance: number,
    public readonly otherAllowances: number,
    public readonly paymentDays: number,
    public readonly bonus: number, // 年4回以上支給される賞与
    public readonly month: number
  ) {}

  static create(input: {
    basicSalary: number;
    overtimeAllowance?: number;
    commutingAllowance?: number;
    positionAllowance?: number;
    familyAllowance?: number;
    housingAllowance?: number;
    otherAllowances?: number;
    paymentDays: number;
    bonus?: number;
    month: number;
  }): MonthlyPayment {
    if (input.basicSalary < 0) {
      throw new Error('基本給は0以上である必要があります');
    }

    if (input.paymentDays < 0 || input.paymentDays > 31) {
      throw new Error('支払基礎日数は0日以上31日以下である必要があります');
    }

    if (input.month < 1 || input.month > 12) {
      throw new Error('月は1月から12月の間で指定してください');
    }

    return new MonthlyPayment(
      input.basicSalary,
      input.overtimeAllowance ?? 0,
      input.commutingAllowance ?? 0,
      input.positionAllowance ?? 0,
      input.familyAllowance ?? 0,
      input.housingAllowance ?? 0,
      input.otherAllowances ?? 0,
      input.paymentDays,
      input.bonus ?? 0,
      input.month
    );
  }

  /**
   * 総報酬額を計算（標準報酬月額の対象となる報酬）
   */
  getTotalPayment(): number {
    return (
      this.basicSalary +
      this.overtimeAllowance +
      this.commutingAllowance +
      this.positionAllowance +
      this.familyAllowance +
      this.housingAllowance +
      this.otherAllowances +
      this.bonus
    );
  }

  /**
   * 支払基礎日数が有効かどうか（17日以上、短時間労働者は11日以上）
   */
  isValidPaymentDays(isPartTime: boolean = false): boolean {
    const requiredDays = isPartTime ? 11 : 17;
    return this.paymentDays >= requiredDays;
  }

  /**
   * 月名を取得
   */
  getMonthName(): string {
    const monthNames = [
      '', '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ];
    return monthNames[this.month] ?? '';
  }
}
