'use client'

import JSONLD from '@/src/components/JSONLD'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <>
      <JSONLD
        type="Organization"
        data={{
          sameAs: [
            'https://www.facebook.com/naratdonnavi',
            'https://www.instagram.com/naratdonnavi',
          ],
        }}
      />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>2026년 사업자 세금 일정 및 정부지원금 정보</h1>
        <p>
          단돈 39,000원으로 1억 원의 기회를 잡으세요. 업종코드 분석을 통한 맞춤형 지원금 로드맵을 제공합니다.
        </p>
        <section style={{ marginTop: '2rem' }}>
          <h2>주요 서비스</h2>
          <ul>
            <li>
              <a href="/diagnosis">정부지원금 진단</a> - 업종코드 분석을 통한 맞춤형 지원금 로드맵
            </li>
            <li>
              <a href="/report">사업계획서 PSST 생성</a> - AI 기반 합격 사업계획서 초안
            </li>
            <li>
              <a href="/jeonju-hanok">전주 한옥마을 특화 지원금</a>
            </li>
            <li>
              <a href="/goshiwon">고시원 창업 지원금</a>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}

