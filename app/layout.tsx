import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '나랏돈네비 - 2026 정부지원금 진단 및 사업계획서 PSST 생성',
  description: '단돈 39,000원으로 1억 원의 기회를 잡으세요. 업종코드 분석을 통한 맞춤형 지원금 로드맵 제공.',
  keywords: ['2026년 사업자 세금 일정', '정부지원금', '사업자 세금', '세금 일정', '정부 지원금', '2026 세금'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://express-js-on-vercel.vercel.app',
    siteName: '나랏돈네비',
    title: '나랏돈네비 - 2026 정부지원금 진단 및 사업계획서 PSST 생성',
    description: '단돈 39,000원으로 1억 원의 기회를 잡으세요. 업종코드 분석을 통한 맞춤형 지원금 로드맵 제공.',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

// 모든 페이지를 동적 렌더링으로 설정 (next-seo 호환성)
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
