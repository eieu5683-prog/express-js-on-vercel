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
3. Git 저장소 선택 (GitHub/GitLab/Bitbucket)
4. 프로젝트 설정:
   - **Framework Preset**: Next.js (자동 감지)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동)
   - **Output Directory**: `.next` (자동)

### 3단계: 환경 변수 설정

Settings → Environment Variables에서 추가:

```
OPENAI_API_KEY=sk-proj-실제_키
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_실제_키
NEXT_PUBLIC_BASE_URL=https://narat-don-navi.vercel.app
SITE_URL=https://narat-don-navi.vercel.app
```

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

