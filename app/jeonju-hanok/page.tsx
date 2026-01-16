'use client';

import JSONLD from '@/src/components/JSONLD';

export const dynamic = 'force-dynamic';

export default function JeonjuHanokPage() {
  return (
    <>
      <JSONLD
        type="Article"
        data={{
          headline: '전주 한옥마을 에어비앤비 리모델링 지원금',
          description:
            '전주 한옥마을 숙박업 특화 정부지원금 및 정책자금 정보',
          image: 'https://narat-don-navi.com/jeonju-hanok-og.png',
          datePublished: new Date().toISOString(),
        }}
      />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>전주 한옥마을 에어비앤비 리모델링 지원금</h1>
        <p>
          전주 한옥마을 지역의 에어비앤비 및 게스트하우스 운영을 위한 맞춤형
          정부지원금 정보를 제공합니다.
        </p>
        <section>
          <h2>한옥마을 숙박업 특화 지원금</h2>
          <ul>
            <li>한옥 리모델링 지원금</li>
            <li>게스트하우스 창업 지원금</li>
            <li>전통문화 관광 숙박업 지원</li>
          </ul>
        </section>
      </main>
    </>
  );
}

