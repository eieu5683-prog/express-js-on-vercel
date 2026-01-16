# Vercel 환경 변수 설정 가이드

나랏돈네비 프로젝트를 Vercel에 배포할 때 필요한 환경 변수 설정 방법입니다.

## 설정 방법

### 1단계: Vercel 프로젝트 생성

1. [Vercel](https://vercel.com) 접속 및 로그인
2. "Add New Project" 클릭
3. Git 저장소 선택: `eieu5683-prog/express-js-on-vercel`
   - 또는 저장소 옆의 **[Import]** 버튼 클릭

### 2단계: 환경 변수 설정

**Settings → Environment Variables** 섹션을 펼칩니다.

다음 변수들을 **하나씩** 추가합니다:

#### 🔒 서버 사이드 전용 (절대 클라이언트에 노출 금지!)

| Name | Value | 환경 | 용도 |
|------|-------|------|------|
| `OPENAI_API_KEY` | `sk-proj-실제_키_입력` | Production | OpenAI API 호출 |
| `TOSS_SECRET_KEY` | `live_sk_실제_시크릿_키` | Production | 결제 검증, 취소, 환불 등 서버 작업 |

**⚠️ 중요:**
- 이 변수들은 `NEXT_PUBLIC_` 접두사를 **절대** 붙이지 마세요!
- 서버 사이드 API 라우트에서만 사용됩니다.
- 클라이언트에 노출되면 보안 위험이 있습니다.
- **토스페이먼츠 라이브 환경**: `live_sk_...` 형식의 시크릿 키를 사용하세요.

#### ⚠️ 클라이언트 노출 가능

| Name | Value | 환경 | 용도 |
|------|-------|------|------|
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | `live_ck_실제_클라이언트_키` | Production | 결제창 열기 (클라이언트) |

**설명:**
- 토스페이먼츠 결제창을 열기 위해 클라이언트에서 사용됩니다.
- `NEXT_PUBLIC_` 접두사가 있어야 클라이언트에서 접근 가능합니다.
- **토스페이먼츠 라이브 환경**: `live_ck_...` 형식의 클라이언트 키를 사용하세요.

**📌 토스페이먼츠 키 구분:**
- **테스트 환경**: `test_ck_...` (클라이언트), `test_sk_...` (시크릿)
- **라이브 환경**: `live_ck_...` (클라이언트), `live_sk_...` (시크릿)

#### ✅ 공개 가능 (배포 후 실제 URL로 변경 필수!)

| Name | Value | 환경 | 용도 |
|------|-------|------|------|
| `NEXT_PUBLIC_BASE_URL` | `https://express-js-on-vercel.vercel.app` | Production 또는 All | 클라이언트에서 사용 (SEO 메타 태그 등) |
| `SITE_URL` | `https://express-js-on-vercel.vercel.app` | Production 또는 All | 서버에서 사용 (Sitemap 생성 등) |

**환경 설정 옵션:**

**옵션 1: Production만 설정 (권장)**
- Production 환경에만 설정
- Preview 배포는 자동으로 자신의 URL 사용
- Development는 로컬 URL 사용

**옵션 2: All로 설정 (간단함)**
- 모든 환경에서 동일한 Production URL 사용
- Preview 배포도 Production URL 사용 (보통 문제 없음)
- 설정이 간단함

**⚠️ 중요:**
- `https://your-project.vercel.app`은 **예시 값**입니다!
- 배포 후 Vercel에서 생성된 **Production URL**로 변경해야 합니다.

**Production URL 확인 방법:**
1. Vercel 대시보드 → 프로젝트 → **Settings** → **Domains**
2. **Production Domain** 확인 (예: `express-js-on-vercel.vercel.app`)

**환경 변수 설정:**
```
NEXT_PUBLIC_BASE_URL = https://express-js-on-vercel.vercel.app
SITE_URL = https://express-js-on-vercel.vercel.app
```

**⚠️ 주의:**
- Preview URL (`express-js-on-vercel-git-main-...`)은 사용하지 마세요!
- Production URL만 사용하세요 (`express-js-on-vercel.vercel.app`)
- `https://` 접두사 필수, 마지막 슬래시(`/`) 없음

**자세한 설명:** 
- `BASE_URL_GUIDE.md`: 기본 설명
- `VERCEL_URL_SETUP.md`: Vercel URL 확인 및 설정 방법

## 환경 변수 추가 방법

1. **Name** 필드에 변수명 입력 (예: `OPENAI_API_KEY`)
2. **Value** 필드에 실제 값 입력 (예: `sk-proj-...`)
3. **Environment** 선택:
   - Production: 프로덕션 배포에만 적용
   - Preview: Preview 배포에만 적용
   - Development: 로컬 개발에만 적용
4. **Add** 버튼 클릭

## 보안 체크리스트

배포 전 반드시 확인:

- [ ] `OPENAI_API_KEY`에 `NEXT_PUBLIC_` 접두사가 **없음**
- [ ] `TOSS_SECRET_KEY`에 `NEXT_PUBLIC_` 접두사가 **없음**
- [ ] Production 환경에만 실제 키가 설정됨
- [ ] Preview/Development 환경에는 테스트 키 또는 빈 값 사용

## 변수 사용 위치

### 서버 사이드 (API 라우트)

```typescript
// app/api/generate-psst/route.ts
const openaiKey = process.env.OPENAI_API_KEY; // ✅ 정상
```

```typescript
// app/api/payment/verify/route.ts (예시)
const tossSecret = process.env.TOSS_SECRET_KEY; // ✅ 정상
```

### 클라이언트 사이드

```typescript
// src/components/TossPayment.tsx
const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY; // ✅ 정상
```

**❌ 절대 하지 말 것:**

```typescript
// ❌ 위험! 클라이언트에 노출됨
const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
```

## 문제 해결

### 환경 변수가 작동하지 않을 때

1. **변수명 확인**: 오타가 없는지 확인
2. **재배포**: 환경 변수 추가 후 재배포 필요
3. **환경 확인**: Production 환경에 설정되어 있는지 확인
4. **접두사 확인**: 서버 전용 변수에 `NEXT_PUBLIC_`가 없는지 확인

### 빌드 실패

환경 변수가 없어서 빌드가 실패할 수 있습니다:
- 필수 변수는 모두 설정했는지 확인
- 변수명이 정확한지 확인

## 참고 자료

- [Vercel 환경 변수 문서](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js 환경 변수 문서](https://nextjs.org/docs/basic-features/environment-variables)

