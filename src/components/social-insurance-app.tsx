'use client';

import { useState } from 'react';
import { SocialInsuranceCalculator } from './social-insurance-calculator';
import { DetailedSocialInsuranceCalculator } from './detailed-social-insurance-calculator';

export function SocialInsuranceApp() {
  const [activeTab, setActiveTab] = useState<'simple' | 'detailed'>('simple');

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8">
        {/* メインタイトル - カード状 */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className={`relative ${activeTab === 'detailed' 
            ? 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700' 
            : 'bg-gradient-to-br from-yellow-100 via-yellow-600 to-red-200'
          } text-white shadow-2xl overflow-hidden rounded-2xl`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" 
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                   }}>
              </div>
            </div>
            
            <div className="relative text-center py-12 px-6">
              <div className="mb-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight flex items-center justify-center">
                  <span className="text-4xl md:text-5xl mr-4">{activeTab === 'detailed' ? '📊' : '💰'}</span>
                  <span className={activeTab === 'detailed' 
                    ? "bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent" 
                    : "bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
                  }>
                    {activeTab === 'detailed' ? '手取りナビ Pro' : '手取りナビ'}
                  </span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-6">
                <span className="inline-block animate-pulse">✨</span>
                {activeTab === 'detailed' 
                  ? '各種手当を詳細に入力して正確な社会保険料を計算'
                  : '4月〜6月の給与から社会保険料をスマート計算'
                }
                <span className="inline-block animate-pulse">✨</span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {activeTab === 'simple' ? (
                  <>
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                      <span className="text-sm font-medium mr-2">🚀</span>
                      <span className="text-sm font-bold">簡易版</span>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-medium mr-2">⚡</span>
                      <span className="text-sm">3分で完了</span>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-medium mr-2">🎯</span>
                      <span className="text-sm">都道府県対応</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                      <span className="text-sm font-medium mr-2">🎯</span>
                      <span className="text-sm font-bold">詳細版</span>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-medium mr-2">📈</span>
                      <span className="text-sm">高精度計算</span>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-medium mr-2">�</span>
                      <span className="text-sm">各種手当対応</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      
        <div className="max-w-6xl mx-auto">
        {/* タブナビゲーション */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab('simple')}
              className={`flex-1 px-8 py-6 font-bold text-lg border-b-4 transition-all duration-300 relative overflow-hidden group ${
                activeTab === 'simple'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {/* Active indicator */}
              {activeTab === 'simple' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
              )}
              <div className="relative flex items-center justify-center">
                <span className="mr-3 text-2xl">🚀</span>
                <span>簡易版</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`flex-1 px-8 py-6 font-bold text-lg border-b-4 transition-all duration-300 relative overflow-hidden group ${
                activeTab === 'detailed'
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {/* Active indicator */}
              {activeTab === 'detailed' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
              )}
              <div className="relative flex items-center justify-center">
                <span className="mr-3 text-2xl">📊</span>
                <span>詳細版</span>
              </div>
            </button>
          </div>
          
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-slate-50 border-t border-gray-100">
            {activeTab === 'simple' && (
              <div className="text-gray-700">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                    <span className="text-blue-600 text-sm">ℹ️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">簡易版について</h3>
                    <p className="text-sm mb-3">
                      4月、5月、6月の総給与額を入力するだけで社会保険料を簡単計算。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>基本給・諸手当を含む総額入力</span>
                      </div>
                      <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>支払基礎日数は自動計算（30日）</span>
                      </div>
                      <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>3分で完了する簡単試算</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'detailed' && (
              <div className="text-gray-700">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 rounded-full p-2 mr-4 mt-1">
                    <span className="text-purple-600 text-sm">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">詳細版について</h3>
                    <p className="text-sm mb-3">
                      各種手当を詳細に入力し、支払基礎日数も考慮した高精度計算。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-purple-600 mr-2">⭐</span>
                        <span>基本給・残業手当・各種手当を個別入力</span>
                      </div>
                      <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-purple-600 mr-2">⭐</span>
                        <span>支払基礎日数を正確に考慮</span>
                      </div>
                      <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-purple-600 mr-2">⭐</span>
                        <span>年4回以上支給の賞与も対象</span>
                      </div>
                      <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-purple-600 mr-2">⭐</span>
                        <span>算定基礎届レベルの精度</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* コンテンツ */}
        {activeTab === 'simple' && <SocialInsuranceCalculator />}
        {activeTab === 'detailed' && <DetailedSocialInsuranceCalculator />}
        </div>
        
        {/* フッター */}
        <footer className="mt-16 bg-gradient-to-r from-gray-800 to-slate-800 rounded-2xl text-white p-8 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  手取りナビ
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  社会保険料を計算し、手取り金額をシミュレーション。今のご自身の給与から、将来の手取りを見据えた計画を立てるお手伝いをします。
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-lg">機能</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    社会保険料計算（簡易版・詳細版）
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    都道府県別料率対応
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    標準報酬月額算定
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    介護保険料自動判定
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-lg">ご注意</h4>
                <div className="text-gray-300 text-xs space-y-2">
                  <div className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-0.5">⚠️</span>
                    <span>この計算結果は参考値です。</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-0.5">⚠️</span>
                    <span>実際の控除額は勤務先にご確認ください。</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-0.5">⚠️</span>
                    <span>雇用保険料は含まれていません。</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-600 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2025 手取りナビ. 社会保険料計算をサポートします。
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <span className="mr-1">📱</span>
                    レスポンシブ対応
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
