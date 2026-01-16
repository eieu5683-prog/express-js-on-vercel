'use client';

import { NextSeo } from 'next-seo';
import { generateDynamicSEO } from '@/lib/seo';

interface SEOProps {
  pageType: 'MAIN' | 'DIAGNOSIS' | 'REPORT';
  industryName?: string;
  customTitle?: string;
  customDescription?: string;
  path?: string;
  imageUrl?: string;
}

/**
 * 2026년 세무 일정 및 정책자금 공고 월별 키워드 매핑
 */
const getMonthlyKeywords = (month: number): string[] => {
  const monthlyKeywords: Record<number, string[]> = {
    1: ['1월 세금 신고', '연말정산', '원천징수', '1월 정책자금 공고'],
    2: ['2월 부가가치세', '2월 정부지원금', '창업 지원금'],
    3: ['3월 소득세', '3월 정책자금', '고용 지원금'],
    4: ['4월 부가가치세 신고', '4월 지원금 공고'],
    5: ['5월 세금 납부', '5월 정부지원금'],
    6: ['6월 부가가치세', '상반기 정책자금'],
    7: ['7월 세금 신고', '하반기 지원금'],
    8: ['8월 부가가치세', '8월 정책자금 공고'],
    9: ['9월 세금 납부', '9월 지원금'],
    10: ['10월 부가가치세', '10월 정부지원금'],
    11: ['11월 세금 신고', '11월 정책자금'],
    12: ['12월 연말정산 준비', '12월 지원금', '연말 정책자금'],
  };

  return monthlyKeywords[month] || [];
};

/**
 * 2026년 AI 생성 콘텐츠 표기 의무화 규정 준수 메타 태그
 * 2026년 1월 23일부터 시행되는 'AI 생성 콘텐츠 표기 의무화' 규정 준수
 */
const getAIContentMetaTags = () => [
  {
    name: 'ai-content-disclosure',
    content: '본 콘텐츠의 일부는 AI에 의해 생성되었습니다.',
  },
  {
    name: 'ai-generated-content',
    content: 'true',
  },
  {
    name: 'ai-content-regulation',
    content: '2026년 1월 23일 AI 생성 콘텐츠 표기 의무화 규정 준수',
  },
  {
    property: 'article:author',
    content: '나랏돈네비 (AI 생성 가이드 포함)',
  },
  {
    property: 'article:disclosure',
    content: '본 리포트의 초안은 AI에 의해 생성되었습니다.',
  },
  {
    property: 'article:published_time',
    content: new Date().toISOString(),
  },
  {
    property: 'article:modified_time',
    content: new Date().toISOString(),
  },
];

export default function DynamicSEO({
  pageType,
  industryName,
  customTitle,
  customDescription,
  path,
  imageUrl,
}: SEOProps) {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  /**
   * 2026년 세무 일정별 타이틀 생성
   */
  const getTaxScheduleTitle = (month: number): string => {
    const scheduleMap: Record<number, string> = {
      1: '2026년 1월 연말정산 및 원천징수 신고 일정',
      2: '2026년 2월 부가가치세 신고 및 창업 지원금 공고',
      3: '2026년 3월 소득세 신고 및 고용 지원금 공고',
      4: '2026년 4월 부가가치세 신고 및 지원금 공고',
      5: '2026년 5월 세금 납부 및 정부지원금 신청',
      6: '2026년 6월 부가가치세 신고 및 상반기 정책자금',
      7: '2026년 7월 세금 신고 및 하반기 지원금 공고',
      8: '2026년 8월 부가가치세 신고 및 정책자금 공고',
      9: '2026년 9월 세금 납부 및 지원금 신청',
      10: '2026년 10월 부가가치세 신고 및 정부지원금 공고',
      11: '2026년 11월 세금 신고 및 정책자금 공고',
      12: '2026년 12월 연말정산 준비 및 연말 정책자금',
    };
    return scheduleMap[month] || `${currentYear}년 ${month}월 사업자 세금 일정 및 정책자금 공고`;
  };

  // 2026년 세무 일정 및 키워드 매핑
  const seoData = {
    MAIN: {
      title:
        customTitle ||
        getTaxScheduleTitle(currentMonth),
      description:
        customDescription ||
        `2026년 ${currentMonth}월에 꼭 신청해야 할 정부지원금을 확인하세요. 업종코드 분석을 통한 맞춤형 지원금 로드맵을 제공합니다.`,
      keywords: [
        `2026년 ${currentMonth}월 사업자 세금 일정`,
        `${currentMonth}월 정책자금 공고`,
        '정부지원금',
        '업종코드 분석',
        ...getMonthlyKeywords(currentMonth),
      ],
    },
    DIAGNOSIS: {
      title:
        customTitle ||
        `2026년 ${industryName || '내 업종'} 맞춤형 1억 지원금 진단 결과 | ${currentMonth}월 세무 일정 반영`,
      description:
        customDescription ||
        `업종코드 분석 결과 ${industryName || '사장님'} 업종은 'S등급'입니다. 2026년 ${currentMonth}월 세무 일정을 반영한 맞춤형 지원금 로드맵을 확인하세요. 단돈 39,000원으로 1억 원의 기회를 잡으세요.`,
      keywords: [
        `2026년 ${industryName || '업종'} 맞춤형 지원금`,
        `${industryName || '업종'} 업종코드 분석`,
        '정부지원금 진단',
        'S등급 지원금',
        '1억 지원금',
        `2026년 ${currentMonth}월 세무 일정`,
      ],
    },
    REPORT: {
      title:
        customTitle ||
        `2026년 ${industryName ? `${industryName} ` : ''}합격 사업계획서 PSST 초안 | AI 생성 가이드 포함 (2026.1.23 규정 준수)`,
      description:
        customDescription ||
        `관공서 로직에 맞춘 리포트입니다. (2026년 1월 23일 AI 콘텐츠 표기 규정 준수) 본 리포트의 초안은 AI에 의해 생성되었습니다. ${industryName ? `${industryName} 업종 특화 ` : ''}사업계획서 PSST를 제공합니다.`,
      keywords: [
        '사업계획서 PSST',
        'AI 생성 사업계획서',
        '합격 사업계획서',
        '정부지원금 사업계획서',
        '2026 AI 콘텐츠 표기',
        '2026년 1월 23일 AI 표기법',
        ...(industryName ? [`${industryName} 사업계획서`] : []),
      ],
    },
  };

  const selected = seoData[pageType];
  const basePath = path || (pageType === 'MAIN' ? '/' : `/${pageType.toLowerCase()}`);

  // AI 콘텐츠 표기 메타 태그 추가 (REPORT 페이지에만)
  // 2026년 1월 23일부터 시행되는 AI 생성 콘텐츠 표기 의무화 규정 준수
  const additionalMetaTags = pageType === 'REPORT' ? getAIContentMetaTags() : [];

  const seoConfig = generateDynamicSEO({
    title: selected.title,
    description: selected.description,
    path: basePath,
    keywords: selected.keywords,
    imageUrl,
  });

  // AI 콘텐츠 메타 태그 병합
  const finalSeoConfig = {
    ...seoConfig,
    additionalMetaTags: [
      ...(seoConfig.additionalMetaTags || []),
      ...additionalMetaTags,
    ],
  };

  return <NextSeo {...finalSeoConfig} />;
}

