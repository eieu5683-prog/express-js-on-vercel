# SEO 사용 가이드

## 개요

나랏돈네비 프로젝트는 `next-seo`를 사용하여 각 페이지별로 2026년 세무 일정과 업종명이 포함된 동적 타이틀을 생성합니다.

## 기본 설정

### 1. 공통 SEO 설정 (`src/configs/seo.config.ts`)

```typescript
import { NEXT_SEO_DEFAULT } from '@/src/configs/seo.config';

// 전역 SEO 설정이 layout.tsx에 적용됨
```

## 페이지별 동적 SEO 사용

### 메인 페이지

현재 월에 맞춘 2026년 세무 일정이 자동으로 타이틀에 포함됩니다.

```tsx
import DynamicSEO from '@/src/components/DynamicSEO';

export default function Home() {
  return (
    <>
      <DynamicSEO pageType="MAIN" />
      {/* 페이지 내용 */}
    </>
  );
}
```

**생성되는 타이틀 예시:**
- 1월: "2026년 1월 연말정산 및 원천징수 신고 일정 | 나랏돈네비"
- 2월: "2026년 2월 부가가치세 신고 및 창업 지원금 공고 | 나랏돈네비"
- 3월: "2026년 3월 소득세 신고 및 고용 지원금 공고 | 나랏돈네비"
- ... (각 월별로 자동 변경)

### 진단 결과 페이지

업종명이 포함된 동적 타이틀이 생성됩니다.

```tsx
'use client';

import { useSearchParams } from 'next/navigation';
import DynamicSEO from '@/src/components/DynamicSEO';

export default function DiagnosisPage() {
  const searchParams = useSearchParams();
  const industryName = searchParams.get('industry'); // URL 쿼리에서 업종명 가져오기

  return (
    <>
      <DynamicSEO 
        pageType="DIAGNOSIS" 
        industryName={industryName} 
      />
      {/* 페이지 내용 */}
    </>
  );
}
```

**생성되는 타이틀 예시:**
- 업종명 없음: "2026년 내 업종 맞춤형 1억 지원금 진단 결과 | 1월 세무 일정 반영 | 나랏돈네비"
- 업종명 있음: "2026년 숙박업 맞춤형 1억 지원금 진단 결과 | 1월 세무 일정 반영 | 나랏돈네비"

**URL 예시:**
- `/diagnosis` - 기본 타이틀
- `/diagnosis?industry=숙박업` - 숙박업 포함 타이틀
- `/diagnosis?industry=음식점업` - 음식점업 포함 타이틀

### 리포트 페이지 (AI 표기법 준수)

업종명이 포함되고, 2026년 1월 23일 AI 표기법 규정에 맞춘 메타 정보가 자동으로 추가됩니다.

```tsx
'use client';

import { useSearchParams } from 'next/navigation';
import DynamicSEO from '@/src/components/DynamicSEO';

export default function ReportPage() {
  const searchParams = useSearchParams();
  const industryName = searchParams.get('industry');

  return (
    <>
      <DynamicSEO 
        pageType="REPORT" 
        industryName={industryName} 
      />
      {/* 페이지 내용 */}
    </>
  );
}
```

**생성되는 타이틀 예시:**
- 업종명 없음: "2026년 합격 사업계획서 PSST 초안 | AI 생성 가이드 포함 (2026.1.23 규정 준수) | 나랏돈네비"
- 업종명 있음: "2026년 숙박업 합격 사업계획서 PSST 초안 | AI 생성 가이드 포함 (2026.1.23 규정 준수) | 나랏돈네비"

**자동 추가되는 AI 표기법 메타 태그:**
- `ai-content-disclosure`: "본 콘텐츠의 일부는 AI에 의해 생성되었습니다."
- `ai-generated-content`: "true"
- `ai-content-regulation`: "2026년 1월 23일 AI 생성 콘텐츠 표기 의무화 규정 준수"
- `article:disclosure`: "본 리포트의 초안은 AI에 의해 생성되었습니다."
- `article:author`: "나랏돈네비 (AI 생성 가이드 포함)"
- `article:published_time`: 현재 시간
- `article:modified_time`: 현재 시간

## 커스텀 타이틀 및 설명

필요한 경우 커스텀 타이틀과 설명을 직접 지정할 수 있습니다.

```tsx
<DynamicSEO
  pageType="MAIN"
  customTitle="커스텀 타이틀"
  customDescription="커스텀 설명"
/>
```

## 2026년 세무 일정 매핑

각 월별로 다음과 같은 세무 일정이 타이틀에 반영됩니다:

| 월 | 세무 일정 타이틀 |
|---|---|
| 1월 | 2026년 1월 연말정산 및 원천징수 신고 일정 |
| 2월 | 2026년 2월 부가가치세 신고 및 창업 지원금 공고 |
| 3월 | 2026년 3월 소득세 신고 및 고용 지원금 공고 |
| 4월 | 2026년 4월 부가가치세 신고 및 지원금 공고 |
| 5월 | 2026년 5월 세금 납부 및 정부지원금 신청 |
| 6월 | 2026년 6월 부가가치세 신고 및 상반기 정책자금 |
| 7월 | 2026년 7월 세금 신고 및 하반기 지원금 공고 |
| 8월 | 2026년 8월 부가가치세 신고 및 정책자금 공고 |
| 9월 | 2026년 9월 세금 납부 및 지원금 신청 |
| 10월 | 2026년 10월 부가가치세 신고 및 정부지원금 공고 |
| 11월 | 2026년 11월 세금 신고 및 정책자금 공고 |
| 12월 | 2026년 12월 연말정산 준비 및 연말 정책자금 |

## AI 표기법 규정 준수

2026년 1월 23일부터 시행되는 'AI 생성 콘텐츠 표기 의무화' 규정에 따라:

1. **REPORT 페이지**에 자동으로 AI 관련 메타 태그가 추가됩니다.
2. 본문에도 AI 생성 콘텐츠임을 명시하는 섹션이 포함됩니다.
3. 검색 엔진이 AI 생성 콘텐츠를 인식할 수 있도록 구조화된 메타 정보를 제공합니다.

## 주의사항

- `DynamicSEO` 컴포넌트는 클라이언트 컴포넌트(`'use client'`)에서만 사용 가능합니다.
- 업종명은 URL 쿼리 파라미터(`?industry=업종명`)로 전달하거나, 직접 props로 전달할 수 있습니다.
- 메인 페이지는 현재 월에 따라 자동으로 타이틀이 변경됩니다.

