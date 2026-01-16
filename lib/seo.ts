import { NextSeoProps } from 'next-seo';

/**
 * 동적 메타 태그 생성 함수
 * 2026년 사업자 세금 일정과 정부지원금 키워드를 포함한 SEO 설정 생성
 */
export interface DynamicSEOProps {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  imageUrl?: string;
}

export const generateDynamicSEO = ({
  title,
  description,
  path = '',
  keywords = [],
  imageUrl,
}: DynamicSEOProps): NextSeoProps => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  const fullUrl = `${baseUrl}${path}`;

  // 기본 키워드에 필수 키워드 추가
  const defaultKeywords = [
    '2026년 사업자 세금 일정',
    '정부지원금',
    '사업자 세금',
    '세금 일정',
    '정부 지원금',
    '2026 세금',
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  // 기본 제목 설정
  const defaultTitle = '2026년 사업자 세금 일정 및 정부지원금 정보';
  const seoTitle = title
    ? `${title} | ${defaultTitle}`
    : defaultTitle;

  // 기본 설명 설정
  const defaultDescription =
    '2026년 사업자 세금 일정과 정부지원금 정보를 한눈에 확인하세요. 세금 납부 일정, 정부 지원금 신청 방법, 세금 절감 팁 등을 제공합니다.';
  const seoDescription = description || defaultDescription;

  return {
    title: seoTitle,
    description: seoDescription,
    canonical: fullUrl,
    openGraph: {
      type: 'website',
      url: fullUrl,
      title: seoTitle,
      description: seoDescription,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: seoTitle,
            },
          ]
        : [
            {
              url: `${baseUrl}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: seoTitle,
            },
          ],
      siteName: '나랏돈네비',
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: allKeywords,
      },
      {
        name: 'author',
        content: '나랏돈네비',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        httpEquiv: 'x-ua-compatible',
        content: 'IE=edge',
      },
      {
        property: 'article:published_time',
        content: new Date().toISOString(),
      },
      {
        property: 'article:tag',
        content: '2026년 사업자 세금 일정',
      },
      {
        property: 'article:tag',
        content: '정부지원금',
      },
    ],
    additionalLinkTags: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
  };
};

/**
 * 페이지별 SEO 설정 프리셋
 */
export const seoPresets = {
  home: (): NextSeoProps =>
    generateDynamicSEO({
      title: '홈',
      description:
        '2026년 사업자 세금 일정과 정부지원금 정보를 확인하세요. 세금 납부 일정, 정부 지원금 신청 방법, 세금 절감 팁을 제공합니다.',
      path: '/',
      keywords: ['사업자', '세금', '지원금', '2026'],
    }),

  taxSchedule: (year: number = 2026): NextSeoProps =>
    generateDynamicSEO({
      title: `${year}년 사업자 세금 일정`,
      description: `${year}년 사업자 세금 납부 일정을 확인하세요. 부가가치세, 소득세, 원천징수 등 각종 세금의 납부 일정과 절차를 안내합니다.`,
      path: `/tax-schedule/${year}`,
      keywords: [`${year}년 세금`, '부가가치세', '소득세', '원천징수', '세금 납부'],
    }),

  governmentSupport: (): NextSeoProps =>
    generateDynamicSEO({
      title: '정부지원금 정보',
      description:
        '정부지원금 신청 방법과 조건을 확인하세요. 창업 지원금, 고용 지원금, R&D 지원금 등 다양한 정부 지원 프로그램 정보를 제공합니다.',
      path: '/government-support',
      keywords: ['창업 지원금', '고용 지원금', 'R&D 지원금', '정부 지원 프로그램'],
    }),

  article: (
    articleTitle: string,
    articleDescription: string,
    articlePath: string,
    articleImage?: string
  ): NextSeoProps =>
    generateDynamicSEO({
      title: articleTitle,
      description: articleDescription,
      path: articlePath,
      keywords: ['사업자', '세금', '정부지원금'],
      imageUrl: articleImage,
    }),
};

