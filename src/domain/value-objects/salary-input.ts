/**
 * 給与入力の値オブジェクト
 */
export class SalaryInput {
  private constructor(
    public readonly april: number,
    public readonly may: number,
    public readonly june: number
  ) {}

  static create(april: number, may: number, june: number): SalaryInput {
    if (april < 0 || may < 0 || june < 0) {
      throw new Error('給与額は0以上である必要があります');
    }

    // 一般的な給与額の上限チェック（例：月額200万円）
    const maxSalary = 2000000;
    if (april > maxSalary || may > maxSalary || june > maxSalary) {
      throw new Error(`給与額は${maxSalary.toLocaleString()}円以下である必要があります`);
    }

    return new SalaryInput(april, may, june);
  }

  /**
   * 平均給与を計算
   */
  getAverage(): number {
    return (this.april + this.may + this.june) / 3;
  }

  /**
   * 合計給与を計算
   */
  getTotal(): number {
    return this.april + this.may + this.june;
  }

  /**
   * 全ての給与が0かどうかチェック
   */
  isEmpty(): boolean {
    return this.april === 0 && this.may === 0 && this.june === 0;
  }
}
