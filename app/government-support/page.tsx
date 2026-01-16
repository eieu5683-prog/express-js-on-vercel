'use client'

import NextSeoWrapper from '@/src/components/NextSeoWrapper'
import { seoPresets } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export default function GovernmentSupportPage() {
  return (
    <>
      <NextSeoWrapper {...seoPresets.governmentSupport()} />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>정부지원금 정보</h1>
        <p>
          정부지원금 신청 방법과 조건을 확인하세요.
        </p>
      </main>
    </>
  )
}

