# 나랏돈네비

2026년 사업자 세금 일정과 정부지원금 정보를 제공하는 Next.js 애플리케이션입니다.

## 설치

```bash
npm install
# 또는
yarn install
```

## 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 주요 기능

### 1. 공통 SEO 설정

`src/configs/seo.config.ts` 파일에 전역 SEO 설정이 정의되어 있습니다.

```tsx
import { NEXT_SEO_DEFAULT } from '@/src/configs/seo.config'
```

### 2. 동적 SEO 메타 태그 생성

#### DynamicSEO 컴포넌트 사용

```tsx
import DynamicSEO from '@/src/components/DynamicSEO'

export default function MyPage() {
  return (
    <>
      <DynamicSEO 
        pageType="MAIN" // 'MAIN' | 'DIAGNOSIS' | 'REPORT'
        industryName="내 업종" // 선택사항
      />
      <div>페이지 내용</div>
    </>
  )
}
```

#### 페이지 타입별 특징

- **MAIN**: 현재 월에 맞춘 세금 일정 및 정책자금 공고 키워드 자동 생성
- **DIAGNOSIS**: 업종별 맞춤형 지원금 진단 결과 SEO
- **REPORT**: AI 생성 콘텐츠 표기 규정 준수 메타 태그 포함

### 3. 2026년 일정 반영 동적 키워드

월별 세무 일정 및 정책자금 공고 키워드가 자동으로 생성됩니다:

- 1월: 연말정산, 원천징수
- 2월: 부가가치세, 창업 지원금
- 3월: 소득세, 고용 지원금
- ... (각 월별 특화 키워드)

### 4. JSON-LD 구조화 데이터

구글 검색 결과에 구조화된 데이터를 제공합니다.

```tsx
import JSONLD from '@/src/components/JSONLD'

// Product 스키마 (가격 정보 포함)
<JSONLD
  type="Product"
  data={{
    name: '나랏돈네비 정부지원금 진단 리포트',
    price: '39000',
    url: 'https://narat-don-navi.com/diagnosis',
  }}
/>

// Organization 스키마
<JSONLD
  type="Organization"
  data={{
    sameAs: ['https://www.facebook.com/...'],
  }}
/>
```

### 5. 니치 SEO 전략

특정 비즈니스 타겟을 위한 전용 페이지:

- `/jeonju-hanok`: 전주 한옥마을 에어비앤비 리모델링 지원금
- `/goshiwon`: 무인 고시원 창업 자금 지원

### 6. AI 콘텐츠 투명성 확보

2026년 1월 23일부터 시행되는 'AI 생성 콘텐츠 표기 의무화' 규정에 따라:

- REPORT 페이지에 자동으로 AI 콘텐츠 표기 메타 태그 추가
- 본문에 "본 리포트의 초안은 AI에 의해 생성되었습니다" 문구 포함

### 7. Sitemap 및 Robots.txt

`next-sitemap`을 사용하여 자동으로 sitemap을 생성합니다.

```bash
npm run build  # postbuild 스크립트가 자동으로 sitemap 생성
```

생성된 파일:
- `public/sitemap.xml`
- `public/robots.txt`

## 환경 변수

`.env.local` 파일을 생성하여 다음 변수를 설정하세요:

```
NEXT_PUBLIC_BASE_URL=https://narat-don-navi.com
SITE_URL=https://narat-don-navi.com
```

## 프로젝트 구조

```
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (DefaultSEO 포함)
│   ├── page.tsx            # 홈 페이지
│   ├── diagnosis/          # 진단 페이지
│   ├── report/             # 리포트 페이지
│   ├── jeonju-hanok/       # 전주 한옥마을 특화 페이지
│   └── goshiwon/           # 고시원 특화 페이지
├── src/
│   ├── configs/
│   │   └── seo.config.ts   # 공통 SEO 설정
│   └── components/
│       ├── DefaultSEO.tsx   # 전역 SEO 컴포넌트
│       ├── DynamicSEO.tsx   # 동적 SEO 컴포넌트
│       └── JSONLD.tsx      # JSON-LD 구조화 데이터
└── lib/
    └── seo.ts              # SEO 유틸리티 함수
```

## 기술 스택

- Next.js 14 (App Router)
- React 18
- TypeScript
- next-seo
- next-sitemap

## SEO 체크리스트

- ✅ 공통 메타 정보 정의
- ✅ 2026년 일정 반영 동적 키워드
- ✅ 니치 SEO 전략 (전주 한옥마을, 고시원)
- ✅ Sitemap 및 Robots.txt 설정
- ✅ JSON-LD 구조화 데이터 (Product, Organization, Article)
- ✅ AI 콘텐츠 투명성 확보
- ✅ Open Graph 및 Twitter 카드 지원

## 라이선스

MIT
