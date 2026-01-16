'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DynamicSEO from '@/src/components/DynamicSEO';

/**
 * 결제 성공 페이지
 * 토스페이먼츠 결제 성공 후 리다이렉트되는 페이지
 */
export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ksicCode = searchParams.get('code') || '';
  const orderId = searchParams.get('orderId') || '';
  const userIdea = searchParams.get('idea') || '';

  useEffect(() => {
    // 리포트 페이지로 리다이렉트
    if (ksicCode) {
      const params = new URLSearchParams({
        code: ksicCode,
        orderId: orderId,
      });
      if (userIdea) {
        params.set('idea', userIdea);
      }
      router.push(`/report/view?${params.toString()}`);
    }
  }, [ksicCode, orderId, userIdea, router]);

  return (
    <>
      <DynamicSEO
        pageType="MAIN"
        customTitle="결제 완료"
        customDescription="결제가 완료되었습니다. 리포트를 생성 중입니다..."
        path="/payment/success"
      />
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-400">결제가 완료되었습니다!</h1>
          <p className="text-slate-400">리포트를 생성 중입니다. 잠시만 기다려주세요...</p>
        </div>
      </main>
    </>
  );
}

