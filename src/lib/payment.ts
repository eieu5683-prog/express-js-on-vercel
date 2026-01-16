/**
 * 결제 관련 유틸리티
 * 39,000원 결제 후 PSST 데이터 잠금 해제
 */

import { KsicInfo, PSSTContent } from '@/src/data/types';

/**
 * 결제 상태
 */
export interface PaymentStatus {
  isPaid: boolean;
  paymentDate?: string;
  transactionId?: string;
}

/**
 * 결제 정보 저장 키
 */
const PAYMENT_STORAGE_KEY = 'psst_payment_status';

/**
 * 결제 상태 저장
 */
export function savePaymentStatus(ksicCode: string, transactionId: string): void {
  if (typeof window === 'undefined') return;

  const paymentData: Record<string, PaymentStatus> = JSON.parse(
    localStorage.getItem(PAYMENT_STORAGE_KEY) || '{}'
  );

  paymentData[ksicCode] = {
    isPaid: true,
    paymentDate: new Date().toISOString(),
    transactionId,
  };

  localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(paymentData));
}

/**
 * 결제 상태 확인
 */
export function checkPaymentStatus(ksicCode: string): PaymentStatus {
  if (typeof window === 'undefined') {
    return { isPaid: false };
  }

  const paymentData: Record<string, PaymentStatus> = JSON.parse(
    localStorage.getItem(PAYMENT_STORAGE_KEY) || '{}'
  );

  return paymentData[ksicCode] || { isPaid: false };
}

/**
 * PSST 데이터 접근 권한 확인
 */
export function canAccessPSST(ksicCode: string): boolean {
  return checkPaymentStatus(ksicCode).isPaid;
}

/**
 * PSST 데이터 가져오기 (결제 확인 포함)
 */
export function getPSSTContent(ksicInfo: KsicInfo): PSSTContent | null {
  // 결제 확인
  if (!canAccessPSST(ksicInfo.code)) {
    return null;
  }

  // PSST 데이터 반환
  return ksicInfo.psst || null;
}

/**
 * 결제 금액 (고정)
 */
export const PAYMENT_AMOUNT = 39000;

/**
 * 결제 처리 (실제 결제 API 연동 필요)
 */
export async function processPayment(ksicCode: string): Promise<{
  success: boolean;
  transactionId?: string;
  error?: string;
}> {
  try {
    // TODO: 실제 결제 API 연동
    // 예시: 토스페이먼츠, 아임포트, PG사 API 등

    // 모의 결제 처리
    const transactionId = `TXN_${Date.now()}_${ksicCode}`;

    // 결제 상태 저장
    savePaymentStatus(ksicCode, transactionId);

    return {
      success: true,
      transactionId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '결제 처리 중 오류가 발생했습니다.',
    };
  }
}

/**
 * 결제 취소
 */
export function cancelPayment(ksicCode: string): void {
  if (typeof window === 'undefined') return;

  const paymentData: Record<string, PaymentStatus> = JSON.parse(
    localStorage.getItem(PAYMENT_STORAGE_KEY) || '{}'
  );

  delete paymentData[ksicCode];

  localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(paymentData));
}

