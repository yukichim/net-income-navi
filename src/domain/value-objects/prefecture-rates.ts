/**
 * 都道府県別保険料率データ（令和7年度）
 */
export interface InsuranceRates {
  healthInsuranceRate: number;
  nursingInsuranceRate: number;
  employeePensionRate: number;
  prefectureName: string;
}

export const PREFECTURE_RATES: Record<string, InsuranceRates> = {
  hokkaido: {
    healthInsuranceRate: 0.1030,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '北海道'
  },
  aomori: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '青森県'
  },
  iwate: {
    healthInsuranceRate: 0.0982,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '岩手県'
  },
  miyagi: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '宮城県'
  },
  akita: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '秋田県'
  },
  yamagata: {
    healthInsuranceRate: 0.0990,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '山形県'
  },
  fukushima: {
    healthInsuranceRate: 0.0996,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '福島県'
  },
  ibaraki: {
    healthInsuranceRate: 0.0998,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '茨城県'
  },
  tochigi: {
    healthInsuranceRate: 0.0999,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '栃木県'
  },
  gunma: {
    healthInsuranceRate: 0.0998,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '群馬県'
  },
  saitama: {
    healthInsuranceRate: 0.0971,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '埼玉県'
  },
  chiba: {
    healthInsuranceRate: 0.0984,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '千葉県'
  },
  tokyo: {
    healthInsuranceRate: 0.0990,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '東京都'
  },
  kanagawa: {
    healthInsuranceRate: 0.0985,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '神奈川県'
  },
  niigata: {
    healthInsuranceRate: 0.0987,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '新潟県'
  },
  toyama: {
    healthInsuranceRate: 0.0999,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '富山県'
  },
  ishikawa: {
    healthInsuranceRate: 0.1003,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '石川県'
  },
  fukui: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '福井県'
  },
  yamanashi: {
    healthInsuranceRate: 0.0998,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '山梨県'
  },
  nagano: {
    healthInsuranceRate: 0.0998,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '長野県'
  },
  gifu: {
    healthInsuranceRate: 0.0998,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '岐阜県'
  },
  shizuoka: {
    healthInsuranceRate: 0.0993,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '静岡県'
  },
  aichi: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '愛知県'
  },
  mie: {
    healthInsuranceRate: 0.0998,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '三重県'
  },
  shiga: {
    healthInsuranceRate: 0.0982,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '滋賀県'
  },
  kyoto: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '京都府'
  },
  osaka: {
    healthInsuranceRate: 0.1018,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '大阪府'
  },
  hyogo: {
    healthInsuranceRate: 0.1018,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '兵庫県'
  },
  nara: {
    healthInsuranceRate: 0.0998,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '奈良県'
  },
  wakayama: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '和歌山県'
  },
  tottori: {
    healthInsuranceRate: 0.0990,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '鳥取県'
  },
  shimane: {
    healthInsuranceRate: 0.1003,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '島根県'
  },
  okayama: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '岡山県'
  },
  hiroshima: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '広島県'
  },
  yamaguchi: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '山口県'
  },
  tokushima: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '徳島県'
  },
  kagawa: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '香川県'
  },
  ehime: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '愛媛県'
  },
  kochi: {
    healthInsuranceRate: 0.1030,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '高知県'
  },
  fukuoka: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '福岡県'
  },
  saga: {
    healthInsuranceRate: 0.1030,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '佐賀県'
  },
  nagasaki: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '長崎県'
  },
  kumamoto: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '熊本県'
  },
  oita: {
    healthInsuranceRate: 0.1003,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '大分県'
  },
  miyazaki: {
    healthInsuranceRate: 0.0998,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '宮崎県'
  },
  kagoshima: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '鹿児島県'
  },
  okinawa: {
    healthInsuranceRate: 0.1000,
    nursingInsuranceRate: 0.0159,
    employeePensionRate: 0.183,
    prefectureName: '沖縄県'
  }
};

export const PREFECTURE_OPTIONS = Object.entries(PREFECTURE_RATES).map(([key, value]) => ({
  value: key,
  label: value.prefectureName
}));

export function getInsuranceRates(prefectureCode: string): InsuranceRates {
  return PREFECTURE_RATES[prefectureCode] || PREFECTURE_RATES.tokyo!;
}
