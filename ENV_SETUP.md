# 환경 변수 설정 가이드

나랏돈네비 프로젝트의 환경 변수 설정 가이드입니다.

## 환경 변수 파일 생성

프로젝트 루트 폴더에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# OpenAI API Key (서버 사이드 전용)
# ⚠️ 보안 주의: NEXT_PUBLIC_ 접두사를 사용하지 마세요!
OPENAI_API_KEY=sk-proj-여기에_실제_키_입력

# Python Backend API URL
PYTHON_API_URL=http://localhost:8000

# Next.js Base URL
NEXT_PUBLIC_BASE_URL=https://narat-don-navi.com
SITE_URL=https://narat-don-navi.com

# 토스페이먼츠 클라이언트 키 (클라이언트 노출 가능)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
```

## 보안 주의사항

### ✅ 올바른 사용법

```bash
# 서버 사이드 전용 (클라이언트에 노출되지 않음)
OPENAI_API_KEY=sk-proj-...
```

### ❌ 잘못된 사용법

```bash
# 클라이언트에 노출됨 (보안 위험!)
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-...
```

## 환경 변수 설명

### OPENAI_API_KEY
- **용도**: OpenAI API 호출에 사용
- **노출 여부**: 서버 사이드 전용 (클라이언트 노출 안 됨)
- **필수 여부**: 예
- **발급 방법**: [OpenAI Platform](https://platform.openai.com/api-keys)

### PYTHON_API_URL
- **용도**: Python 백엔드 API URL
- **노출 여부**: 서버 사이드 전용
- **필수 여부**: HWP 생성 기능 사용 시 필요

### NEXT_PUBLIC_BASE_URL
- **용도**: Next.js 기본 URL
- **노출 여부**: 클라이언트 노출 가능
- **필수 여부**: 선택

### NEXT_PUBLIC_TOSS_CLIENT_KEY
- **용도**: 토스페이먼츠 결제 SDK 클라이언트 키
- **노출 여부**: 클라이언트 노출 가능 (의도된 동작)
- **필수 여부**: 결제 기능 사용 시 필요

## Git 제외 확인

`.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

```gitignore
# local env files
.env*.local
.env
.env.local
```

## 배포 시 환경 변수 설정

### Vercel

1. Vercel 대시보드 접속
2. 프로젝트 선택 → Settings → Environment Variables
3. 다음 변수 추가:
   - `OPENAI_API_KEY`: 실제 OpenAI API 키
   - `PYTHON_API_URL`: 프로덕션 Python API URL (선택)
   - `NEXT_PUBLIC_TOSS_CLIENT_KEY`: 토스페이먼츠 프로덕션 키

### AWS / Docker

환경 변수를 직접 설정하거나 Secrets Manager를 사용하세요.

## 문제 해결

### 환경 변수가 적용되지 않을 때

1. 개발 서버 재시작
   ```bash
   npm run dev
   ```

2. 파일 위치 확인
   - `.env.local` 파일이 프로젝트 루트에 있는지 확인

3. 변수명 확인
   - 대소문자 정확히 일치하는지 확인
   - 오타가 없는지 확인

### API 키 오류

```
Error: OPENAI_API_KEY가 설정되지 않았습니다.
```

**해결:**
1. `.env.local` 파일에 `OPENAI_API_KEY`가 있는지 확인
2. 키 앞뒤 공백 제거
3. 개발 서버 재시작

## 보안 체크리스트

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있음
- [ ] `OPENAI_API_KEY`에 `NEXT_PUBLIC_` 접두사 없음
- [ ] 실제 API 키가 Git에 커밋되지 않음
- [ ] 프로덕션 환경 변수가 올바르게 설정됨

