# 토스페이먼츠 결제 연동 가이드

나랏돈네비 프로젝트에 토스페이먼츠 계좌이체 결제 기능을 연동한 가이드입니다.

## 설치

```bash
npm install @tosspayments/payment-sdk
```

## 환경 변수 설정

`.env.local` 파일에 토스페이먼츠 클라이언트 키를 추가하세요:

```env
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
```

**주의**: 프로덕션 환경에서는 실제 클라이언트 키를 사용해야 합니다.

## 컴포넌트 구조

### 1. TossPayment 컴포넌트 (`src/components/TossPayment.tsx`)

토스페이먼츠 결제 버튼 컴포넌트입니다.

**Props:**
- `userName`: 고객 이름 (기본값: '고객')
- `userPhone`: 고객 전화번호 (선택사항)
- `ksicCode`: 업종코드 (필수)
- `userIdea`: 사용자 아이디어 (선택사항)
- `onPaymentSuccess`: 결제 성공 콜백 (선택사항)

**사용 예시:**

```tsx
import TossPayment from '@/src/components/TossPayment';

<TossPayment
  userName="홍길동"
  userPhone="010-1234-5678"
  ksicCode="58221"
  userIdea="AI 기반 자동화 시스템 개발"
/>
```

### 2. CopyButton 컴포넌트 (`src/components/CopyButton.tsx`)

리포트 전체 복사 버튼 컴포넌트입니다.

**Props:**
- `content`: 복사할 내용 (필수)
- `className`: 추가 CSS 클래스 (선택사항)

**사용 예시:**

```tsx
import CopyButton from '@/src/components/CopyButton';

<CopyButton content={reportText} />
```

### 3. PSSTLocked 컴포넌트 (`src/components/PSSTLocked.tsx`)

PSST 잠금 해제 화면 컴포넌트입니다. 내부적으로 `TossPayment` 컴포넌트를 사용합니다.

**Props:**
- `ksicInfo`: 업종 정보 (필수)
- `onUnlock`: 잠금 해제 콜백 (사용하지 않음, 토스페이먼츠 리다이렉트 사용)
- `userIdea`: 사용자 아이디어 (선택사항)
- `userName`: 고객 이름 (선택사항)
- `userPhone`: 고객 전화번호 (선택사항)

## 결제 플로우

### 1. 결제 시작

사용자가 `TossPayment` 컴포넌트의 결제 버튼을 클릭합니다.

```tsx
// 사용자가 버튼 클릭
<TossPayment ksicCode="58221" userIdea="..." />
```

### 2. 토스페이먼츠 결제창 열기

`loadTossPayments`를 사용하여 결제창을 엽니다.

```typescript
const tossPayments = await loadTossPayments(clientKey);
await tossPayments.requestPayment('계좌이체', {
  amount: 39000,
  orderId: `NAVY_${ksicCode}_${Date.now()}`,
  orderName: '나랏돈네비 2026 합격 리포트 (1회권)',
  customerName: userName,
  successUrl: `${window.location.origin}/payment/success?code=${ksicCode}&orderId=${orderId}`,
  failUrl: `${window.location.origin}/payment/fail?code=${ksicCode}`,
});
```

### 3. 결제 성공 처리

결제 성공 시 `/payment/success` 페이지로 리다이렉트됩니다.

**`app/payment/success/page.tsx`:**
- `orderId`와 `ksicCode`를 확인
- 결제 상태를 localStorage에 저장
- `/report/view` 페이지로 리다이렉트

### 4. 리포트 생성

`/report/view` 페이지에서:
- 결제 상태 확인 (`canAccessPSST`)
- AI 리포트 생성 API 호출 (`/api/generate-psst`)
- 리포트 표시 및 복사 버튼 제공

### 5. 결제 실패 처리

결제 실패 시 `/payment/fail` 페이지로 리다이렉트됩니다.

**`app/payment/fail/page.tsx`:**
- 오류 메시지 표시
- 다시 시도 또는 홈으로 돌아가기 버튼 제공

## 결제 상태 관리

### localStorage 구조

```typescript
{
  "psst_payment_status": {
    "58221": {
      "isPaid": true,
      "paymentDate": "2026-01-15T10:30:00.000Z",
      "transactionId": "NAVY_58221_1705297800000"
    }
  }
}
```

### 주요 함수 (`src/lib/payment.ts`)

- `savePaymentStatus(ksicCode, transactionId)`: 결제 상태 저장
- `checkPaymentStatus(ksicCode)`: 결제 상태 확인
- `canAccessPSST(ksicCode)`: PSST 접근 권한 확인

## 리포트 복사 기능

### CopyButton 컴포넌트

리포트 페이지 하단에 플로팅 버튼으로 표시됩니다.

**기능:**
1. 클립보드 API를 사용하여 리포트 내용 복사
2. 복사 성공 시 피드백 표시
3. 클립보드 API 미지원 시 대체 방법 사용

**사용 위치:**
- `app/report/view/page.tsx`: 리포트 표시 후 자동으로 추가됨

## 테스트

### 개발 환경 테스트

1. 토스페이먼츠 개발자센터에서 테스트 키 발급
2. `.env.local`에 테스트 키 설정
3. 결제 테스트 진행

### 테스트 시나리오

1. **정상 결제 플로우**
   - 결제 버튼 클릭 → 토스페이먼츠 결제창 → 결제 완료 → 리포트 생성

2. **결제 실패 플로우**
   - 결제 버튼 클릭 → 토스페이먼츠 결제창 → 결제 취소 → 실패 페이지

3. **리포트 복사**
   - 리포트 표시 → 복사 버튼 클릭 → 클립보드에 복사 확인

## 프로덕션 배포 시 주의사항

1. **클라이언트 키 교체**
   - 테스트 키를 실제 클라이언트 키로 교체
   - 환경 변수로 관리

2. **결제 검증**
   - 서버 사이드에서 결제 검증 로직 추가 권장
   - 토스페이먼츠 서버 API를 사용한 결제 검증

3. **보안**
   - 클라이언트 키는 공개되어도 안전하지만, 서버 키는 절대 노출 금지
   - 결제 금액은 서버에서 검증

4. **에러 처리**
   - 네트워크 오류, 타임아웃 등 예외 상황 처리
   - 사용자 친화적인 에러 메시지 제공

## 참고 자료

- [토스페이먼츠 개발자센터](https://developers.tosspayments.com/)
- [토스페이먼츠 SDK 문서](https://docs.tosspayments.com/sdk/js)
- `src/components/TossPayment.tsx`: 결제 컴포넌트 구현
- `src/components/CopyButton.tsx`: 복사 버튼 구현
- `app/payment/success/page.tsx`: 결제 성공 페이지
- `app/payment/fail/page.tsx`: 결제 실패 페이지

