# Vercel URL 설정 가이드

배포된 Vercel 프로젝트의 실제 URL을 확인하고 환경 변수를 설정하는 방법입니다.

## 🔍 Vercel URL 종류

Vercel은 여러 종류의 URL을 제공합니다:

### 1. Production URL (프로덕션 배포)
- **형식**: `프로젝트명.vercel.app`
- **예시**: `https://express-js-on-vercel.vercel.app`
- **용도**: 실제 운영 환경, 환경 변수에 설정할 URL

### 2. Preview URL (프리뷰 배포)
- **형식**: `프로젝트명-git-브랜치명-계정명-projects.vercel.app`
- **예시**: 
  - `https://express-js-on-vercel-git-main-eieu5683-progs-projects.vercel.app`
  - `https://express-js-on-vercel-n9pwt7fjs-eieu5683-progs-projects.vercel.app`
- **용도**: 각 브랜치/커밋별 프리뷰 (환경 변수 설정 불필요)

## ✅ Production URL 확인 방법

### 방법 1: Vercel 대시보드

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택: `express-js-on-vercel`
3. **Settings** → **Domains** 메뉴 클릭
4. **Production Domain** 확인:
   ```
   express-js-on-vercel.vercel.app
   ```

### 방법 2: 배포 목록에서 확인

1. 프로젝트 → **Deployments** 탭
2. Production 배포 (✅ 표시) 클릭
3. **Domains** 섹션에서 Production URL 확인

## 🎯 환경 변수 설정

### Production URL 사용

**Settings → Environment Variables**에서 설정:

#### 옵션 1: Production만 설정 (권장)

| Name | Value | 환경 |
|------|-------|------|
| `NEXT_PUBLIC_BASE_URL` | `https://express-js-on-vercel.vercel.app` | Production |
| `SITE_URL` | `https://express-js-on-vercel.vercel.app` | Production |

**장점:**
- Preview 배포는 자동으로 자신의 URL 사용
- 각 환경에 맞는 URL 사용

#### 옵션 2: All로 설정 (간단함)

| Name | Value | 환경 |
|------|-------|------|
| `NEXT_PUBLIC_BASE_URL` | `https://express-js-on-vercel.vercel.app` | All |
| `SITE_URL` | `https://express-js-on-vercel.vercel.app` | All |

**장점:**
- 설정이 간단함
- 모든 환경에서 일관된 URL 사용

**⚠️ 중요:**
- `https://` 접두사 필수
- 마지막 슬래시(`/`) 없음
- **All로 설정해도 문제 없습니다!** (Preview 배포도 정상 작동)

### Preview URL은 설정하지 않음

Preview 배포는 자동으로 생성되므로 환경 변수에 설정할 필요가 없습니다.

## 📝 실제 설정 예시

### 현재 확인된 URL들

```
Preview URL 1: express-js-on-vercel-git-main-eieu5683-progs-projects.vercel.app
Preview URL 2: express-js-on-vercel-n9pwt7fjs-eieu5683-progs-projects.vercel.app
```

### Production URL 확인 필요

Vercel 대시보드에서 Production URL을 확인한 후:

```
NEXT_PUBLIC_BASE_URL = https://express-js-on-vercel.vercel.app
SITE_URL = https://express-js-on-vercel.vercel.app
```

## 🔄 설정 후 재배포

환경 변수를 변경한 후:

1. **자동 재배포**: Vercel이 자동으로 재배포할 수 있음
2. **수동 재배포**: 
   - Deployments → 최신 배포 → "Redeploy" 클릭
   - 또는 Git에 푸시하여 트리거

## ✅ 확인 방법

배포 후 다음을 확인하세요:

1. **Sitemap**: `https://express-js-on-vercel.vercel.app/sitemap.xml`
2. **Robots.txt**: `https://express-js-on-vercel.vercel.app/robots.txt`
3. **메타 태그**: 브라우저 개발자 도구에서 canonical URL 확인

## 🚨 주의사항

### ❌ 잘못된 설정

```
# Preview URL 사용 (잘못됨)
NEXT_PUBLIC_BASE_URL = https://express-js-on-vercel-git-main-eieu5683-progs-projects.vercel.app

# HTTP 사용 (잘못됨)
NEXT_PUBLIC_BASE_URL = http://express-js-on-vercel.vercel.app

# 슬래시 포함 (잘못됨)
NEXT_PUBLIC_BASE_URL = https://express-js-on-vercel.vercel.app/
```

### ✅ 올바른 설정

```
# Production URL 사용 (올바름)
NEXT_PUBLIC_BASE_URL = https://express-js-on-vercel.vercel.app
SITE_URL = https://express-js-on-vercel.vercel.app
```

## 💡 다음 단계

1. Vercel 대시보드에서 Production URL 확인
2. Environment Variables에 Production URL 설정
3. 재배포
4. Sitemap과 메타 태그 확인

