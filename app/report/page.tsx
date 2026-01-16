'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JSONLD from '@/src/components/JSONLD';
import PSSTGenerator from '@/src/components/PSSTGenerator';

export const dynamic = 'force-dynamic';

function ReportContent() {
  const searchParams = useSearchParams();
  const industryName = searchParams.get('industry') || undefined;

  return (
    <>
      <JSONLD
        type="Product"
        data={{
          name: '합격 사업계획서 PSST 초안',
          description:
            '관공서 로직에 맞춘 리포트입니다. (2026년 1월 23일 AI 콘텐츠 표기 규정 준수) 본 리포트의 초안은 AI에 의해 생성되었습니다.',
          price: '39000',
          url: 'https://narat-don-navi.com/report',
          image: 'https://narat-don-navi.com/report-og.png',
        }}
      />
      <main>
        <PSSTGenerator />
        <section style={{ marginTop: '3rem', padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h2>AI 콘텐츠 투명성 (2026년 1월 23일 규정 준수)</h2>
          <p>
            <strong>본 리포트의 초안은 AI에 의해 생성되었습니다.</strong>
          </p>
          <p>
            2026년 1월 23일부터 시행되는 'AI 생성 콘텐츠 표기 의무화' 규정에
            따라 본 콘텐츠의 일부는 AI에 의해 생성되었음을 명시합니다.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            관련 메타 태그: ai-content-disclosure, ai-generated-content, 
            ai-content-regulation, article:disclosure
          </p>
        </section>
      </main>
    </>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportContent />
    </Suspense>
  );
}

