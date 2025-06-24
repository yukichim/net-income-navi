import { getInsuranceRates } from '../value-objects/prefecture-rates';

/**
 * 社会保険料エンティティ
 */
export class SocialInsurance {
  private constructor(
    public readonly standardSalary: number,
    public readonly healthInsurance: number,
    public readonly nursingInsurance: number,
    public readonly employeePension: number,
    public readonly total: number,
    public readonly isNursingInsuranceApplicable: boolean,
    public readonly prefecture: string,
    public readonly rates: {
      healthInsuranceRate: number;
      nursingInsuranceRate: number;
      employeePensionRate: number;
      prefectureName: string;
    }
  ) {}

  /**
   * 社会保険料を計算
   */
  static calculate(
    standardSalary: number,
    age: number,
    prefecture: string = 'tokyo'
  ): SocialInsurance {
    if (standardSalary <= 0) {
      throw new Error('標準報酬月額は0より大きい値である必要があります');
    }

    if (age < 0 || age > 120) {
      throw new Error('年齢は0歳以上120歳以下である必要があります');
    }

    // 介護保険料の適用判定（40歳から64歳まで）
    const isNursingInsuranceApplicable = age >= 40 && age <= 64;

    // 各種保険料率（都道府県別）
    const rates = getInsuranceRates(prefecture);

    // 健康保険料（従業員負担分）
    const healthInsurance = Math.floor(
      (standardSalary * rates.healthInsuranceRate) / 2
    );

    // 介護保険料（従業員負担分、40-64歳のみ）
    const nursingInsurance = isNursingInsuranceApplicable
      ? Math.floor((standardSalary * rates.nursingInsuranceRate) / 2)
      : 0;

    // 厚生年金保険料（従業員負担分）
    const employeePension = Math.floor(
      (standardSalary * rates.employeePensionRate) / 2
    );

    const total = healthInsurance + nursingInsurance + employeePension;

    return new SocialInsurance(
      standardSalary,
      healthInsurance,
      nursingInsurance,
      employeePension,
      total,
      isNursingInsuranceApplicable,
      prefecture,
      rates
    );
  }

  /**
   * 詳細な計算結果を取得
   */
  getCalculationDetails() {
    return {
      standardSalary: this.standardSalary,
      healthInsurance: {
        amount: this.healthInsurance,
        rate: `${(this.rates.healthInsuranceRate * 100).toFixed(2)}%`,
        description: '健康保険料（従業員負担分）'
      },
      nursingInsurance: {
        amount: this.nursingInsurance,
        rate: `${(this.rates.nursingInsuranceRate * 100).toFixed(2)}%`,
        description: '介護保険料（従業員負担分）',
        applicable: this.isNursingInsuranceApplicable
      },
      employeePension: {
        amount: this.employeePension,
        rate: `${(this.rates.employeePensionRate * 100).toFixed(1)}%`,
        description: '厚生年金保険料（従業員負担分）'
      },
      total: this.total,
      prefecture: {
        code: this.prefecture,
        name: this.rates.prefectureName
      }
    };
  }
}
