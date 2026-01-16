'use client';

import { DefaultSeo } from 'next-seo';
import { NEXT_SEO_DEFAULT } from '@/src/configs/seo.config';

/**
 * 전역 SEO 설정 컴포넌트
 * 모든 페이지에 공통으로 적용되는 기본 SEO 설정
 */
export default function DefaultSEO() {
  return <DefaultSeo {...NEXT_SEO_DEFAULT} />;
}

