# 배포 상태 확인 체크리스트

나랏돈네비 프로젝트의 Vercel 배포 진행 상황을 확인하세요.

## ✅ 완료된 항목

### 1. 프로젝트 준비
- [x] Next.js 프로젝트 생성 완료
- [x] Git 저장소 초기화 완료
- [x] GitHub에 푸시 완료 (`eieu5683-prog/express-js-on-vercel`)
- [x] Vercel 설정 파일 생성 (`vercel.json`, `.vercelignore`)
- [x] 배포 가이드 문서 작성 완료

### 2. 코드 준비
- [x] 모든 소스 코드 작성 완료
- [x] 환경 변수 가이드 작성 완료
- [x] 보안 설정 완료 (`.gitignore`에 `.env*` 포함)

## ⏳ 진행 필요 항목

### 1. Vercel 배포 (아직 진행 안 함)

다음 단계를 진행해야 합니다:

#### 단계 1: Vercel 계정 연결
- [ ] [Vercel](https://vercel.com) 접속
- [ ] GitHub 계정으로 로그인
- [ ] 저장소 권한 부여

#### 단계 2: 프로젝트 Import
- [ ] "Add New Project" 클릭
- [ ] Git 저장소 선택: `eieu5683-prog/express-js-on-vercel`
- [ ] 또는 저장소 옆의 **[Import]** 버튼 클릭

#### 단계 3: 프로젝트 설정
- [ ] Framework Preset: Next.js (자동 감지 확인)
- [ ] Root Directory: `./` (기본값)
- [ ] Build Command: `npm run build` (자동)
- [ ] Output Directory: `.next` (자동)

#### 단계 4: 환경 변수 설정 (중요!)
- [ ] `OPENAI_API_KEY` = `sk-proj-실제_키` (Production)
- [ ] `TOSS_SECRET_KEY` = `live_sk_실제_시크릿_키` (Production)
- [ ] `NEXT_PUBLIC_TOSS_CLIENT_KEY` = `live_ck_실제_클라이언트_키` (Production)
- [ ] `NEXT_PUBLIC_BASE_URL` = `https://your-project.vercel.app` (All)
- [ ] `SITE_URL` = `https://your-project.vercel.app` (All)

#### 단계 5: 배포 실행
- [ ] "Deploy" 버튼 클릭
- [ ] 빌드 완료 대기 (약 2-3분)
- [ ] 배포 성공 확인

### 2. 배포 후 확인

배포가 완료되면 다음을 확인하세요:

- [ ] 배포된 URL 접속 확인
- [ ] 홈 페이지 (`/`) 작동 확인
- [ ] 진단 페이지 (`/diagnosis`) 작동 확인
- [ ] 타임라인 페이지 (`/timeline`) 작동 확인
- [ ] Sitemap (`/sitemap.xml`) 접근 확인
- [ ] Robots.txt (`/robots.txt`) 접근 확인

## 🚀 빠른 배포 방법

### 방법 1: 웹 대시보드 (권장)

1. [Vercel](https://vercel.com) 접속
2. "Add New Project" 클릭
3. `eieu5683-prog/express-js-on-vercel` 선택
4. 환경 변수 설정
5. "Deploy" 클릭

### 방법 2: CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel --prod
```

## 📋 배포 체크리스트 요약

**현재 상태:**
- ✅ 코드 준비 완료
- ✅ Git 푸시 완료
- ⏳ Vercel 배포 진행 필요

**다음 단계:**
1. Vercel에 프로젝트 Import
2. 환경 변수 설정
3. 배포 실행

## 📚 참고 문서

- `QUICK_DEPLOY.md`: 빠른 배포 가이드
- `VERCEL_ENV_SETUP.md`: 환경 변수 설정 가이드
- `TOSS_KEYS_GUIDE.md`: 토스페이먼츠 키 설정 가이드
- `DEPLOYMENT_GUIDE.md`: 상세 배포 가이드

