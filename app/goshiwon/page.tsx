'use client';

import JSONLD from '@/src/components/JSONLD';

export const dynamic = 'force-dynamic';

export default function GoshiwonPage() {
  return (
    <>
      <JSONLD
        type="Article"
        data={{
          headline: '무인 고시원 창업 자금 지원 및 시설 개선 정부지원금',
          description:
            '프리미엄 고시원 자동화 모델에 특화된 정부지원금 정보',
          image: 'https://narat-don-navi.com/goshiwon-og.png',
          datePublished: new Date().toISOString(),
        }}
      />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>무인 고시원 창업 자금 지원</h1>
        <p>
          프리미엄 고시원 자동화 모델에 관심 있는 예비 창업자들을 위한 전문
          컨설팅 및 지원금 정보를 제공합니다.
        </p>
        <section>
          <h2>고시원 창업 지원 프로그램</h2>
          <ul>
            <li>무인 고시원 창업 자금 지원</li>
            <li>고시원 시설 개선 정부지원금</li>
            <li>자동화 시스템 구축 지원</li>
          </ul>
        </section>
      </main>
    </>
  );
}

