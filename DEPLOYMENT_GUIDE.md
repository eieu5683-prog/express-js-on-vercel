# 웹 배포 가이드

나랏돈네비 Next.js 프로젝트를 Vercel에 배포하는 가이드입니다.

## 배포 전 체크리스트

### 1. 환경 변수 확인

다음 환경 변수들이 설정되어 있는지 확인하세요:

- `OPENAI_API_KEY`: OpenAI API 키 (서버 사이드 전용)
- `NEXT_PUBLIC_TOSS_CLIENT_KEY`: 토스페이먼츠 클라이언트 키
- `NEXT_PUBLIC_BASE_URL`: 웹사이트 기본 URL
- `SITE_URL`: 사이트 URL (sitemap 생성용)

### 2. 빌드 테스트

로컬에서 빌드가 성공하는지 확인:

```bash
npm run build
```

### 3. Git 저장소 준비

모든 변경사항을 커밋하고 푸시:

```bash
git add .
git commit -m "배포 준비"
git push origin main
```

## Vercel 배포

### 방법 1: Vercel CLI 사용

#### 1. Vercel CLI 설치

```bash
npm i -g vercel
```

#### 2. 로그인

```bash
vercel login
```

#### 3. 프로젝트 배포

```bash
# 프로덕션 배포
vercel --prod

# 또는 대화형 배포
vercel
```

### 방법 2: Vercel 웹 대시보드 사용

#### 1. Vercel 계정 생성

1. [Vercel](https://vercel.com) 접속
2. GitHub/GitLab/Bitbucket 계정으로 로그인

#### 2. 프로젝트 가져오기

1. "Add New Project" 클릭
2. Git 저장소 선택
3. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 감지)
   - **Output Directory**: `.next` (자동 감지)

#### 3. 환경 변수 설정

Settings → Environment Variables에서 다음 변수 추가:

```
OPENAI_API_KEY=sk-proj-실제_키_입력
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_실제_키_입력
NEXT_PUBLIC_BASE_URL=https://narat-don-navi.vercel.app
SITE_URL=https://narat-don-navi.vercel.app
```

**중요:**
- Production, Preview, Development 각각 설정 가능
- Production 환경에만 실제 키 설정 권장

#### 4. 배포

"Deploy" 버튼 클릭

## 환경 변수 설정

### 필수 환경 변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 키 (서버 사이드) | `sk-proj-...` |
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | 토스페이먼츠 클라이언트 키 | `test_ck_...` |
| `NEXT_PUBLIC_BASE_URL` | 웹사이트 기본 URL | `https://narat-don-navi.vercel.app` |
| `SITE_URL` | 사이트 URL (sitemap용) | `https://narat-don-navi.vercel.app` |

### 선택적 환경 변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `PYTHON_API_URL` | Python 백엔드 API URL | `http://localhost:8000` |

## 배포 후 확인

### 1. 사이트 접속 확인

배포된 URL로 접속하여 정상 작동 확인:
- `https://narat-don-navi.vercel.app`

### 2. 주요 페이지 확인

- [ ] 홈 페이지: `/`
- [ ] 진단 페이지: `/diagnosis`
- [ ] 리포트 페이지: `/report`
- [ ] 타임라인 페이지: `/timeline`

### 3. 기능 테스트

- [ ] SEO 메타 태그 확인 (개발자 도구)
- [ ] 결제 플로우 테스트
- [ ] AI 리포트 생성 테스트
- [ ] Sitemap 접근: `/sitemap.xml`
- [ ] Robots.txt 접근: `/robots.txt`

## 커스텀 도메인 설정

### 1. 도메인 추가

1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 도메인 입력 (예: `narat-don-navi.com`)
3. DNS 설정 안내에 따라 DNS 레코드 추가

### 2. DNS 설정

도메인 제공업체에서 다음 DNS 레코드 추가:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL 인증서

Vercel이 자동으로 SSL 인증서를 발급합니다 (Let's Encrypt).

## 성능 최적화

### 1. 이미지 최적화

Next.js Image 컴포넌트 사용:

```tsx
import Image from 'next/image';

<Image
  src="/og-image.png"
  alt="나랏돈네비"
  width={1200}
  height={630}
  priority
/>
```

### 2. 정적 페이지 생성

가능한 페이지는 정적으로 생성:

```tsx
// app/page.tsx
export const dynamic = 'force-static';
```

### 3. 캐싱 설정

API 라우트에 캐싱 헤더 추가:

```typescript
// app/api/generate-psst/route.ts
export const revalidate = 3600; // 1시간
```

## 모니터링

### 1. Vercel Analytics

Vercel 대시보드에서 Analytics 활성화:
- Settings → Analytics
- 실시간 트래픽 모니터링

### 2. 에러 로깅

Vercel Logs에서 에러 확인:
- 프로젝트 → Deployments → 함수 로그

### 3. 성능 모니터링

- Web Vitals 확인
- Lighthouse 점수 확인

## 문제 해결

### 빌드 실패

**문제**: 빌드 중 오류 발생

**해결**:
1. 로컬에서 빌드 테스트: `npm run build`
2. 에러 메시지 확인
3. 환경 변수 확인
4. 의존성 확인: `npm install`

### 환경 변수 오류

**문제**: API 키가 작동하지 않음

**해결**:
1. Vercel 대시보드에서 환경 변수 확인
2. 변수명 오타 확인
3. Production 환경에 설정되어 있는지 확인
4. 재배포

### Sitemap 생성 실패

**문제**: `/sitemap.xml` 접근 불가

**해결**:
1. `next-sitemap.config.js` 확인
2. `postbuild` 스크립트 확인
3. 빌드 로그 확인

### 결제 오류

**문제**: 토스페이먼츠 결제창이 열리지 않음

**해결**:
1. `NEXT_PUBLIC_TOSS_CLIENT_KEY` 확인
2. 클라이언트 키가 올바른지 확인
3. 브라우저 콘솔에서 에러 확인

## CI/CD 설정

### GitHub Actions (선택사항)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 배포 전략

### 1. Preview 배포

모든 PR에 대해 자동으로 Preview 배포:
- `https://narat-don-navi-git-branch.vercel.app`

### 2. Production 배포

`main` 브랜치에 푸시 시 자동 Production 배포:
- `https://narat-don-navi.vercel.app`

### 3. 롤백

이전 배포로 롤백:
1. Deployments → 이전 배포 선택
2. "Promote to Production" 클릭

## 보안 체크리스트

배포 전 확인:

- [ ] `.env.local` 파일이 Git에 커밋되지 않음
- [ ] `OPENAI_API_KEY`가 `NEXT_PUBLIC_` 접두사 없이 설정됨
- [ ] 프로덕션 환경 변수가 올바르게 설정됨
- [ ] API 라우트에 적절한 에러 처리 구현됨
- [ ] 민감한 정보가 클라이언트에 노출되지 않음

## 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [환경 변수 설정](https://vercel.com/docs/concepts/projects/environment-variables)

