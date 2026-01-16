# HWP 파일 생성 가이드

PSST 사업계획서를 정부 표준 HWP 양식으로 변환하는 기능 사용 가이드입니다.

## 개요

Python 백엔드 서버를 사용하여 PSST 텍스트를 HWP 파일로 변환합니다. 두 가지 라이브러리를 지원합니다:

1. **pyhwp**: HWP 파일 직접 처리 (권장)
2. **python-docx**: DOCX 파일 생성 (대체 옵션)

## 설치 및 설정

### 1. Python 백엔드 설치

```bash
cd python-backend
pip install -r requirements.txt
```

### 2. 환경 변수 설정

`.env` 파일에 Python API URL을 설정합니다:

```env
PYTHON_API_URL=http://localhost:8000
```

### 3. Python 서버 실행

```bash
cd python-backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

서버가 `http://localhost:8000`에서 실행됩니다.

## 사용 방법

### 웹 인터페이스

1. 리포트 페이지(`/report`)에서 PSST 사업계획서 생성
2. 생성된 문서를 확인
3. "📄 HWP 다운로드" 버튼 클릭
4. HWP 파일이 자동으로 다운로드됩니다

### API 직접 호출

```typescript
const response = await fetch('/api/hwp/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    document: psstDocument,
  }),
});

const blob = await response.blob();
// Blob을 파일로 저장
```

## HWP 템플릿 사용

정부 표준 양식이 있다면 템플릿 파일을 사용할 수 있습니다:

1. `python-backend/templates/psst_template.hwp` 파일 생성
2. 템플릿 파일에 정부 표준 양식 준비
3. Python 서버가 자동으로 템플릿을 사용합니다

템플릿이 없으면 기본 형식으로 새 파일이 생성됩니다.

## 라이브러리 선택

### pyhwp (권장)

HWP 파일을 직접 처리할 수 있습니다.

**장점:**
- HWP 파일 직접 생성
- 정부 표준 양식과 호환

**단점:**
- 설치가 복잡할 수 있음
- Windows 환경에서 추가 설정 필요

**설치:**
```bash
pip install pyhwp
pip install olefile  # Windows의 경우
```

### python-docx (대체 옵션)

HWP 대신 DOCX 파일을 생성합니다.

**장점:**
- 설치가 간단
- 안정적이고 널리 사용됨

**단점:**
- DOCX 형식만 지원 (HWP 아님)
- 정부 기관에서 HWP를 요구하는 경우 문제

**설치:**
```bash
pip install python-docx
```

## API 엔드포인트

### Python 백엔드 API

#### 1. HWP 파일 생성
```
POST http://localhost:8000/api/generate-hwp
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

#### 2. 헬스 체크
```
GET http://localhost:8000/
```

### Next.js 프록시 API

#### HWP 파일 생성 (프록시)
```
POST /api/hwp/generate
Content-Type: application/json

{
  "document": {
    "problem": { ... },
    "solution": { ... },
    "scaleUp": { ... },
    "team": { ... },
    "metadata": { ... }
  }
}
```

**응답**: HWP 파일 (다운로드)

## 문제 해결

### Python 서버 연결 오류

**증상**: "Python API 오류" 메시지

**해결 방법:**
1. Python 서버가 실행 중인지 확인
2. `PYTHON_API_URL` 환경 변수 확인
3. CORS 설정 확인 (Python 서버의 `app/main.py`)

### pyhwp 설치 오류

**증상**: "pyhwp 라이브러리가 설치되지 않았습니다"

**해결 방법:**
```bash
# Windows
pip install pyhwp olefile

# Linux/Mac
pip install pyhwp
```

### HWP 파일 생성 실패

**증상**: "HWP 생성 중 오류 발생"

**해결 방법:**
1. 템플릿 파일 경로 확인
2. 출력 디렉토리 권한 확인
3. python-docx로 대체 사용 고려

### 파일 다운로드 안 됨

**증상**: 버튼 클릭해도 다운로드 안 됨

**해결 방법:**
1. 브라우저 콘솔에서 오류 확인
2. Python 서버 로그 확인
3. 네트워크 탭에서 API 응답 확인

## 개발 팁

### 템플릿 커스터마이징

`python-backend/app/services/hwp_generator.py`의 `_insert_psst_data_to_docx` 또는 `_insert_psst_data_to_hwp` 함수를 수정하여 템플릿 양식을 커스터마이징할 수 있습니다.

### 양식 필드 매핑

정부 표준 양식의 특정 필드에 PSST 데이터를 매핑하려면:

```python
# 예시: 특정 필드에 데이터 삽입
doc.paragraphs[5].text = problem.get('urgency', '')
```

### 스타일 적용

python-docx를 사용하는 경우 스타일을 적용할 수 있습니다:

```python
from docx.shared import Pt, RGBColor

run = paragraph.add_run('텍스트')
run.font.size = Pt(12)
run.font.color.rgb = RGBColor(0, 0, 0)
run.bold = True
```

## 프로덕션 배포

### Docker 사용 (권장)

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 환경 변수

프로덕션 환경에서는 다음 환경 변수를 설정하세요:

```env
PYTHON_API_URL=https://api.narat-don-navi.com
HWP_TEMPLATE_PATH=/app/templates/psst_template.hwp
OUTPUT_DIR=/app/output
```

## 참고 자료

- [pyhwp GitHub](https://github.com/mete0r/pyhwp)
- [python-docx 문서](https://python-docx.readthedocs.io/)
- [FastAPI 문서](https://fastapi.tiangolo.com/)

