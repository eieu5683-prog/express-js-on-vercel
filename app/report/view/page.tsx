'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import JSONLD from '@/src/components/JSONLD';
import CopyButton from '@/src/components/CopyButton';
import { getKsicInfo } from '@/src/data/ksicData';
import { canAccessPSST, savePaymentStatus } from '@/src/lib/payment';

export const dynamic = 'force-dynamic';

interface ReportData {
  success: boolean;
  data?: string;
  notice?: string;
  metadata?: {
    ksicCode: string;
    industryName: string;
    grade: string;
    generatedAt: string;
  };
  error?: string;
}

function ReportViewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ksicCode = searchParams.get('code') || '';
  const userIdea = searchParams.get('idea') || '';
  const orderId = searchParams.get('orderId') || '';

  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ksicInfo, setKsicInfo] = useState(getKsicInfo(ksicCode));

  useEffect(() => {
    // 결제 성공 여부 확인
    if (!ksicCode) {
      setError('업종코드가 필요합니다.');
      setLoading(false);
      return;
    }

    // 결제 완료 확인 (orderId가 있으면 결제 성공으로 간주)
    const isPaymentSuccess = orderId || canAccessPSST(ksicCode);

    if (!isPaymentSuccess) {
      setError('결제가 완료되지 않았습니다. 먼저 결제를 완료해주세요.');
      setLoading(false);
      return;
    }

    // 결제 상태 저장 (orderId가 있는 경우)
    if (orderId && !canAccessPSST(ksicCode)) {
      savePaymentStatus(ksicCode, orderId);
    }

    // AI 리포트 생성
    const fetchAiReport = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/generate-psst', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ksicCode,
            userIdea: userIdea || '사업 아이디어를 입력해주세요.',
            additionalKeywords: searchParams.get('keywords') || '',
            scoreFactors:
              searchParams.get('scoreFactors') ||
              '디지털 전환, 지역경제 활성화, ESG 경영',
            differentiationPoint: searchParams.get('diffPoint') || '',
          }),
        });

        const result: ReportData = await res.json();

        if (!result.success) {
          throw new Error(result.error || '리포트 생성에 실패했습니다.');
        }

        setReportData(result);
      } catch (err) {
        console.error('리포트 생성 오류:', err);
        setError(
          err instanceof Error
            ? err.message
            : '리포트를 가져오는데 실패했습니다.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAiReport();
  }, [ksicCode, userIdea, orderId, searchParams]);

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-red-400 mb-2">오류 발생</h2>
              <p className="text-slate-300">{error}</p>
              <a
                href="/diagnosis"
                className="mt-4 inline-block text-blue-400 hover:text-blue-300 underline"
              >
                진단 페이지로 돌아가기 →
              </a>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!reportData || !reportData.data) {
    return (
      <>
        <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-slate-400">리포트 데이터가 없습니다.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <JSONLD
        type="Product"
        data={{
          name: '합격 사업계획서 PSST 초안',
          description:
            '관공서 로직에 맞춘 리포트입니다. (2026년 1월 23일 AI 콘텐츠 표기 규정 준수)',
          price: '39000',
          url: `https://narat-don-navi.com/report/view?code=${ksicCode}`,
          image: 'https://narat-don-navi.com/report-og.png',
        }}
      />
      <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        <div className="max-w-4xl mx-auto p-6">
          {/* 헤더 */}
          <div className="mb-8 pb-6 border-b border-slate-800">
            <h1 className="text-2xl font-bold text-blue-400 mb-2">
              PSST 사업계획서 초안
            </h1>
            {reportData.metadata && (
              <div className="text-sm text-slate-400 space-y-1">
                <p>
                  <strong>업종:</strong> {reportData.metadata.industryName} (
                  {reportData.metadata.ksicCode})
                </p>
                <p>
                  <strong>등급:</strong> {reportData.metadata.grade}등급
                </p>
                <p>
                  <strong>생성일:</strong>{' '}
                  {new Date(reportData.metadata.generatedAt).toLocaleString(
                    'ko-KR'
                  )}
                </p>
              </div>
            )}
          </div>

          {/* AI가 생성한 텍스트를 화면에 렌더링 */}
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed text-slate-200 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              {reportData.data}
            </div>
          </div>

          {/* 플로팅 복사 버튼 */}
          {reportData.data && <CopyButton content={reportData.data} />}

          {/* AI 표기법 준수 문구 */}
          {reportData.notice && (
            <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-500 leading-relaxed">
              <p className="text-center whitespace-pre-line">
                {reportData.notice}
              </p>
            </div>
          )}

          {/* 액션 버튼 (HWP 다운로드) */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={async () => {
                if (!reportData.data) return;
                
                try {
                  // 리포트 데이터를 PSSTDocument 형식으로 변환하여 HWP 생성
                  // 간단한 변환 (실제로는 더 정교한 파싱 필요)
                  const response = await fetch('/api/hwp/generate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      document: {
                        problem: { title: 'Problem', marketIssues: [], socialReasons: [], economicReasons: [], urgency: reportData.data },
                        solution: { title: 'Solution', coreTechnology: '', keyFeatures: [], differentiation: [], competitiveAdvantage: '' },
                        scaleUp: { title: 'Scale-up', revenueModel: '', revenueStreams: [], marketEntryStrategy: '', expansionPlan: '', marketShareGoal: '', milestones: [] },
                        team: { title: 'Team', ceo: { name: '', role: '', expertise: [], experience: '' }, coreTeam: [], network: [], capabilities: [] },
                        metadata: reportData.metadata || { industryCode: ksicCode, industryName: '', userInput: userIdea, createdAt: new Date().toISOString(), aiGenerated: true, version: '1.0.0' },
                      },
                    }),
                  });

                  if (!response.ok) {
                    throw new Error('HWP 생성에 실패했습니다.');
                  }

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `PSST_${ksicCode}_${new Date().toISOString().slice(0, 10)}.hwp`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                } catch (err) {
                  alert('HWP 다운로드 중 오류가 발생했습니다.');
                  console.error(err);
                }
              }}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              📄 HWP 다운로드
            </button>
          </div>
          
          <p className="mt-4 text-xs text-slate-500 text-center">
            💡 리포트 내용 복사는 하단의 플로팅 버튼을 사용하세요.
          </p>

          {/* 안내 문구 */}
          <div className="mt-6 p-4 bg-amber-900/20 border border-amber-500/30 rounded-xl text-xs text-amber-300">
            <p className="font-bold mb-1">⚠️ 중요 안내</p>
            <p>
              본 리포트는 AI가 생성한 초안입니다. 실제 제출 전에 반드시
              검토하고 수정하여 사용하시기 바랍니다. 정확한 정보는 공식
              공고문을 확인하세요.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

function LoadingSpinner() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-20 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="text-blue-400 font-bold animate-pulse text-center">
        심사위원의 시각으로 합격 리포트를 분석 중입니다...
      </p>
      <p className="text-slate-500 text-sm text-center">
        잠시만 기다려주세요. 고품질 리포트를 생성하고 있습니다.
      </p>
    </main>
  );
}

export default function ReportViewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportViewContent />
    </Suspense>
  );
}
