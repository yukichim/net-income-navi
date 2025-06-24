'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';
import { PREFECTURE_RATES } from '@/domain/value-objects/prefecture-rates';

export function SocialInsuranceCalculator() {
  const [input, setInput] = useState({
    aprilSalary: '',
    maySalary: '',
    juneSalary: '',
    age: '',
    prefecture: 'tokyo',
  });

  const [isComposing, setIsComposing] = useState(false);
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

  // tRPC query - 入力値が変更された時のみ実行
  const { data, isLoading, error } = api.socialInsurance.calculate.useQuery(
    {
      aprilSalary: parseNumber(input.aprilSalary),
      maySalary: parseNumber(input.maySalary),
      juneSalary: parseNumber(input.juneSalary),
      age: Number(input.age) || 0,
      prefecture: input.prefecture,
    },
    {
      enabled: shouldCalculate && 
               input.aprilSalary !== '' && 
               input.maySalary !== '' && 
               input.juneSalary !== '' && 
               input.age !== '',
    }
  );

  const handleInputChange = (field: string, value: string) => {
    // 年齢の場合は整数のみ
    if (field === 'age') {
      if (value !== '' && (!/^\d+$/.test(value) || Number(value) > 120)) return;
    } else if (field === 'aprilSalary' || field === 'maySalary' || field === 'juneSalary') {
      // IME入力中でない場合のみフォーマット
      if (!isComposing) {
        value = formatNumber(value);
      }
    }
    
    setInput(prev => ({ ...prev, [field]: value }));
    setShouldCalculate(false);
  };

  // IME入力開始時
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // IME入力終了時
  const handleCompositionEnd = (field: string, e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    // IME入力完了後に値を再フォーマット
    const value = e.currentTarget.value;
    if (field === 'aprilSalary' || field === 'maySalary' || field === 'juneSalary') {
      const formattedValue = formatNumber(value);
      setInput(prev => ({ ...prev, [field]: formattedValue }));
      setShouldCalculate(false);
    } else if (field === 'age') {
      if (value !== '' && (!/^\d+$/.test(value) || Number(value) > 120)) return;
      setInput(prev => ({ ...prev, [field]: value }));
      setShouldCalculate(false);
    }
  };

  const handleCalculate = () => {
    if (input.aprilSalary && input.maySalary && input.juneSalary && input.age) {
      setShouldCalculate(true);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ja-JP') + '円';
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 入力フォーム */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 px-8 py-8 border-b border-gray-200 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8">
            <div className="w-32 h-32 bg-blue-100/30 rounded-full"></div>
          </div>
          
          <div className="relative">
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-black mr-4 shadow-lg">
                1
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                給与情報を入力
              </h2>
            </div>
            <p className="text-gray-600 text-lg ml-14">
              4月、5月、6月の給与総額をご入力ください
              <span className="inline-block ml-2 text-blue-600">📊</span>
            </p>
          </div>
        </div>
        
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="bg-green-100 text-green-700 rounded-lg px-3 py-1 text-xs font-bold mr-3">4月</span>
                給与総額
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={input.aprilSalary}
                  onChange={(e) => handleInputChange('aprilSalary', e.target.value)}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={(e) => handleCompositionEnd('aprilSalary', e)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-lg font-semibold group-hover:border-green-300 bg-gray-50 focus:bg-white"
                  placeholder="例: 350,000"
                />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="bg-blue-100 text-blue-700 rounded-lg px-3 py-1 text-xs font-bold mr-3">5月</span>
                給与総額
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={input.maySalary}
                  onChange={(e) => handleInputChange('maySalary', e.target.value)}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={(e) => handleCompositionEnd('maySalary', e)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg font-semibold group-hover:border-blue-300 bg-gray-50 focus:bg-white"
                  placeholder="例: 350,000"
                />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-xs font-bold mr-3">6月</span>
                給与総額
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={input.juneSalary}
                  onChange={(e) => handleInputChange('juneSalary', e.target.value)}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={(e) => handleCompositionEnd('juneSalary', e)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-lg font-semibold group-hover:border-purple-300 bg-gray-50 focus:bg-white"
                  placeholder="例: 350,000"
                />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">円</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="bg-orange-100 text-orange-700 rounded-lg px-3 py-1 text-xs font-bold mr-3">年齢</span>
                現在の年齢
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={input.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={(e) => handleCompositionEnd('age', e)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-lg font-semibold group-hover:border-orange-300 bg-gray-50 focus:bg-white"
                  placeholder="例: 35"
                />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">歳</span>
              </div>
            </div>
          </div>

          {/* 都道府県選択 */}
          <div className="mb-10">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
              <span className="bg-indigo-100 text-indigo-700 rounded-lg px-3 py-1 text-xs font-bold mr-3">地域</span>
              お住まいの都道府県
            </label>
            <div className="relative group">
              <select
                value={input.prefecture}
                onChange={(e) => handleInputChange('prefecture', e.target.value)}
                className="w-full md:w-2/3 lg:w-1/2 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-lg font-semibold bg-gray-50 focus:bg-white group-hover:border-indigo-300 appearance-none cursor-pointer"
              >
                {Object.entries(PREFECTURE_RATES).map(([code, data]) => (
                  <option key={code} value={code}>
                    {data.prefectureName}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <span className="mr-2">💡</span>
              健康保険料率は都道府県により異なります
            </div>
          </div>

          <div className="relative">
            <button
              onClick={handleCalculate}
              disabled={!input.aprilSalary || !input.maySalary || !input.juneSalary || !input.age}
              className="group w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center relative overflow-hidden"
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative flex items-center">
                <span className="mr-3 text-2xl animate-bounce">🧮</span>
                <span className="font-extrabold tracking-wide">社会保険料を計算する</span>
                <span className="ml-3 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </span>
            </button>
            
            {/* Progress indicator when calculating */}
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <div className="flex items-center text-white">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  <span className="font-bold">計算中...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 計算結果 */}
      {isLoading && !shouldCalculate && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl border border-blue-100 p-16 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-200/20 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-indigo-200/20 rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">計算中...</h3>
            <p className="text-gray-600 text-lg mb-4">社会保険料を算出しています</p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-xl border-2 border-red-200 p-8 mb-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
            <div className="w-20 h-20 bg-red-100/50 rounded-full"></div>
          </div>
          
          <div className="relative flex items-start">
            <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-full p-4 mr-6 shadow-lg">
              <span className="text-white text-2xl">⚠️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-800 mb-2">計算エラーが発生しました</h3>
              <p className="text-red-700 mb-4">{error.message}</p>
              <div className="bg-white/70 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-red-600">
                  💡 <strong>解決方法:</strong> 入力値を確認して、もう一度お試しください。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {data?.success && data.data && (
        <div className="space-y-6">
          {/* 入力サマリー */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">📊</span>
                入力データ確認
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-semibold text-gray-500 mb-1">4月</div>
                  <div className="text-lg font-bold text-gray-800">{formatCurrency(parseNumber(data.data.salaryInput.april.toString()))}</div>
                </div>
                <div className="text-center bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-semibold text-gray-500 mb-1">5月</div>
                  <div className="text-lg font-bold text-gray-800">{formatCurrency(parseNumber(data.data.salaryInput.may.toString()))}</div>
                </div>
                <div className="text-center bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-semibold text-gray-500 mb-1">6月</div>
                  <div className="text-lg font-bold text-gray-800">{formatCurrency(parseNumber(data.data.salaryInput.june.toString()))}</div>
                </div>
                <div className="text-center bg-white rounded-xl p-4 shadow-sm border-2 border-blue-200">
                  <div className="text-xs font-semibold text-blue-600 mb-1">平均</div>
                  <div className="text-lg font-bold text-blue-600">{formatCurrency(Math.round(data.data.salaryInput.average))}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 標準報酬月額 */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">⚖️</span>
                標準報酬月額
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm font-semibold text-gray-500 mb-2">標準報酬月額</div>
                  <div className="text-3xl font-bold text-green-600">{formatCurrency(data.data.standardSalary.amount)}</div>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm font-semibold text-gray-500 mb-2">等級</div>
                  <div className="text-3xl font-bold text-green-600">{data.data.standardSalary.grade}等級</div>
                </div>
              </div>
            </div>
          </div>

          {/* 社会保険料 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2">💳</span>
                  社会保険料（従業員負担分）
                </h3>
                <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {data.data.socialInsurance.prefecture?.name || '東京都'}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-800">健康保険料</div>
                      <div className="text-sm text-gray-500">料率: {data.data.socialInsurance.healthInsurance.rate}</div>
                    </div>
                    <div className="text-xl font-bold text-blue-600">{formatCurrency(data.data.socialInsurance.healthInsurance.amount)}</div>
                  </div>
                </div>
                
                {data.data.socialInsurance.nursingInsurance.applicable && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-400">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-800">介護保険料</div>
                        <div className="text-sm text-gray-500">料率: {data.data.socialInsurance.nursingInsurance.rate}</div>
                      </div>
                      <div className="text-xl font-bold text-orange-600">{formatCurrency(data.data.socialInsurance.nursingInsurance.amount)}</div>
                    </div>
                  </div>
                )}
                
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-800">厚生年金保険料</div>
                      <div className="text-sm text-gray-500">料率: {data.data.socialInsurance.employeePension.rate}</div>
                    </div>
                    <div className="text-xl font-bold text-green-600">{formatCurrency(data.data.socialInsurance.employeePension.amount)}</div>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                    <div className="w-24 h-24 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 transform -translate-x-2 translate-y-2">
                    <div className="w-16 h-16 bg-white/10 rounded-full"></div>
                  </div>
                  
                  <div className="relative flex justify-between items-center">
                    <div>
                      <div className="text-purple-100 text-sm font-medium mb-1">毎月の負担額</div>
                      <div className="text-3xl md:text-4xl font-black mb-2">合計</div>
                      <div className="text-purple-200 text-sm flex items-center">
                        <span className="mr-1">💡</span>
                        手取り計算の基準額
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl md:text-6xl font-black tracking-tight leading-none">
                        {formatCurrency(data.data.socialInsurance.total)}
                      </div>
                      <div className="text-purple-200 text-sm mt-2 flex items-center justify-end">
                        <span className="animate-pulse mr-1">✨</span>
                        従業員負担分
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 補足情報 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                <span className="text-blue-600 text-sm">ℹ️</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">補足情報</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>年齢: {data.data.ageInfo.value}歳 ({data.data.ageInfo.group})</p>
                  {!data.data.ageInfo.isNursingInsuranceApplicable && data.data.ageInfo.value < 40 && (
                    <p className="text-blue-600">※ 40歳未満のため介護保険料は適用されません</p>
                  )}
                  {data.data.ageInfo.value > 64 && (
                    <p className="text-blue-600">※ 65歳以上のため介護保険料は適用されません</p>
                  )}
                  <p className="text-gray-500 mt-3">
                    <strong>注意:</strong> この計算は簡易版です。より正確な計算をご希望の場合は詳細版をご利用ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {data?.success === false && data.error && (
        <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-full p-3 mr-4">
              <span className="text-red-600 text-xl">❌</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800">計算できませんでした</h3>
              <p className="text-red-600 mt-1">{data.error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
