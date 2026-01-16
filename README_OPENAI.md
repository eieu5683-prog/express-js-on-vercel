# OpenAI API 설정 가이드

## 빠른 시작

### 1. OpenAI API 키 발급

1. [OpenAI Platform](https://platform.openai.com/api-keys) 접속
2. 로그인 후 "API keys" 메뉴 클릭
3. "Create new secret key" 클릭
4. 생성된 키를 복사

### 2. 환경 변수 설정

프로젝트 루트 폴더에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```bash
OPENAI_API_KEY=sk-proj-본인의_오픈AI_키_입력
```

**중요:** `.env.local` 파일은 Git에 커밋하지 마세요. 이미 `.gitignore`에 포함되어 있습니다.

### 3. 개발 서버 재시작

환경 변수를 변경한 후에는 개발 서버를 재시작해야 합니다:

```bash
npm run dev
```

## 사용 방법

### 리포트 생성

1. 리포트 페이지 (`/report`) 접속
2. 업종코드와 사업 아이디어 입력
3. "PSST 사업계획서 생성" 버튼 클릭
4. 리포트 페이지 (`/report/view?code=업종코드&idea=아이디어`)로 자동 이동
5. AI가 생성한 리포트 확인

### 결제 후 리포트 확인

1. 진단 페이지 (`/diagnosis?code=업종코드`)에서 결제 완료
2. 리포트 페이지 (`/report/view?code=업종코드`) 접속
3. AI 리포트 자동 생성 및 표시

## API 엔드포인트

### POST /api/generate-psst

**요청:**
```json
{
  "ksicCode": "58221",
  "userIdea": "AI 기반 자동화 시스템 개발"
}
```

**응답:**
```json
{
  "success": true,
  "data": "생성된 PSST 리포트 내용...",
  "notice": "본 초안은 나랏돈네비 AI 기술(GPT-4o)을 활용하여 작성되었습니다.",
  "metadata": {
    "ksicCode": "58221",
    "industryName": "시스템 소프트웨어 개발",
    "grade": "S",
    "generatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

## 문제 해결

### API 키 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- API 키가 올바르게 입력되었는지 확인
- 개발 서버를 재시작했는지 확인

### 리포트 생성 실패
- OpenAI 계정에 충분한 크레딧이 있는지 확인
- 브라우저 콘솔에서 오류 메시지 확인
- 서버 로그 확인

## 비용 정보

- GPT-4o 모델 사용
- 리포트 1건 생성: 약 $0.10 ~ $0.30
- 월 100건 생성: 약 $10 ~ $30

자세한 내용은 `OPENAI_API_GUIDE.md`를 참고하세요.
