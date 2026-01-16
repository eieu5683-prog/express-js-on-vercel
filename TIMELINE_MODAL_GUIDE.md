# 타임라인 모달 기능 가이드

타임라인 페이지의 전문가 솔루션 팝업 기능 및 업종코드 기반 맞춤 진단 가이드입니다.

## 주요 기능

### 1. 전문가 솔루션 팝업 (모달)

타임라인의 각 카드를 클릭하면 전문가 시크릿 솔루션을 보여주는 모달이 표시됩니다.

**기능:**
- framer-motion을 활용한 부드러운 애니메이션
- 배경 블러 효과
- 클릭 시 닫기 기능
- 업종코드 기반 맞춤 솔루션 표시

### 2. 업종코드 기반 맞춤 진단

사용자가 입력한 업종코드를 기반으로 타임라인 일정을 필터링합니다.

**매칭 원리:**
1. 사용자가 진단 페이지에서 업종코드 입력
2. 업종코드(5자리)를 추출하여 `ksicData.ts`와 대조
3. 등급 판정: S(매우 유망) ~ D(부적합)
4. 공고 필터링: 해당 등급이 지원 가능한 사업만 표시

**예시:**
- 소프트웨어 개발업 (S등급) → 기술 중심 R&D 사업 위주로 추천
- 일반 소상공인 (B/C등급) → 소상공인 대상 지원금 위주로 추천

### 3. 데이터 저장 및 연동

**로컬스토리지 저장:**
- 진단 페이지에서 업종코드를 입력하면 `localStorage`에 저장
- 타임라인 페이지에서 자동으로 불러와 맞춤 일정 표시

**URL 파라미터 지원:**
- `/timeline?code=58221` 형식으로 직접 업종코드 전달 가능

## 사용 흐름

### 1. 진단 페이지에서 업종코드 입력
```
/diagnosis?code=58221
```
- 업종코드 입력 및 진단 결과 확인
- 로컬스토리지에 업종코드 자동 저장

### 2. 타임라인 페이지 접속
```
/timeline
```
- 저장된 업종코드 자동 불러오기
- 등급에 맞는 일정만 필터링하여 표시
- 맞춤 진단 결과 배지 표시

### 3. 일정 카드 클릭
- 전문가 솔루션 모달 표시
- 업종코드 기반 맞춤 전략 제시
- 상세 정보 및 공식 공고문 링크 제공

## 모달 구성 요소

### 1. 헤더
- 제목: "전문가 시크릿 솔루션"
- 닫기 버튼 (X)

### 2. 대상 사업 정보
- 사업명
- 예정 월
- 지원금액 (있는 경우)

### 3. 업종 정보 (업종코드가 있는 경우)
- 업종명 및 코드
- 등급

### 4. Core Strategy
- 업종코드 기반 전문가 솔루션
- 업종코드가 없으면 기본 메시지

### 5. 상세 정보
- 일정 설명
- AI 표기법 준수 문구 포함

### 6. 공식 공고문 링크 (있는 경우)
- "공식 공고문 확인하기 →" 버튼

## 코드 구조

### 업종코드 가져오기
```typescript
// URL 파라미터에서
const codeFromUrl = searchParams.get('code');

// 로컬스토리지에서
const codeFromStorage = localStorage.getItem('diagnosis_ksic_code');
```

### 등급 기반 필터링
```typescript
const getFilteredSchedules = (schedules: GrantSchedule[]) => {
  if (!ksicInfo) return schedules;
  
  return schedules.filter((schedule) => 
    schedule.targetGrade.includes(ksicInfo.grade)
  );
};
```

### 전문가 솔루션 가져오기
```typescript
const getExpertSolution = (item: GrantSchedule): string => {
  if (ksicInfo && ksicInfo.solution) {
    return ksicInfo.solution;
  }
  return '전문화된 전략이 필요한 사업입니다...';
};
```

## 애니메이션 설정

### 모달 등장
```typescript
initial={{ opacity: 0, scale: 0.9, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.9, y: 20 }}
transition={{ duration: 0.2 }}
```

### 배경 블러
```css
bg-black/80 backdrop-blur-sm
```

## 결제 후 PSST 구축 확인

### 데이터 결합 프로세스
1. 사용자 입력: 간단한 '사업 아이디어'
2. 전문가 데이터: 엑셀에 저장된 '전문가 핵심 문구'
3. AI 결합: 두 데이터를 결합하여 PSST 생성

### PSST 구조화
- **P (Problem)**: 문제 인식
- **S (Solution)**: 해결 방안
- **S (Scale-up)**: 성장 전략
- **T (Team)**: 팀 구성

### 잠금 해제
- 결제 완료 시점에만 상세 데이터 노출
- 사용자는 복사하여 HWP 파일에 붙여넣기 가능

### 법적 준수
- 모든 초안 하단에 "나랏돈네비 AI 기술 활용" 문구 자동 삽입
- 2026년 1월 23일 시행 규정 준수

## 문제 해결

### 모달이 표시되지 않을 때
- 카드에 `onClick` 이벤트가 제대로 연결되었는지 확인
- `selectedItem` 상태가 올바르게 설정되는지 확인

### 업종코드가 불러와지지 않을 때
- 로컬스토리지에 데이터가 저장되었는지 확인
- 브라우저 개발자 도구에서 확인: `localStorage.getItem('diagnosis_ksic_code')`
- URL 파라미터로 직접 전달: `/timeline?code=58221`

### 필터링이 작동하지 않을 때
- `ksicInfo`가 올바르게 설정되었는지 확인
- `targetGrade` 배열에 사용자 등급이 포함되어 있는지 확인

## 개선 사항

### 향후 추가 가능한 기능
1. **즐겨찾기**: 관심 있는 일정을 저장
2. **알림 설정**: 일정 시작 전 알림
3. **공유 기능**: 일정을 다른 사람과 공유
4. **다운로드**: 일정을 PDF나 이미지로 다운로드

## 참고 자료

- `app/timeline/page.tsx`: 타임라인 페이지 컴포넌트
- `app/diagnosis/page.tsx`: 진단 페이지 (업종코드 입력)
- `src/data/ksicData.ts`: 업종코드 데이터베이스
- `src/data/scheduleData.ts`: 일정 데이터베이스

