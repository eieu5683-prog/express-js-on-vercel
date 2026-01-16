import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DefaultSEO from '@/src/components/DefaultSEO'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '나랏돈네비 - 2026 정부지원금 진단 및 사업계획서 PSST 생성',
  description: '단돈 39,000원으로 1억 원의 기회를 잡으세요. 업종코드 분석을 통한 맞춤형 지원금 로드맵 제공.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <DefaultSEO />
        {children}
      </body>
    </html>
  )
}
