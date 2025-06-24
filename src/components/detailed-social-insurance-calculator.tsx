'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';
import { PREFECTURE_RATES } from '@/domain/value-objects/prefecture-rates';

interface MonthlyPayment {
  month: number;
  basicSalary: string;
  overtimeAllowance: string;
  commutingAllowance: string;
  positionAllowance: string;
  familyAllowance: string;
  housingAllowance: string;
  otherAllowances: string;
  paymentDays: string;
  bonus: string;
}

export function DetailedSocialInsuranceCalculator() {
  const [monthlyPayments, setMonthlyPayments] = useState<MonthlyPayment[]>([
    {
      month: 4,
      basicSalary: '',
      overtimeAllowance: '',
      commutingAllowance: '',
      positionAllowance: '',
      familyAllowance: '',
      housingAllowance: '',
      otherAllowances: '',
      paymentDays: '31',
      bonus: '',
    },
    {
      month: 5,
      basicSalary: '',
      overtimeAllowance: '',
      commutingAllowance: '',
      positionAllowance: '',
      familyAllowance: '',
      housingAllowance: '',
      otherAllowances: '',
      paymentDays: '30',
      bonus: '',
    },
    {
      month: 6,
      basicSalary: '',
      overtimeAllowance: '',
      commutingAllowance: '',
      positionAllowance: '',
      familyAllowance: '',
      housingAllowance: '',
      otherAllowances: '',
      paymentDays: '30',
      bonus: '',
    },
  ]);

  const [age, setAge] = useState('');
  const [prefecture, setPrefecture] = useState('tokyo');
  const [isPartTime, setIsPartTime] = useState(false);
  const [shouldCalculate, setShouldCalculate] = useState(false);

  // 数値フォーマット関数
  const formatNumber = (value: string): string => {
    if (!value) return '';
    // 数字以外を除去
    const numbers = value.replace(/[^\d]/g, '');
    // 3桁区切りのカンマを追加
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 数値パース関数
  const parseNumber = (value: string): number => {
    return Number(value.replace(/,/g, '')) || 0;
  };

  const handlePaymentChange = (monthIndex: number, field: keyof MonthlyPayment, value: string) => {
    // 支払基礎日数の場合は整数のみ
    if (field === 'paymentDays') {
      if (value !== '' && (!/^\d+$/.test(value) || Number(value) > 31)) return;
    } else if (field !== 'month') {
      // 金額項目はフォーマット
      value = formatNumber(value);
    }

    setMonthlyPayments(prev => 
      prev.map((payment, index) =>
        index === monthIndex ? { ...payment, [field]: value } : payment
      )
    );
    setShouldCalculate(false);
  };

  const handleAgeChange = (value: string) => {
    if (value !== '' && (!/^\d+$/.test(value) || Number(value) > 120)) return;
    setAge(value);
    setShouldCalculate(false);
  };

  // tRPC query
  const { data, isLoading, error } = api.socialInsurance.calculateDetailed.useQuery(
    {
      monthlyPayments: monthlyPayments.map(payment => ({
        month: payment.month,
        basicSalary: parseNumber(payment.basicSalary),
        overtimeAllowance: parseNumber(payment.overtimeAllowance),
        commutingAllowance: parseNumber(payment.commutingAllowance),
        positionAllowance: parseNumber(payment.positionAllowance),
        familyAllowance: parseNumber(payment.familyAllowance),
        housingAllowance: parseNumber(payment.housingAllowance),
        otherAllowances: parseNumber(payment.otherAllowances),
        paymentDays: Number(payment.paymentDays) || 0,
        bonus: parseNumber(payment.bonus),
      })),
      age: Number(age) || 0,
      isPartTime,
      prefecture,
    },
    {
      enabled: shouldCalculate && 
               age !== '' && 
               monthlyPayments.some(payment => payment.basicSalary !== ''),
    }
  );

  const handleCalculate = () => {
    if (age && monthlyPayments.some(payment => payment.basicSalary !== '')) {
      setShouldCalculate(true);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ja-JP') + '円';
  };

  const getMonthName = (month: number) => {
    return `${month}月`;
  };

  const getTotalPayment = (payment: MonthlyPayment) => {
    return (
      parseNumber(payment.basicSalary) +
      parseNumber(payment.overtimeAllowance) +
      parseNumber(payment.commutingAllowance) +
      parseNumber(payment.positionAllowance) +
      parseNumber(payment.familyAllowance) +
      parseNumber(payment.housingAllowance) +
      parseNumber(payment.otherAllowances) +
      parseNumber(payment.bonus)
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* 基本情報 */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-gray-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
            基本情報
          </h2>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="bg-orange-100 text-orange-700 rounded px-2 py-1 text-xs font-bold mr-2">年齢</span>
                現在の年齢
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={age}
                  onChange={(e) => handleAgeChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg font-medium"
                  placeholder="35"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">歳</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs font-bold mr-2">地域</span>
                都道府県
              </label>
              <select
                value={prefecture}
                onChange={(e) => {
                  setPrefecture(e.target.value);
                  setShouldCalculate(false);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg font-medium bg-white"
              >
                {Object.entries(PREFECTURE_RATES).map(([code, data]) => (
                  <option key={code} value={code}>
                    {data.prefectureName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="bg-green-100 text-green-700 rounded px-2 py-1 text-xs font-bold mr-2">雇用</span>
                雇用形態
              </label>
              <div className="flex items-center h-12 px-4 border-2 border-gray-200 rounded-xl bg-gray-50">
                <input
                  type="checkbox"
                  id="isPartTime"
                  checked={isPartTime}
                  onChange={(e) => {
                    setIsPartTime(e.target.checked);
                    setShouldCalculate(false);
                  }}
                  className="mr-3 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isPartTime" className="text-sm font-medium text-gray-700">
                  短時間労働者
                </label>
              </div>
              <p className="text-xs text-gray-500">
                支払基礎日数の最低要件が11日以上になります
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 月次報酬入力 */}
      <div className="space-y-6 mb-8">
        {monthlyPayments.map((payment, monthIndex) => (
          <div key={payment.month} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className={`bg-gradient-to-r px-8 py-6 border-b border-gray-200 ${
              payment.month === 4 ? 'from-green-500 to-emerald-500' :
              payment.month === 5 ? 'from-blue-500 to-cyan-500' :
              'from-purple-500 to-pink-500'
            }`}>
              <h3 className="text-2xl font-bold text-white flex items-center">
                <span className="bg-white/20 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  {payment.month - 3}
                </span>
                {getMonthName(payment.month)}の報酬詳細
              </h3>
              <p className="text-white/80 mt-2">各種手当を詳細に入力してください</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3 bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-semibold text-red-800 mb-1">
                        基本給 <span className="text-red-500">*必須</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={payment.basicSalary}
                          onChange={(e) => handlePaymentChange(monthIndex, 'basicSalary', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-200 text-lg font-medium"
                          placeholder="300,000"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <label className="block text-sm font-semibold text-red-800 mb-1">
                        支払基礎日数 <span className="text-red-500">*必須</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={payment.paymentDays}
                          onChange={(e) => handlePaymentChange(monthIndex, 'paymentDays', e.target.value)}
                          className="w-32 px-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-200 text-lg font-medium text-center"
                          placeholder="22"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">日</span>
                      </div>
                      <p className="text-xs text-red-600 mt-1">
                        {isPartTime ? '11日以上' : '17日以上'}で計算対象
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">残業手当</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payment.overtimeAllowance}
                      onChange={(e) => handlePaymentChange(monthIndex, 'overtimeAllowance', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                      placeholder="50,000"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">通勤手当</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payment.commutingAllowance}
                      onChange={(e) => handlePaymentChange(monthIndex, 'commutingAllowance', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                      placeholder="15,000"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">役職手当</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payment.positionAllowance}
                      onChange={(e) => handlePaymentChange(monthIndex, 'positionAllowance', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                      placeholder="30,000"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">家族手当</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payment.familyAllowance}
                      onChange={(e) => handlePaymentChange(monthIndex, 'familyAllowance', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                      placeholder="20,000"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">住宅手当</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payment.housingAllowance}
                      onChange={(e) => handlePaymentChange(monthIndex, 'housingAllowance', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                      placeholder="25,000"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">その他手当</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payment.otherAllowances}
                      onChange={(e) => handlePaymentChange(monthIndex, 'otherAllowances', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                      placeholder="10,000"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    年4回以上支給の賞与
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payment.bonus}
                      onChange={(e) => handlePaymentChange(monthIndex, 'bonus', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-lg font-medium"
                      placeholder="100,000"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    年4回以上支給される賞与のみ入力
                  </p>
                </div>
                
                <div className="flex items-end">
                  <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      月合計
                    </label>
                    <div className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-blue-100 border-2 border-blue-200 rounded-xl text-right font-bold text-xl text-blue-600">
                      {formatCurrency(getTotalPayment(payment))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleCalculate}
        disabled={!age || !monthlyPayments.some(payment => payment.basicSalary !== '')}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center mb-8"
      >
        <span className="mr-2">🚀</span>
        詳細計算を実行する
      </button>

      {/* 計算結果表示 */}
      {isLoading && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">詳細計算中...</h3>
            <p className="text-gray-500">各種手当を考慮した正確な計算を行っています</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 mb-8">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-full p-4 mr-6">
              <span className="text-red-600 text-2xl">🚨</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-800">計算エラー</h3>
              <p className="text-red-600 mt-1">{error.message}</p>
            </div>
          </div>
        </div>
      )}

      {data?.success && data.data && (
        <div className="space-y-8">
          {/* 計算結果の詳細な表示は簡潔にするため省略し、重要な結果のみ表示 */}
          
          {/* 社会保険料 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3">💳</span>
                  社会保険料（従業員負担分）
                </h3>
                <div className="text-sm bg-white/20 px-4 py-2 rounded-full">
                  {PREFECTURE_RATES[prefecture]?.prefectureName || '東京都'}
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-800">健康保険料</div>
                      <div className="text-sm text-gray-500">料率: {data.data.socialInsurance.healthInsurance.rate}</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(data.data.socialInsurance.healthInsurance.amount)}</div>
                  </div>
                </div>
                
                {data.data.socialInsurance.nursingInsurance.applicable && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-800">介護保険料</div>
                        <div className="text-sm text-gray-500">料率: {data.data.socialInsurance.nursingInsurance.rate}</div>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">{formatCurrency(data.data.socialInsurance.nursingInsurance.amount)}</div>
                    </div>
                  </div>
                )}
                
                <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-800">厚生年金保険料</div>
                      <div className="text-sm text-gray-500">料率: {data.data.socialInsurance.employeePension.rate}</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(data.data.socialInsurance.employeePension.amount)}</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold">月額合計</div>
                      <div className="text-purple-100 text-lg">毎月の負担額</div>
                    </div>
                    <div className="text-5xl font-bold">{formatCurrency(data.data.socialInsurance.total)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 標準報酬月額情報 */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3">📐</span>
                標準報酬月額詳細
              </h3>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm font-semibold text-gray-500 mb-2">平均報酬月額</div>
                  <div className="text-2xl font-bold text-emerald-600">{formatCurrency(Math.round(data.data.standardSalary.averagePayment))}</div>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm font-semibold text-gray-500 mb-2">標準報酬月額</div>
                  <div className="text-2xl font-bold text-emerald-600">{formatCurrency(data.data.standardSalary.amount)}</div>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm font-semibold text-gray-500 mb-2">等級</div>
                  <div className="text-2xl font-bold text-emerald-600">{data.data.standardSalary.grade}等級</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {data?.success === false && data.error && (
        <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-full p-4 mr-6">
              <span className="text-red-600 text-2xl">❌</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-800">計算できませんでした</h3>
              <p className="text-red-600 mt-1">{data.error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
