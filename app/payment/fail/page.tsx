'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import DynamicSEO from '@/src/components/DynamicSEO';

export const dynamic = 'force-dynamic';

/**
 * 결제 실패 페이지
 * 토스페이먼츠 결제 실패 시 리다이렉트되는 페이지
 */
export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const ksicCode = searchParams.get('code') || '';
  const errorCode = searchParams.get('code') || '';
  const errorMessage = searchParams.get('message') || '';

  return (
    <>
      <DynamicSEO
        pageType="MAIN"
        customTitle="결제 실패"
        customDescription="결제 처리 중 오류가 발생했습니다."
        path="/payment/fail"
      />
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 text-center space-y-6">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-400">결제에 실패했습니다</h1>
          
          {errorCode && (
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">오류 코드</p>
              <p className="text-slate-200 font-mono">{errorCode}</p>
            </div>
          )}

          {errorMessage && (
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">오류 메시지</p>
              <p className="text-slate-200">{errorMessage}</p>
            </div>
          )}

          <div className="space-y-3 pt-4">
            <Link
              href={ksicCode ? `/diagnosis?code=${ksicCode}` : '/diagnosis'}
              className="block w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              다시 시도하기
            </Link>
            <Link
              href="/"
              className="block w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500">
              결제 관련 문의사항이 있으시면 고객센터로 연락해주세요.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

