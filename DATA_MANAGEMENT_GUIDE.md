# 데이터 관리 가이드

엑셀 데이터를 코드로 변환하여 관리하는 방법을 안내합니다.

## 프로젝트 파일 구조

```
narat-don-navi/
├── public/                 # 이미지, 파비콘, manifest.json (PWA)
├── src/
│   ├── app/                # Next.js 페이지 로직
│   ├── components/         # 결제 버튼, UI 카드 등 재사용 컴포넌트
│   ├── data/               # ★ 엑셀 데이터가 코드로 변환되어 저장되는 곳
│   │   ├── types.ts        # 데이터 타입 정의
│   │   ├── ksicData.ts     # 업종코드별 등급 및 PSST 데이터
│   │   ├── scheduleData.ts # 2026-2028년 공고 일정 데이터
│   │   └── index.ts        # 통합 export
│   ├── lib/                # 유틸리티 함수
│   │   ├── payment.ts      # 결제 관련 유틸리티
│   │   └── psst-converter.ts # PSST 데이터 변환
│   └── configs/            # SEO 및 환경 설정
├── tailwind.config.ts      # 디자인 설정
└── package.json            # 라이브러리 의존성
```

## 데이터 타입 정의

모든 데이터는 `src/data/types.ts`에 정의된 타입을 따라야 합니다.

### 주요 타입

- `Grade`: 등급 타입 ('S' | 'A' | 'B' | 'C' | 'D')
- `PSSTContent`: PSST 콘텐츠 구조
- `KsicInfo`: 업종 정보
- `ScheduleInfo`: 공고 일정 정보

## 엑셀 데이터를 코드로 변환하기

### Cursor AI 활용

1. **엑셀 데이터 복사**
   - 엑셀 시트에서 데이터를 마우스로 드래그하여 복사
   - 예시 형식:
     ```
     58221 | 시스템 소프트웨어 개발 | S | 최대 1.5억 | R&D 가점 높음 | P:기존 수작업 비효율... | S:AI 자동화... | S_scale:3년 내 매출... | T:전문가 구성...
     ```

2. **Cursor AI 채팅창 열기**
   - `Cmd + L` (Mac) 또는 `Ctrl + L` (Windows)
   - 또는 Cursor AI 채팅 아이콘 클릭

3. **프롬프트 입력**
   ```
   내가 제공하는 엑셀 데이터를 바탕으로 src/data/ksicData.ts 파일의 KSIC_DB 객체를 업데이트해줘.
   데이터 형식은 우리가 정의한 KsicInfo 인터페이스를 엄격히 따라야 해.
   엑셀의 각 행을 객체의 키(업종코드)와 값으로 변환해줘.
   ```

4. **엑셀 데이터 붙여넣기**
   - 복사한 엑셀 데이터를 채팅창에 붙여넣기
   - Cursor AI가 자동으로 코드로 변환

5. **결과 확인**
   - `src/data/ksicData.ts` 파일이 업데이트되었는지 확인
   - 타입 오류가 없는지 확인

## 데이터 관리 실무 팁

### 1. 일회성 결제 로직 연결

사용자가 39,000원을 결제하면, `KSIC_DB[입력코드].psst` 데이터를 화면의 잠금 해제 영역에 바인딩합니다.

**사용 예시:**
```typescript
import { getKsicInfo } from '@/src/data/ksicData';
import { canAccessPSST, getPSSTContent } from '@/src/lib/payment';

const ksicCode = '58221';
const ksicInfo = getKsicInfo(ksicCode);

if (canAccessPSST(ksicCode) && ksicInfo.psst) {
  // PSST 데이터 표시
  const psstContent = getPSSTContent(ksicInfo);
}
```

### 2. 2026년 규제 대응

데이터 변환 시 AI가 생성한 PSST 문구 하단에 다음 문구가 자동으로 포함되도록 합니다:

