# OpenAI API 설정 가이드

OpenAI GPT-4o를 사용하여 PSST 리포트를 생성하는 기능 설정 가이드입니다.

## 1. 환경 변수 설정

### .env.local 파일 생성

프로젝트 루트 폴더에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-proj-본인의_오픈AI_키_입력

# Python Backend API URL
PYTHON_API_URL=http://localhost:8000

# Next.js Base URL
NEXT_PUBLIC_BASE_URL=https://narat-don-navi.com
SITE_URL=https://narat-don-navi.com
```

### OpenAI API 키 발급

1. [OpenAI Platform](https://platform.openai.com/api-keys)에 접속
2. 로그인 후 "API keys" 메뉴 클릭
3. "Create new secret key" 클릭
4. 생성된 키를 복사하여 `.env.local` 파일에 붙여넣기

**주의사항:**
- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨)
- API 키는 외부에 노출되지 않도록 주의하세요

## 2. API 라우트 구조

### `/api/generate-psst` 엔드포인트

**요청:**
```typescript
POST /api/generate-psst
Content-Type: application/json

{
  "ksicCode": "58221",
  "userIdea": "사용자의 사업 아이디어"
}
```

**응답:**
```typescript
{
  "success": true,
  "data": "생성된 PSST 리포트 텍스트...",
  "notice": "본 초안은 나랏돈네비 AI 기술(GPT-4o)을 활용하여 작성되었습니다.",
  "metadata": {
    "ksicCode": "58221",
    "industryName": "시스템 소프트웨어 개발",
    "grade": "S",
    "generatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

## 3. 사용 흐름

### 1단계: 진단 페이지에서 업종코드 입력
```
/diagnosis?code=58221
```
- 업종코드 입력
- 사업 아이디어 입력 (선택사항, 로컬스토리지에 저장)

### 2단계: 결제 완료
- 39,000원 결제
- 결제 완료 후 자동으로 리포트 생성 페이지로 리다이렉트

### 3단계: 리포트 생성 페이지
```
/report/view?code=58221&idea=사업아이디어
```
- 결제 상태 확인
- OpenAI API 호출하여 PSST 리포트 생성
- 생성된 리포트 표시

## 4. 리포트 생성 프로세스

### 데이터 결합
1. **사용자 입력**: 간단한 '사업 아이디어'
2. **전문가 데이터**: `ksicData.ts`의 전문가 솔루션
3. **AI 결합**: GPT-4o가 두 데이터를 결합하여 PSST 생성

### PSST 구조화
- **P (Problem)**: 문제 인식 (1-1, 1-2)
- **S (Solution)**: 해결 방안 (2-1, 2-2)
- **S (Scale-up)**: 성장 전략 (3-1, 3-2)
- **T (Team)**: 팀 구성 (4-1, 4-2)

### 출력 형식
- 정부 지원사업 표준 서식 준수
- 구체적인 수치 포함 (빈칸 없음)
- 통계, 논리적 근거 기반
- 2026년 경제 트렌드 반영

## 5. 에러 처리

### API 키 오류
```
{
  "error": "OpenAI API 키가 설정되지 않았습니다. .env.local 파일을 확인하세요."
}
```

### 업종코드 오류
```
{
  "error": "해당 업종 데이터를 찾을 수 없습니다."
}
```

### 결제 미완료 오류
```
결제가 완료되지 않았습니다. 먼저 결제를 완료해주세요.
```

## 6. 비용 관리

### OpenAI API 사용량 모니터링
- [OpenAI Usage Dashboard](https://platform.openai.com/usage)에서 사용량 확인
- GPT-4o 모델은 토큰 기반 과금
- 예상 비용: 리포트 1건당 약 $0.10~0.30 (내용 길이에 따라 다름)

### 비용 절감 팁
1. **캐싱**: 동일한 업종코드와 아이디어에 대해 캐시 사용
2. **토큰 제한**: `max_tokens` 파라미터로 최대 토큰 수 제한
3. **모델 선택**: 필요시 GPT-3.5-turbo로 변경하여 비용 절감

## 7. 보안 고려사항

### API 키 보호
- 서버 사이드에서만 API 키 사용
- 클라이언트 사이드에 노출 금지
- 환경 변수로 관리

### 요청 검증
- 결제 상태 확인 필수
- 업종코드 유효성 검증
- Rate limiting 고려 (필요시)

## 8. 테스트

### 로컬 테스트
```bash
# 개발 서버 실행
npm run dev

# 리포트 생성 테스트
curl -X POST http://localhost:3000/api/generate-psst \
  -H "Content-Type: application/json" \
  -d '{"ksicCode":"58221","userIdea":"테스트 아이디어"}'
```

### 프로덕션 배포
- 환경 변수는 배포 플랫폼(Vercel, AWS 등)에서 설정
- API 키는 안전하게 관리

## 9. 문제 해결

### API 키가 인식되지 않을 때
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일명이 정확한지 확인 (`.env.local`)
3. 개발 서버 재시작
4. 환경 변수 로드 확인: `console.log(process.env.OPENAI_API_KEY)`

### 리포트 생성이 실패할 때
1. OpenAI API 키 유효성 확인
2. API 사용량 한도 확인
3. 네트워크 연결 확인
4. 브라우저 콘솔에서 오류 확인

### 결제 후 리포트가 표시되지 않을 때
1. 결제 상태 확인: `localStorage.getItem('psst_payment_status')`
2. 업종코드 확인: URL 파라미터 또는 로컬스토리지
3. API 응답 확인: 브라우저 개발자 도구 Network 탭

## 10. 향후 개선 사항

### 캐싱 시스템
- 동일한 입력에 대해 생성된 리포트 캐싱
- 데이터베이스에 저장하여 재사용

### 사용자 맞춤화
- 사용자가 수정한 리포트 저장
- 여러 버전 관리

### 품질 향상
- 프롬프트 최적화
- Few-shot learning 적용
- 사용자 피드백 반영

## 참고 자료

- [OpenAI API 문서](https://platform.openai.com/docs)
- [GPT-4o 모델 정보](https://platform.openai.com/docs/models/gpt-4o)
- [API 키 관리 가이드](https://platform.openai.com/docs/guides/production-best-practices/api-keys)

