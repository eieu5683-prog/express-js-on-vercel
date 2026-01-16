'use client';

interface JSONLDProps {
  type: 'Product' | 'Organization' | 'Article';
  data: Record<string, any>;
}

/**
 * JSON-LD 구조화 데이터 컴포넌트
 * 구글 검색 결과에 구조화된 데이터를 제공하여 검색 노출을 향상시킵니다.
 */
export default function JSONLD({ type, data }: JSONLDProps) {
  const getSchema = () => {
    switch (type) {
      case 'Product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name || '나랏돈네비 정부지원금 진단 리포트',
          description:
            data.description ||
            '업종코드 분석을 통한 맞춤형 지원금 로드맵 제공',
          image: data.image || 'https://narat-don-navi.com/og-image.png',
          brand: {
            '@type': 'Brand',
            name: '나랏돈네비',
          },
          offers: {
            '@type': 'Offer',
            price: data.price || '39000',
            priceCurrency: 'KRW',
            availability: 'https://schema.org/InStock',
            url: data.url || 'https://narat-don-navi.com',
          },
          aggregateRating: data.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: data.rating.value || '4.8',
                reviewCount: data.rating.count || '150',
              }
            : undefined,
        };

      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: '나랏돈네비',
          url: 'https://narat-don-navi.com',
          logo: 'https://narat-don-navi.com/logo.png',
          description:
            '2026년 정부지원금 진단 및 사업계획서 PSST 생성 서비스',
          sameAs: data.sameAs || [],
        };

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.headline,
          description: data.description,
          image: data.image,
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          author: {
            '@type': 'Organization',
            name: '나랏돈네비',
          },
          publisher: {
            '@type': 'Organization',
            name: '나랏돈네비',
            logo: {
              '@type': 'ImageObject',
              url: 'https://narat-don-navi.com/logo.png',
            },
          },
        };

      default:
        return {};
    }
  };

  const schema = getSchema();

  // undefined 값 제거
  const cleanSchema = Object.fromEntries(
    Object.entries(schema).filter(([_, v]) => v !== undefined)
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}

