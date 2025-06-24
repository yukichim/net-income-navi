import { MonthlyPayment } from '../value-objects/monthly-payment';

/**
 * 標準報酬月額エンティティ
 */
export class StandardSalary {
  private constructor(
    public readonly monthlyPayments: MonthlyPayment[],
    public readonly amount: number,
    public readonly grade: number,
    public readonly averagePayment: number,
    public readonly validMonths: number,
    public readonly isPartTime: boolean
  ) {}

  /**
   * 月次報酬情報から標準報酬月額を作成（定時決定）
   */
  static createFromRegularDetermination(
    monthlyPayments: MonthlyPayment[],
    isPartTime: boolean = false
  ): StandardSalary {
    if (monthlyPayments.length === 0) {
      throw new Error('月次報酬情報が必要です');
    }

    // 支払基礎日数が有効な月のみを対象とする
    const validPayments = monthlyPayments.filter(payment => 
      payment.isValidPaymentDays(isPartTime)
    );

    if (validPayments.length === 0) {
      throw new Error('有効な支払基礎日数を持つ月がありません');
    }

    // 平均報酬月額を計算
    const totalPayment = validPayments.reduce(
      (sum, payment) => sum + payment.getTotalPayment(), 
      0
    );
    const averagePayment = totalPayment / validPayments.length;

    // 標準報酬月額表への当てはめ
    const { amount, grade } = StandardSalary.calculateStandardAmount(averagePayment);

    return new StandardSalary(
      monthlyPayments,
      amount,
      grade,
      averagePayment,
      validPayments.length,
      isPartTime
    );
  }

  /**
   * 単純な3ヶ月平均から標準報酬月額を作成（後方互換性のため）
   */
  static create(
    aprilSalary: number,
    maySalary: number,
    juneSalary: number
  ): StandardSalary {
    if (aprilSalary < 0 || maySalary < 0 || juneSalary < 0) {
      throw new Error('給与額は0以上である必要があります');
    }

    // MonthlyPaymentオブジェクトを作成（簡略化）
    const monthlyPayments = [
      MonthlyPayment.create({
        basicSalary: aprilSalary,
        paymentDays: 30, // デフォルト値
        month: 4
      }),
      MonthlyPayment.create({
        basicSalary: maySalary,
        paymentDays: 31, // デフォルト値
        month: 5
      }),
      MonthlyPayment.create({
        basicSalary: juneSalary,
        paymentDays: 30, // デフォルト値
        month: 6
      })
    ];

    return StandardSalary.createFromRegularDetermination(monthlyPayments, false);
  }

  /**
   * 平均給与から標準報酬月額と等級を算出
   */
  private static calculateStandardAmount(average: number): { amount: number; grade: number } {
    // 令和6年度 健康保険・厚生年金保険の標準報酬月額表
    const standardTable = [
      { min: 0, max: 93000, amount: 88000, grade: 1 },
      { min: 93000, max: 101000, amount: 98000, grade: 2 },
      { min: 101000, max: 107000, amount: 104000, grade: 3 },
      { min: 107000, max: 114000, amount: 110000, grade: 4 },
      { min: 114000, max: 122000, amount: 118000, grade: 5 },
      { min: 122000, max: 130000, amount: 126000, grade: 6 },
      { min: 130000, max: 138000, amount: 134000, grade: 7 },
      { min: 138000, max: 146000, amount: 142000, grade: 8 },
      { min: 146000, max: 155000, amount: 150000, grade: 9 },
      { min: 155000, max: 165000, amount: 160000, grade: 10 },
      { min: 165000, max: 175000, amount: 170000, grade: 11 },
      { min: 175000, max: 185000, amount: 180000, grade: 12 },
      { min: 185000, max: 195000, amount: 190000, grade: 13 },
      { min: 195000, max: 210000, amount: 200000, grade: 14 },
      { min: 210000, max: 230000, amount: 220000, grade: 15 },
      { min: 230000, max: 250000, amount: 240000, grade: 16 },
      { min: 250000, max: 270000, amount: 260000, grade: 17 },
      { min: 270000, max: 290000, amount: 280000, grade: 18 },
      { min: 290000, max: 310000, amount: 300000, grade: 19 },
      { min: 310000, max: 330000, amount: 320000, grade: 20 },
      { min: 330000, max: 350000, amount: 340000, grade: 21 },
      { min: 350000, max: 370000, amount: 360000, grade: 22 },
      { min: 370000, max: 395000, amount: 380000, grade: 23 },
      { min: 395000, max: 425000, amount: 410000, grade: 24 },
      { min: 425000, max: 455000, amount: 440000, grade: 25 },
      { min: 455000, max: 485000, amount: 470000, grade: 26 },
      { min: 485000, max: 515000, amount: 500000, grade: 27 },
      { min: 515000, max: 545000, amount: 530000, grade: 28 },
      { min: 545000, max: 575000, amount: 560000, grade: 29 },
      { min: 575000, max: 605000, amount: 590000, grade: 30 },
      { min: 605000, max: 635000, amount: 620000, grade: 31 },
      { min: 635000, max: Infinity, amount: 650000, grade: 32 },
    ];

    const entry = standardTable.find(
      (item) => average >= item.min && average < item.max
    );

    if (!entry) {
      // 最高等級を適用
      const maxEntry = standardTable[standardTable.length - 1];
      if (!maxEntry) {
        throw new Error('標準報酬月額表が正しく定義されていません');
      }
      return { amount: maxEntry.amount, grade: maxEntry.grade };
    }

    return { amount: entry.amount, grade: entry.grade };
  }

  /**
   * 平均給与を取得（後方互換性）
   */
  getAverageSalary(): number {
    return this.averagePayment;
  }

  /**
   * 詳細情報を取得
   */
  getDetails() {
    return {
      monthlyPayments: this.monthlyPayments.map(payment => ({
        month: payment.getMonthName(),
        totalPayment: payment.getTotalPayment(),
        paymentDays: payment.paymentDays,
        isValid: payment.isValidPaymentDays(this.isPartTime)
      })),
      averagePayment: this.averagePayment,
      validMonths: this.validMonths,
      standardAmount: this.amount,
      grade: this.grade,
      isPartTime: this.isPartTime
    };
  }
}
