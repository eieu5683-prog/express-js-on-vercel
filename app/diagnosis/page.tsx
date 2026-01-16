'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JSONLD from '@/src/components/JSONLD';
import PSSTLocked from '@/src/components/PSSTLocked';
import PSSTViewer from '@/src/components/PSSTViewer';
import { getKsicInfo } from '@/src/data/ksicData';
import { canAccessPSST } from '@/src/lib/payment';

export const dynamic = 'force-dynamic';
import { convertPSSTContentToDocument } from '@/src/lib/psst-converter';
import { PSSTDocument } from '@/src/types/psst';
import ScheduleBadge, { ScheduleList } from '@/src/components/ScheduleBadge';
import { getSchedulesByGrade, getGrantSchedulesByMonth } from '@/src/data/scheduleData';

function DiagnosisContent() {
  const searchParams = useSearchParams();
  const ksicCode = searchParams.get('code') || '';
  const industryName = searchParams.get('industry') || undefined;

  const [ksicInfo, setKsicInfo] = useState(getKsicInfo(ksicCode));
  const [psstDocument, setPsstDocument] = useState<PSSTDocument | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userIdea, setUserIdea] = useState<string>('');

  useEffect(() => {
    if (ksicCode) {
      const info = getKsicInfo(ksicCode);
      setKsicInfo(info);
      
      // 로컬스토리지에 업종코드 저장 (타임라인 페이지에서 사용)
      if (typeof window !== 'undefined') {
        localStorage.setItem('diagnosis_ksic_code', ksicCode);
        
        // 저장된 사업 아이디어 불러오기
        const savedIdea = localStorage.getItem('user_idea') || '';
        setUserIdea(savedIdea);
      }
      
      // 결제 상태 확인
      if (info && canAccessPSST(ksicCode) && info.psst) {
        const doc = convertPSSTContentToDocument(info.psst, info);
        setPsstDocument(doc);
        setIsUnlocked(true);
      }
    }
  }, [ksicCode]);

  const handleUnlock = () => {
    if (ksicInfo && ksicInfo.psst) {
      const doc = convertPSSTContentToDocument(ksicInfo.psst, ksicInfo);
      setPsstDocument(doc);
      setIsUnlocked(true);
      
      // 사업 아이디어 저장
      if (typeof window !== 'undefined' && userIdea) {
        localStorage.setItem('user_idea', userIdea);
      }
      
      // 리포트 생성 페이지로 이동 (결제 완료 후)
      if (typeof window !== 'undefined') {
        const reportUrl = `/report/view?code=${ksicInfo.code}${userIdea ? `&idea=${encodeURIComponent(userIdea)}` : ''}`;
        // 약간의 딜레이 후 리다이렉트 (사용자 경험 개선)
        setTimeout(() => {
          window.location.href = reportUrl;
        }, 1000);
      }
    }
  };

  return (
    <>
      <JSONLD
        type="Product"
        data={{
          name: '나랏돈네비 정부지원금 진단 리포트',
          description:
            '업종코드 분석을 통한 맞춤형 지원금 로드맵 제공. 단돈 39,000원으로 1억 원의 기회를 잡으세요.',
          price: '39000',
          url: 'https://narat-don-navi.com/diagnosis',
          image: 'https://narat-don-navi.com/diagnosis-og.png',
          rating: {
            value: '4.8',
            count: '150',
          },
        }}
      />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>
          {industryName || ksicInfo?.name || ''} 정부지원금 진단
        </h1>
        
        {/* 사업 아이디어 입력 (결제 전) */}
        {ksicInfo && !isUnlocked && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #3b82f6' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
              💡 사업 아이디어 입력 (선택사항)
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
              사업 아이디어를 입력하시면 더욱 맞춤형 PSST 리포트를 생성할 수 있습니다.
            </p>
            <textarea
              value={userIdea}
              onChange={(e) => setUserIdea(e.target.value)}
              placeholder="예: AI 기반 자동화 시스템을 개발하여 중소기업의 업무 효율성을 높이고 싶습니다..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
              }}
            />
            {userIdea && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
                ✅ 입력된 아이디어는 리포트 생성 시 활용됩니다.
              </p>
            )}
          </div>
        )}

        {ksicInfo && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem' }}>진단 결과</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>업종코드</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{ksicInfo.code}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>등급</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: ksicInfo.grade === 'S' ? '#2563eb' : '#666' }}>
                  {ksicInfo.grade}등급
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>예상 지원금액</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>
                  {ksicInfo.maxAmount}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>전문가 솔루션</div>
              <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '4px' }}>
                {ksicInfo.solution}
              </div>
            </div>

            {/* 지원 가능한 공고 개수 표시 (SEO 및 사용자 경험 개선) */}
            <ScheduleBadge grade={ksicInfo.grade} year={2026} />

            {/* 현재 월 지원 가능한 일정 목록 */}
            {(() => {
              const currentMonth = new Date().getMonth() + 1;
              const currentYear = new Date().getFullYear();
              const availableSchedules = getSchedulesByGrade(ksicInfo.grade).filter(
                (s) => s.year === currentYear && s.month === currentMonth && s.category === 'GRANT'
              );

              if (availableSchedules.length > 0) {
                return (
                  <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {currentYear}년 {currentMonth}월 지원 가능한 공고
                    </h3>
                    <ScheduleList schedules={availableSchedules} showDescription={false} />
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}

        {/* PSST 잠금/해제 */}
        {ksicInfo && ksicInfo.psst && (
          <div style={{ marginTop: '2rem' }}>
            {!isUnlocked ? (
              <PSSTLocked
                ksicInfo={ksicInfo}
                onUnlock={handleUnlock}
                userIdea={searchParams.get('idea') || ''}
              />
            ) : (
              psstDocument && <PSSTViewer document={psstDocument} />
            )}
          </div>
        )}

        {!ksicInfo && (
          <div style={{ marginTop: '2rem', padding: '2rem', textAlign: 'center', color: '#666' }}>
            <p>업종코드를 입력해주세요.</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              URL에 ?code=업종코드 형식으로 추가하세요.
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default function DiagnosisPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiagnosisContent />
    </Suspense>
  );
}

