import { DefaultSeoProps } from 'next-seo';

export const NEXT_SEO_DEFAULT: DefaultSeoProps = {
  titleTemplate: '%s | 나랏돈네비',
  defaultTitle: '나랏돈네비 - 2026 정부지원금 진단 및 사업계획서 PSST 생성',
  description:
    '단돈 39,000원으로 1억 원의 기회를 잡으세요. 업종코드 분석을 통한 맞춤형 지원금 로드맵 제공.',
  canonical: 'https://narat-don-navi.com',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://narat-don-navi.com',
    siteName: '나랏돈네비',
    images: [
      {
        url: 'https://narat-don-navi.com/og-image.png',
        width: 1200,
        height: 630,
        alt: '나랏돈네비 메인 이미지',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@naratdonnavi',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        '2026년 사업자 세금 일정, 정부지원금, 사업계획서 PSST, 업종코드 분석, 정책자금 진단',
    },
    {
      name: 'author',
      content: '나랏돈네비',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
};

