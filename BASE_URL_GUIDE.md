# NEXT_PUBLIC_BASE_URL과 SITE_URL 설명

이 두 환경 변수는 배포된 웹사이트의 **기본 URL**을 설정하는 데 사용됩니다.

## 📌 두 변수의 차이점

### 1. `NEXT_PUBLIC_BASE_URL`
- **용도**: 클라이언트 사이드에서 사용되는 기본 URL
- **사용 위치**: SEO 메타 태그, 절대 URL 생성 등
- **접두사**: `NEXT_PUBLIC_` (클라이언트에서 접근 가능)
- **예시 사용**: 
  ```typescript
  // lib/seo.ts
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fullUrl = `${baseUrl}/diagnosis`; // https://your-site.com/diagnosis
  ```

### 2. `SITE_URL`
- **용도**: 서버 사이드에서 사용되는 기본 URL (주로 Sitemap 생성)
- **사용 위치**: `next-sitemap.config.js`에서 sitemap.xml 생성 시 사용
- **접두사**: 없음 (서버 전용)
- **예시 사용**:
  ```javascript
  // next-sitemap.config.js
  siteUrl: process.env.SITE_URL || 'https://narat-don-navi.com'
  ```

## 🎯 실제 설정 방법

### 배포 전 (Vercel 환경 변수 설정 시)

**현재 예시 값:**
```
NEXT_PUBLIC_BASE_URL = https://your-project.vercel.app
SITE_URL = https://your-project.vercel.app
```

**⚠️ 이 값은 예시입니다!** 배포 후 실제 URL로 변경해야 합니다.

### 배포 후 (실제 URL로 변경)

Vercel에 배포하면 자동으로 URL이 생성됩니다. 예를 들어:
- `https://express-js-on-vercel.vercel.app` (프로젝트 이름 기반)
- 또는 커스텀 도메인: `https://narat-don-navi.com`

**Vercel 대시보드에서 확인:**
1. 프로젝트 → Settings → Domains
2. 배포된 URL 확인 (예: `https://express-js-on-vercel.vercel.app`)

**환경 변수 업데이트:**
```
NEXT_PUBLIC_BASE_URL = https://express-js-on-vercel.vercel.app
SITE_URL = https://express-js-on-vercel.vercel.app
```

## 🔄 자동 설정 방법 (권장)

Vercel은 배포 시 자동으로 `VERCEL_URL` 환경 변수를 제공합니다. 이를 활용하면 자동으로 설정할 수 있습니다:

```javascript
// next.config.js (이미 설정됨)
const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : process.env.NEXT_PUBLIC_BASE_URL || 'https://narat-don-navi.vercel.app';
```

하지만 **명시적으로 설정하는 것이 더 안전**합니다.

## ✅ 체크리스트

### 배포 전
- [ ] `NEXT_PUBLIC_BASE_URL`에 예시 값 설정 (`https://your-project.vercel.app`)
- [ ] `SITE_URL`에 예시 값 설정 (`https://your-project.vercel.app`)

### 배포 후 (필수!)
- [ ] Vercel에서 실제 배포 URL 확인
- [ ] `NEXT_PUBLIC_BASE_URL`을 실제 URL로 업데이트
- [ ] `SITE_URL`을 실제 URL로 업데이트
- [ ] 재배포 (환경 변수 변경 후)

## 🚨 주의사항

### 1. 두 값은 보통 동일하게 설정
- 대부분의 경우 두 변수는 같은 값을 가집니다.
- 커스텀 도메인을 사용하는 경우에도 동일하게 설정합니다.

### 2. HTTPS 필수
- 반드시 `https://`로 시작해야 합니다.
- `http://`는 사용하지 마세요.

### 3. 마지막 슬래시 없음
- ✅ 올바름: `https://your-site.com`
- ❌ 잘못됨: `https://your-site.com/`

## 📝 실제 예시

### Vercel 자동 생성 URL 사용 시
```
NEXT_PUBLIC_BASE_URL = https://express-js-on-vercel.vercel.app
SITE_URL = https://express-js-on-vercel.vercel.app
```

### 커스텀 도메인 사용 시
```
NEXT_PUBLIC_BASE_URL = https://narat-don-navi.com
SITE_URL = https://narat-don-navi.com
```

## 🔍 확인 방법

배포 후 다음을 확인하세요:

1. **Sitemap 확인**: `https://your-site.com/sitemap.xml`
   - 모든 URL이 올바른 도메인으로 시작하는지 확인

2. **SEO 메타 태그 확인**: 브라우저 개발자 도구
   - `<link rel="canonical">` 태그의 URL 확인

3. **Robots.txt 확인**: `https://your-site.com/robots.txt`
   - Sitemap URL이 올바른지 확인

## 💡 요약

- **`NEXT_PUBLIC_BASE_URL`**: 클라이언트에서 사용, SEO 메타 태그 등
- **`SITE_URL`**: 서버에서 사용, Sitemap 생성 등
- **설정 값**: 배포 후 실제 Vercel URL로 변경 필수
- **형식**: `https://your-actual-domain.vercel.app` (HTTPS 필수)

