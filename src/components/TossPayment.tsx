'use client';

import { useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

interface TossPaymentProps {
  userName?: string;
  userPhone?: string;
  ksicCode: string;
  userIdea?: string;
  onPaymentSuccess?: () => void;
}

/**
 * 토스페이먼츠 결제 컴포넌트
 * 계좌이체 방식으로 39,000원 결제 처리
 */
export default function TossPayment({
  userName = '고객',
  userPhone,
  ksicCode,
  userIdea = '',
  onPaymentSuccess,
}: TossPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 토스 개발자센터에서 발급받은 '클라이언트 키'
  // 프로덕션 환경에서는 환경 변수로 관리해야 함
  const clientKey =
    process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ||
    'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const tossPayments = await loadTossPayments(clientKey);

      // 주문번호 생성 (유니크해야 함)
      const orderId = `NAVY_${ksicCode}_${Date.now()}`;

      // 성공 시 이동할 URL
      const successUrl = new URL('/payment/success', window.location.origin);
      successUrl.searchParams.set('code', ksicCode);
      successUrl.searchParams.set('orderId', orderId);
      if (userIdea) {
        successUrl.searchParams.set('idea', userIdea);
      }

      // 실패 시 이동할 URL
      const failUrl = new URL('/payment/fail', window.location.origin);
      failUrl.searchParams.set('code', ksicCode);

      await tossPayments.requestPayment('계좌이체', {
        amount: 39000,
        orderId: orderId,
        orderName: '나랏돈네비 2026 합격 리포트 (1회권)',
        customerName: userName,
        successUrl: successUrl.toString(),
        failUrl: failUrl.toString(),
      });
    } catch (err) {
      console.error('결제창 열기 실패:', err);
      setError(
        err instanceof Error
          ? err.message
          : '결제창을 열 수 없습니다. 다시 시도해주세요.'
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? '결제창 열기 중...' : '💳 39,000원 계좌이체 결제하기'}
      </button>
      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      <p className="mt-2 text-xs text-slate-400 text-center">
        결제 완료 후 리포트가 자동으로 생성됩니다.
      </p>
    </div>
  );
}

