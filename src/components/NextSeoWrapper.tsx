'use client';

import { useEffect, useState } from 'react';
import { NextSeoProps } from 'next-seo';

/**
 * NextSeo 래퍼 컴포넌트
 * 빌드 타임 오류를 방지하기 위해 동적 import 사용
 */
export default function NextSeoWrapper(props: NextSeoProps) {
  const [NextSeo, setNextSeo] = useState<any>(null);

  useEffect(() => {
    // 클라이언트에서만 next-seo 로드
    import('next-seo').then((mod) => {
      setNextSeo(() => mod.NextSeo);
    });
  }, []);

  if (!NextSeo) return null;
  return <NextSeo {...props} />;
}