> **본 초안은 나랏돈네비 AI 기술을 활용하여 작성되었습니다.**
> 
> (2026년 1월 23일부터 시행되는 AI 생성 콘텐츠 표기 의무화 규정 준수)

**자동 추가 위치:**
- PSST 뷰어 컴포넌트 하단
- HWP 파일 생성 시 문서 하단
- 마크다운 변환 시

### 3. 무료 진단 데이터

`grade`와 `maxAmount`는 결제 전 무료 진단 페이지에서 SEO 키워드와 함께 노출하여 사용자 유입을 유도합니다.

**사용 예시:**
```typescript
// 무료 진단 페이지
const ksicInfo = getKsicInfo('58221');

// 등급과 지원금액은 무료로 표시
<div>등급: {ksicInfo.grade}</div>
<div>예상 지원금액: {ksicInfo.maxAmount}</div>

// PSST 데이터는 결제 후 표시
{canAccessPSST('58221') ? (
  <PSSTViewer document={psstDocument} />
) : (
  <PSSTLocked ksicInfo={ksicInfo} onUnlock={handleUnlock} />
)}
```

## 데이터 업데이트 워크플로우

1. **엑셀 데이터 준비**
   - 사장님이 관리하는 엑셀 시트에서 최신 데이터 확인
   - 필요한 컬럼: 업종코드, 업종명, 등급, 지원금액, 솔루션, PSST 데이터

2. **데이터 변환**
   - Cursor AI를 사용하여 엑셀 데이터를 코드로 변환
   - `src/data/ksicData.ts` 파일 업데이트

3. **타입 검증**
   - TypeScript 컴파일 오류 확인
   - 데이터 형식이 `KsicInfo` 인터페이스를 따르는지 확인

4. **테스트**
   - 진단 페이지에서 데이터가 올바르게 표시되는지 확인
   - 결제 후 PSST 데이터가 올바르게 표시되는지 확인

5. **배포**
   - 변경사항 커밋 및 푸시
   - 프로덕션 환경에 배포

## 데이터 구조 예시

### KSIC 데이터 예시

```typescript
'58221': {
  code: '58221',
  name: '시스템 소프트웨어 개발',
  grade: 'S',
  maxAmount: '최대 1.5억',
  solution: 'R&D 가점 높음',
  psst: {
    p: '기존 수작업 비효율...',
    s: 'AI 기반 자동화 시스템...',
    s_scale: '3년 내 매출 50억...',
    t: 'AI/ML 전문가 3명...',
  },
}
```

### 일정 데이터 예시

```typescript
{
  year: 2026,
  schedules: [
    {
      name: '예비창업패키지',
      startDate: '2026-01-15',
      endDate: '2026-02-28',
      amount: '최대 1억원',
      targetIndustries: ['IT/소프트웨어', '바이오', '제조업'],
      link: 'https://example.com/pre-startup',
      note: '신규 창업자 대상',
    },
  ],
}
```

## 주의사항

1. **데이터 일관성**: 모든 데이터는 정의된 타입을 엄격히 따라야 합니다.
2. **AI 표기법**: PSST 데이터에는 반드시 AI 표기 문구가 포함되어야 합니다.
3. **결제 연동**: PSST 데이터는 결제 후에만 접근 가능하도록 구현되어 있습니다.
4. **SEO 최적화**: 무료 진단 데이터는 SEO 키워드와 함께 노출하여 유입을 유도합니다.

## 문제 해결

### 타입 오류 발생

- `src/data/types.ts`의 타입 정의 확인
- 데이터 형식이 인터페이스와 일치하는지 확인

### 결제 후 데이터 표시 안 됨

- `localStorage`에 결제 정보가 저장되었는지 확인
- 브라우저 개발자 도구에서 확인

### Cursor AI 변환 실패

- 엑셀 데이터 형식 확인
- 프롬프트를 더 구체적으로 작성
- 수동으로 데이터 입력 고려

