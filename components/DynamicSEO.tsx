'use client'

import { NextSeo } from 'next-seo'
import { generateDynamicSEO, DynamicSEOProps } from '@/lib/seo'

interface DynamicSEOComponentProps extends DynamicSEOProps {
  children?: React.ReactNode
}

/**
 * 동적 SEO 컴포넌트
 * 페이지별로 커스텀 SEO 설정을 적용할 수 있는 컴포넌트
 */
export default function DynamicSEO({
  title,
  description,
  path,
  keywords,
  imageUrl,
  children,
}: DynamicSEOComponentProps) {
  const seoConfig = generateDynamicSEO({
    title,
    description,
    path,
    keywords,
    imageUrl,
  })

  return (
    <>
      <NextSeo {...seoConfig} />
      {children}
    </>
  )
}

