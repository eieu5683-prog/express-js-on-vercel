'use client'

import { NextSeo } from 'next-seo'
import { seoPresets } from '@/lib/seo'

export default function GovernmentSupportPage() {
  return (
    <>
      <NextSeo {...seoPresets.governmentSupport()} />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>정부지원금 정보</h1>
        <p>
          정부지원금 신청 방법과 조건을 확인하세요.
        </p>
      </main>
    </>
  )
}

