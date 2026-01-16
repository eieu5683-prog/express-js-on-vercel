'use client';

import { NextSeo } from 'next-seo';
import { generateDynamicSEO } from '@/lib/seo';
import JSONLD from '@/src/components/JSONLD';

export default function GoshiwonPage() {
  const seoConfig = generateDynamicSEO({
    title: '무인 고시원 창업 자금 지원 및 고시원 시설 개선 정부지원금',
    description:
      '무인 고시원 창업 자금 지원과 고시원 시설 개선 정부지원금 신청 방법을 확인하세요. 프리미엄 고시원 자동화 모델에 특화된 지원금 정보를 제공합니다.',
    path: '/goshiwon',
    keywords: [
      '무인 고시원 창업 자금 지원',
      '고시원 시설 개선 정부지원금',
      '프리미엄 고시원 자동화',
      '고시원 창업 지원금',
      '무인 고시원 정책자금',
    ],
  });

  return (
    <>
      <NextSeo {...seoConfig} />
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

