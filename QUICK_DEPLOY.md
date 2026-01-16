# 빠른 배포 가이드

나랏돈네비 프로젝트를 Vercel에 빠르게 배포하는 방법입니다.

## 1분 배포 (Vercel 웹 대시보드)

### 1단계: Git 저장소 준비

```bash
# 모든 변경사항 커밋
git add .
git commit -m "배포 준비"
git push origin main
```

### 2단계: Vercel에 프로젝트 추가

1. [Vercel](https://vercel.com) 접속 및 로그인
2. "Add New Project" 클릭
3. Git 저장소 선택: `eieu5683-prog/express-js-on-vercel` (또는 저장소 옆의 **[Import]** 버튼 클릭)
4. 프로젝트 설정:
   - **Framework Preset**: Next.js (자동 감지)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동)
   - **Output Directory**: `.next` (자동)

### 3단계: 환경 변수 설정 (중요!)

**Settings → Environment Variables** 섹션을 펼치고 다음 변수들을 추가합니다:

#### 필수 환경 변수

| Name | Value | 설명 |
|------|-------|------|
| `OPENAI_API_KEY` | `sk-proj-실제_키_입력` | OpenAI API 키 (서버 사이드 전용) |
| `TOSS_SECRET_KEY` | `live_sk_실제_시크릿_키` | 토스페이먼츠 시크릿 키 (서버 사이드 전용) |
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | `live_ck_실제_클라이언트_키` | 토스페이먼츠 클라이언트 키 (클라이언트 노출 가능) |
| `NEXT_PUBLIC_BASE_URL` | `https://your-project.vercel.app` | 웹사이트 기본 URL |
| `SITE_URL` | `https://your-project.vercel.app` | Sitemap 생성용 URL |

**⚠️ 보안 주의사항:**
- `OPENAI_API_KEY`와 `TOSS_SECRET_KEY`는 **절대** `NEXT_PUBLIC_` 접두사를 붙이지 마세요!
- 이 키들은 서버 사이드에서만 사용되며, 클라이언트에 노출되면 안 됩니다.
- Production 환경에만 실제 키를 설정하세요.

**📌 토스페이먼츠 라이브 환경 키:**
- **클라이언트 키**: `live_ck_...` 형식 → `NEXT_PUBLIC_TOSS_CLIENT_KEY`에 설정
- **시크릿 키**: `live_sk_...` 형식 → `TOSS_SECRET_KEY`에 설정
- 두 개 모두 환경 변수에 추가해야 합니다!

### 4단계: 배포

"Deploy" 버튼 클릭 → 완료! 🎉

## CLI 배포

### 1. Vercel CLI 설치

```bash
npm i -g vercel
```

### 2. 로그인

```bash
vercel login
```

### 3. 배포

```bash
# 프로덕션 배포
vercel --prod

# 또는 대화형
vercel
```

## 배포 후 확인

### 필수 확인 사항

1. **사이트 접속**: `https://narat-don-navi.vercel.app`
2. **홈 페이지**: `/`
3. **진단 페이지**: `/diagnosis`
4. **Sitemap**: `/sitemap.xml`
5. **Robots.txt**: `/robots.txt`

### 기능 테스트

- [ ] 진단 기능 작동
- [ ] 결제 플로우 작동
- [ ] AI 리포트 생성 작동

## 문제 해결

### 빌드 실패

```bash
# 로컬에서 빌드 테스트
npm run build
```

### 환경 변수 오류

Vercel 대시보드 → Settings → Environment Variables 확인

### 자세한 가이드

`DEPLOYMENT_GUIDE.md` 파일 참고

