/**
 * formatters.ts
 * 트렌드포스 앱 숫자/화폐 포맷 유틸리티 (한국 원화 기준)
 *
 * @description
 * HomeScreen.tsx 및 CommissionScreen.tsx 에서 import하여 사용.
 * 앱 전역에서 일관된 숫자 표기를 보장합니다.
 */

/**
 * 숫자를 한국 원화 형식으로 변환
 *
 * @example
 * formatCurrency(4281600) → "4,281,600 원"
 * formatCurrency(0)       → "0 원"
 */
export const formatCurrency = (amount: number): string => {
  if (amount === null || amount === undefined) return '0 원';
  return amount.toLocaleString('ko-KR') + ' 원';
};

/**
 * 숫자를 만원 단위 문자열로 변환
 *
 * @example
 * formatManwon(10000000) → "1,000 만원"
 * formatManwon(5000)     → "0 만원"
 */
export const formatManwon = (amount: number): string => {
  const manwon = Math.floor(amount / 10000);
  return manwon.toLocaleString('ko-KR') + ' 만원';
};

/**
 * 0~1 사이 소수를 퍼센트 문자열로 변환
 *
 * @example
 * formatPercent(0.87) → "87%"
 * formatPercent(1)    → "100%"
 */
export const formatPercent = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};

/**
 * 숫자를 간결한 축약 형식으로 변환 (대형 금액 표시용)
 *
 * @example
 * formatCompact(428160000) → "4.28억"
 * formatCompact(4281600)   → "428.16만"
 */
export const formatCompact = (amount: number): string => {
  if (amount >= 100000000) {
    return (amount / 100000000).toFixed(2) + '억';
  }
  if (amount >= 10000) {
    return (amount / 10000).toFixed(2) + '만';
  }
  return amount.toLocaleString('ko-KR');
};
