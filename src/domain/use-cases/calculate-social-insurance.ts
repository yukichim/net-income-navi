import { StandardSalary } from '../entities/standard-salary';
import { SocialInsurance } from '../entities/social-insurance';
import { MonthlyPayment } from '../value-objects/monthly-payment';
import { Age } from '../value-objects/age';

/**
 * 社会保険料計算のユースケース
 */
export class CalculateSocialInsuranceUseCase {
  /**
   * 詳細な月次報酬から社会保険料を計算する
   */
  executeDetailed(input: {
    monthlyPayments: Array<{
      month: number;
      basicSalary: number;
      overtimeAllowance?: number;
      commutingAllowance?: number;
      positionAllowance?: number;
      familyAllowance?: number;
      housingAllowance?: number;
      otherAllowances?: number;
      paymentDays: number;
      bonus?: number;
    }>;
    age: number;
    isPartTime?: boolean;
    prefecture?: string;
  }) {
    const age = Age.create(input.age);

    // MonthlyPaymentオブジェクトを作成
    const monthlyPayments = input.monthlyPayments.map(paymentData =>
      MonthlyPayment.create(paymentData)
    );

    // 標準報酬月額の計算
    const standardSalary = StandardSalary.createFromRegularDetermination(
      monthlyPayments,
      input.isPartTime ?? false
    );

    // 社会保険料の計算
    const socialInsurance = SocialInsurance.calculate(
      standardSalary.amount,
      age.value,
      input.prefecture
    );

    return {
      monthlyPayments: standardSalary.getDetails().monthlyPayments,
      standardSalary: {
        amount: standardSalary.amount,
        grade: standardSalary.grade,
        averagePayment: standardSalary.averagePayment,
        validMonths: standardSalary.validMonths,
        isPartTime: standardSalary.isPartTime,
      },
      socialInsurance: {
        ...socialInsurance.getCalculationDetails(),
      },
      ageInfo: {
        value: age.value,
        group: age.getAgeGroup(),
        isNursingInsuranceApplicable: age.isNursingInsuranceApplicable(),
      },
    };
  }

  /**
   * 簡易版：3ヶ月分の総額から社会保険料を計算する（後方互換性のため）
   */
  execute(input: {
    aprilSalary: number;
    maySalary: number;
    juneSalary: number;
    age: number;
    prefecture?: string;
  }) {
    const age = Age.create(input.age);

    // 標準報酬月額の計算
    const standardSalary = StandardSalary.create(
      input.aprilSalary,
      input.maySalary,
      input.juneSalary
    );

    // 社会保険料の計算
    const socialInsurance = SocialInsurance.calculate(
      standardSalary.amount,
      age.value,
      input.prefecture
    );

    return {
      salaryInput: {
        april: input.aprilSalary,
        may: input.maySalary,
        june: input.juneSalary,
        average: standardSalary.getAverageSalary(),
        total: input.aprilSalary + input.maySalary + input.juneSalary,
      },
      standardSalary: {
        amount: standardSalary.amount,
        grade: standardSalary.grade,
        averageSalary: standardSalary.getAverageSalary(),
      },
      socialInsurance: {
        ...socialInsurance.getCalculationDetails(),
      },
      ageInfo: {
        value: age.value,
        group: age.getAgeGroup(),
        isNursingInsuranceApplicable: age.isNursingInsuranceApplicable(),
      },
    };
  }
}
