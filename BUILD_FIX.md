# 빌드 오류 해결 가이드

## 문제

Vercel 배포 시 Tailwind CSS PostCSS 플러그인 오류 발생:

```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS 
with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```

## 원인

Tailwind CSS v4 (`^4.1.18`)를 사용 중인데, v4는 PostCSS 플러그인 구조가 변경되어 별도 패키지가 필요합니다.

## 해결 방법

### 방법 1: Tailwind CSS v3로 다운그레이드 (권장)

**package.json 수정:**
```json
"tailwindcss": "^3.4.1"  // v4.1.18 → v3.4.1
```

**로컬에서 재설치:**
```bash
npm install
```

**Git에 커밋 및 푸시:**
```bash
git add package.json package-lock.json
git commit -m "Fix: Tailwind CSS v3로 다운그레이드"
git push origin main
```

### 방법 2: Tailwind CSS v4 사용 (고급)

**@tailwindcss/postcss 설치:**
```bash
npm install -D @tailwindcss/postcss
```

**postcss.config.js 수정:**
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

## 현재 적용된 해결책

✅ **방법 1 적용**: Tailwind CSS v3.4.1로 다운그레이드

## 다음 단계

1. 로컬에서 패키지 재설치:
   ```bash
   npm install
   ```

2. 로컬 빌드 테스트:
   ```bash
   npm run build
   ```

3. Git에 커밋 및 푸시:
   ```bash
   git add .
   git commit -m "Fix: Tailwind CSS v3로 다운그레이드하여 빌드 오류 수정"
   git push origin main
   ```

4. Vercel 자동 재배포 확인

## 참고

- Tailwind CSS v3는 Next.js 14와 완벽 호환됩니다.
- v4는 아직 베타 단계이며, 프로덕션 환경에서는 v3 사용을 권장합니다.

