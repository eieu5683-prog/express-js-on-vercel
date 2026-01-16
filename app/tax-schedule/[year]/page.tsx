'use client'

import { NextSeo } from 'next-seo'
import { seoPresets } from '@/lib/seo'
import { use } from 'react'

interface PageProps {
  params: Promise<{ year: string }>
}

export default function TaxSchedulePage({ params }: PageProps) {
  const { year } = use(params)
  const yearNumber = parseInt(year, 10) || 2026

  return (
    <>
      <NextSeo {...seoPresets.taxSchedule(yearNumber)} />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>{yearNumber}년 사업자 세금 일정</h1>
        <p>
          {yearNumber}년 사업자 세금 납부 일정을 확인하세요.
        </p>
      </main>
    </>
  )
}

