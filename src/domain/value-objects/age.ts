/**
 * 年齢の値オブジェクト
 */
export class Age {
  private constructor(public readonly value: number) {}

  static create(value: number): Age {
    if (!Number.isInteger(value)) {
      throw new Error('年齢は整数である必要があります');
    }

    if (value < 0) {
      throw new Error('年齢は0歳以上である必要があります');
    }

    if (value > 120) {
      throw new Error('年齢は120歳以下である必要があります');
    }

    return new Age(value);
  }

  /**
   * 介護保険料の対象年齢かどうか
   */
  isNursingInsuranceApplicable(): boolean {
    return this.value >= 40 && this.value <= 64;
  }

  /**
   * 年齢区分を取得
   */
  getAgeGroup(): string {
    if (this.value < 20) return '未成年';
    if (this.value < 40) return '一般';
    if (this.value <= 64) return '介護保険対象';
    return '高齢者';
  }
}
