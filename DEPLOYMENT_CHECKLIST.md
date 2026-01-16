# 배포 체크리스트

나랏돈네비 프로젝트 배포 전 확인 사항입니다.

## 배포 전 체크리스트

### 코드 준비

- [ ] 모든 변경사항 커밋 및 푸시 완료
- [ ] 로컬 빌드 테스트 통과 (`npm run build`)
- [ ] 린터 오류 없음 (`npm run lint`)
- [ ] TypeScript 오류 없음

### 환경 변수 확인

- [ ] `OPENAI_API_KEY` 설정 (Vercel 대시보드)
- [ ] `NEXT_PUBLIC_TOSS_CLIENT_KEY` 설정
- [ ] `NEXT_PUBLIC_BASE_URL` 설정
- [ ] `SITE_URL` 설정
- [ ] Production 환경에 모든 변수 설정됨

### 보안 확인

- [ ] `.env.local` 파일이 Git에 커밋되지 않음
- [ ] `OPENAI_API_KEY`에 `NEXT_PUBLIC_` 접두사 없음
- [ ] API 라우트에 적절한 에러 처리 구현됨
- [ ] 민감한 정보가 클라이언트에 노출되지 않음

### 기능 테스트

- [ ] 홈 페이지 정상 작동
- [ ] 진단 페이지 정상 작동
- [ ] 리포트 생성 기능 정상 작동
- [ ] 결제 플로우 정상 작동
- [ ] 타임라인 페이지 정상 작동
- [ ] SEO 메타 태그 정상 작동

### SEO 확인

- [ ] Sitemap 생성 확인 (`/sitemap.xml`)
- [ ] Robots.txt 확인 (`/robots.txt`)
- [ ] Open Graph 이미지 설정 확인
- [ ] JSON-LD 구조화 데이터 확인

### 성능 확인

- [ ] 페이지 로딩 속도 확인
- [ ] 이미지 최적화 확인
- [ ] 번들 크기 확인

## 배포 후 확인

### 즉시 확인

- [ ] 배포된 사이트 접속 가능
- [ ] 모든 페이지 정상 로드
- [ ] 에러 없음 (브라우저 콘솔 확인)

### 기능 확인

- [ ] 진단 기능 작동
- [ ] 결제 플로우 작동
- [ ] AI 리포트 생성 작동
- [ ] 복사 기능 작동

### SEO 확인

- [ ] Google Search Console 등록
- [ ] Sitemap 제출
- [ ] 메타 태그 확인 (개발자 도구)
- [ ] 구조화 데이터 확인

### 모니터링 설정

- [ ] Vercel Analytics 활성화
- [ ] 에러 로깅 확인
- [ ] 성능 모니터링 설정

## 문제 발생 시

### 빌드 실패

1. 로컬에서 빌드 테스트
2. 에러 메시지 확인
3. 환경 변수 확인
4. 의존성 재설치

### 기능 오류

1. 브라우저 콘솔 확인
2. Vercel 로그 확인
3. 환경 변수 확인
4. API 키 유효성 확인

### 성능 문제

1. Lighthouse 점수 확인
2. 번들 크기 확인
3. 이미지 최적화 확인
4. 캐싱 설정 확인

## 롤백 절차

배포 후 문제 발생 시:

1. Vercel 대시보드 → Deployments
2. 이전 배포 선택
3. "Promote to Production" 클릭

## 연락처

문제 발생 시:
- Vercel 지원: https://vercel.com/support
- 프로젝트 이슈: GitHub Issues

