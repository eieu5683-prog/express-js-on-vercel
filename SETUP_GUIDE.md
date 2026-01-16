# 나랏돈네비 프로젝트 설정 가이드

## 초기 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```bash
# OpenAI API 키 (필수)
OPENAI_API_KEY=sk-proj-본인의_오픈AI_키_입력

# Python Backend API URL (선택사항)
PYTHON_API_URL=http://localhost:8000

# Next.js Base URL
NEXT_PUBLIC_BASE_URL=https://narat-don-navi.com
SITE_URL=https://narat-don-navi.com
```

### 3. 개발 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

## 주요 기능

### 1. 진단 페이지
- URL: `/diagnosis?code=업종코드`
- 업종코드 입력 및 진단 결과 확인
- 등급, 지원금액 무료 표시
- 결제 후 PSST 데이터 표시

### 2. 리포트 페이지
- URL: `/report`
- PSST 사업계획서 생성 폼
- OpenAI API를 사용한 리포트 생성

### 3. 리포트 뷰 페이지
- URL: `/report/view?code=업종코드&idea=사업아이디어`
- 결제 완료 후 접근 가능
- AI 생성 리포트 표시
- 복사 및 HWP 다운로드 기능

### 4. 타임라인 페이지
- URL: `/timeline?code=업종코드` (선택사항)
- 2026-2028년 지원금 및 세무 일정 타임라인
- 업종코드 기반 맞춤 필터링
- 전문가 솔루션 팝업

## Python 백엔드 설정 (선택사항)

HWP 파일 생성을 위해 Python 백엔드를 실행할 수 있습니다.

### 1. Python 백엔드 설치

```bash
cd python-backend
pip install -r requirements.txt
```

### 2. Python 서버 실행

```bash
# Windows
start.bat

# Linux/Mac
./start.sh
```

서버가 `http://localhost:8000`에서 실행됩니다.

## 데이터 관리

### 엑셀 데이터를 코드로 변환

Cursor AI를 사용하여 엑셀 데이터를 코드로 변환할 수 있습니다.

1. 엑셀 데이터 복사
2. Cursor AI 채팅창 (`Cmd + L` 또는 `Ctrl + L`) 열기
3. 프롬프트 입력 (참고: `CURSOR_AI_PROMPT.md`, `CURSOR_AI_SCHEDULE_PROMPT.md`)
4. 엑셀 데이터 붙여넣기
5. 결과 확인

## 문제 해결

### OpenAI API 오류
- `.env.local` 파일에 API 키가 올바르게 설정되었는지 확인
- 개발 서버 재시작
- OpenAI 계정 크레딧 확인

### Python 백엔드 연결 오류
- Python 서버가 실행 중인지 확인
- `PYTHON_API_URL` 환경 변수 확인

### 타임라인 데이터가 표시되지 않음
- `src/data/scheduleData.ts`의 `GRANT_SCHEDULE` 배열 확인
- 업종코드가 올바르게 전달되었는지 확인

## 문서

- `README.md`: 프로젝트 개요
- `OPENAI_API_GUIDE.md`: OpenAI API 상세 가이드
- `DATA_MANAGEMENT_GUIDE.md`: 데이터 관리 가이드
- `TIMELINE_GUIDE.md`: 타임라인 페이지 가이드
- `HWP_GENERATION_GUIDE.md`: HWP 생성 가이드
- `PSST_GUIDE.md`: PSST 구조 가이드

