# Python Backend - PSST HWP Generator

PSST 사업계획서를 정부 표준 HWP 양식으로 변환하는 Python 백엔드 서버입니다.

## 설치

```bash
cd python-backend
pip install -r requirements.txt
```

## 실행

```bash
# 개발 모드
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# 프로덕션 모드
python app/main.py
```

서버는 `http://localhost:8000`에서 실행됩니다.

## API 엔드포인트

### 1. 헬스 체크
```
GET /
```

### 2. HWP 파일 생성
```
POST /api/generate-hwp
Content-Type: application/json

{
  "problem": { ... },
  "solution": { ... },
  "scale_up": { ... },
  "team": { ... },
  "metadata": { ... }
}
```

**응답**: HWP 파일 (다운로드)

### 3. 서버 상태 확인
```
GET /api/health
```

## 사용 방법

### 1. HWP 템플릿 준비 (선택사항)

`templates/psst_template.hwp` 파일을 생성하여 정부 표준 양식을 준비할 수 있습니다.
템플릿이 없으면 기본 형식으로 새 파일이 생성됩니다.

### 2. API 호출 예시

```python
import requests

url = "http://localhost:8000/api/generate-hwp"
data = {
    "problem": {
        "title": "Problem (문제 인식)",
        "marketIssues": ["문제점 1", "문제점 2"],
        "socialReasons": ["사회적 이유 1"],
        "economicReasons": ["경제적 이유 1"],
        "urgency": "시급성 설명"
    },
    "solution": { ... },
    "scale_up": { ... },
    "team": { ... },
    "metadata": {
        "industryCode": "55101",
        "industryName": "숙박업",
        "userInput": "사용자 아이디어",
        "createdAt": "2026-01-01T00:00:00Z",
        "aiGenerated": True,
        "version": "1.0.0"
    }
}

response = requests.post(url, json=data)
with open("output.hwp", "wb") as f:
    f.write(response.content)
```

## 라이브러리

### pyhwp
HWP 파일을 직접 처리하는 라이브러리입니다.

```bash
pip install pyhwp
```

### python-docx
HWP 대신 DOCX 파일을 생성하는 라이브러리입니다. (대체 옵션)

```bash
pip install python-docx
```

## 주의사항

1. **HWP 파일 처리**: pyhwp는 HWP 파일을 처리할 수 있지만, 복잡한 양식의 경우 제한이 있을 수 있습니다.
2. **템플릿 사용**: 정부 표준 양식이 있다면 템플릿 파일을 사용하는 것이 좋습니다.
3. **대체 옵션**: HWP 처리가 어려운 경우 python-docx를 사용하여 DOCX 파일을 생성할 수 있습니다.

## 환경 변수

`.env` 파일을 생성하여 다음 변수를 설정할 수 있습니다:

```
HWP_TEMPLATE_PATH=./templates/psst_template.hwp
OUTPUT_DIR=./output
```

## 문제 해결

### pyhwp 설치 오류
```bash
# Windows의 경우 추가 패키지 필요
pip install olefile
```

### HWP 파일 생성 실패
- 템플릿 파일 경로 확인
- 출력 디렉토리 권한 확인
- python-docx로 대체 사용 고려

