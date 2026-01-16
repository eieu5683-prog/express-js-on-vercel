'use client';

import { useEffect, useState } from 'react';
import { NextSeoProps } from 'next-seo';

/**
 * NextSeo 래퍼 컴포넌트
 * 빌드 타임 오류를 방지하기 위해 동적 import 사용
 */
export default function NextSeoWrapper(props: NextSeoProps) {
  const [NextSeo, setNextSeo] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 실행
    setIsClient(true);
    // 클라이언트에서만 next-seo 로드
    import('next-seo').then((mod) => {
      setNextSeo(() => mod.NextSeo);
    });
  }, []);

  // 빌드 타임에는 렌더링하지 않음
  if (!isClient || !NextSeo) return null;
  return <NextSeo {...props} />;
}

