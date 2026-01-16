'use client';

import { useEffect, useState } from 'react';
import { NEXT_SEO_DEFAULT } from '@/src/configs/seo.config';

/**
 * 전역 SEO 설정 컴포넌트
 * 모든 페이지에 공통으로 적용되는 기본 SEO 설정
 */
export default function DefaultSEO() {
  const [DefaultSeo, setDefaultSeo] = useState<any>(null);

  useEffect(() => {
    // 클라이언트에서만 next-seo 로드
    import('next-seo').then((mod) => {
      setDefaultSeo(() => mod.DefaultSeo);
    });
  }, []);

  if (!DefaultSeo) return null;
  return <DefaultSeo {...NEXT_SEO_DEFAULT} />;
}

