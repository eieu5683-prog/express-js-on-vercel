# 보안 가이드 - OpenAI API 키 보호

나랏돈네비 프로젝트의 OpenAI API 키 보안 설정 가이드입니다.

## 현재 보안 상태

### ✅ 안전한 부분

1. **서버 사이드 API 라우트 사용**
   - `app/api/generate-psst/route.ts`에서만 OpenAI API 호출
   - 클라이언트에서 직접 OpenAI API를 호출하지 않음
   - 모든 요청은 Next.js API 라우트를 통해 처리됨

2. **환경 변수 사용**
   - `process.env.OPENAI_API_KEY` 사용 (서버 사이드 전용)
   - `NEXT_PUBLIC_` 접두사 없음 (클라이언트 노출 방지)

3. **Git 제외 설정**
   - `.env.local` 파일이 `.gitignore`에 포함됨
   - API 키가 Git 저장소에 커밋되지 않음

## 보안 체크리스트

### 1. 환경 변수 설정 확인

`.env.local` 파일이 프로젝트 루트에 있는지 확인:

```bash
# 프로젝트 루트에 .env.local 파일 생성
OPENAI_API_KEY=sk-proj-본인의_오픈AI_키_입력
```

**중요:**
- ✅ `NEXT_PUBLIC_` 접두사 사용하지 않음
- ✅ 서버 사이드에서만 접근 가능
- ✅ 클라이언트 번들에 포함되지 않음

### 2. .gitignore 확인

`.gitignore` 파일에 다음이 포함되어 있는지 확인:

```gitignore
# 환경 변수
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 3. 코드 검토

#### ✅ 안전한 코드 패턴

```typescript
// ✅ 서버 사이드 API 라우트 (안전)
// app/api/generate-psst/route.ts
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 서버 사이드 전용
});
```

#### ❌ 위험한 코드 패턴 (현재 사용하지 않음)

```typescript
// ❌ 클라이언트 사이드에서 직접 호출 (위험)
// 이런 코드는 현재 프로젝트에 없음
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 클라이언트 노출!
});
```

### 4. API 라우트 보안 강화

현재 구현된 보안 기능:

- ✅ 필수 파라미터 검증
- ✅ API 키 존재 확인
- ✅ 에러 처리 (민감한 정보 노출 방지)
- ✅ OpenAI API 오류 처리

추가 권장 사항:

- Rate limiting (요청 제한)
- 인증 토큰 검증
- 요청 로깅 및 모니터링

## 보안 모범 사례

### 1. 환경 변수 관리

**로컬 개발:**
```bash
# .env.local 파일 사용
OPENAI_API_KEY=sk-proj-...
```

**프로덕션 배포:**
- Vercel: 환경 변수 설정에서 추가
- AWS: Secrets Manager 또는 환경 변수 사용
- Docker: 환경 변수로 전달

### 2. API 키 보호

- ✅ 절대 클라이언트 코드에 하드코딩하지 않음
- ✅ `NEXT_PUBLIC_` 접두사 사용하지 않음
- ✅ Git에 커밋하지 않음
- ✅ 환경 변수로만 관리

### 3. 에러 처리

현재 구현:

```typescript
// 에러 메시지에서 민감한 정보 노출 방지
catch (error) {
  console.error('AI API Error:', error); // 서버 로그에만 기록
  return NextResponse.json(
    { error: 'AI 서비스 오류가 발생했습니다.' }, // 일반적인 메시지만 반환
    { status: 500 }
  );
}
```

### 4. 요청 검증

현재 구현:

```typescript
// 필수 파라미터 검증
if (!ksicCode || !userIdea) {
  return NextResponse.json(
    { error: '업종코드와 사용자 아이디어가 필요합니다.' },
    { status: 400 }
  );
}

// API 키 확인
if (!process.env.OPENAI_API_KEY) {
  return NextResponse.json(
    { error: 'AI 서비스 설정 오류입니다.' },
    { status: 500 }
  );
}
```

## 배포 시 보안 체크리스트

### Vercel 배포

1. **환경 변수 설정**
   ```
   Settings → Environment Variables
   - OPENAI_API_KEY: sk-proj-...
   ```

2. **환경별 설정**
   - Production, Preview, Development 각각 설정 가능
   - Production 환경에만 실제 키 설정

### AWS 배포

1. **Secrets Manager 사용**
   ```bash
   aws secretsmanager create-secret \
     --name narat-don-navi/openai-api-key \
     --secret-string "sk-proj-..."
   ```

2. **환경 변수로 전달**
   ```bash
   export OPENAI_API_KEY=$(aws secretsmanager get-secret-value \
     --secret-id narat-don-navi/openai-api-key \
     --query SecretString --output text)
   ```

### Docker 배포

```dockerfile
# Dockerfile
ENV OPENAI_API_KEY=""

# docker-compose.yml
services:
  app:
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
```

## 보안 감사

### 정기적으로 확인할 사항

1. **코드 검색**
   ```bash
   # API 키가 하드코딩되어 있는지 확인
   grep -r "sk-proj-" --exclude-dir=node_modules
   grep -r "OPENAI_API_KEY" --exclude-dir=node_modules
   ```

2. **환경 변수 확인**
   ```bash
   # 클라이언트 번들에 포함되지 않았는지 확인
   npm run build
   grep -r "OPENAI_API_KEY" .next/
   ```

3. **Git 히스토리 확인**
   ```bash
   # 실수로 커밋된 API 키 확인
   git log --all --full-history --source -- "*env*"
   ```

## 문제 발생 시 대응

### API 키 노출 발견 시

1. **즉시 키 회전**
   - OpenAI Platform에서 키 삭제
   - 새 키 발급 및 업데이트

2. **Git 히스토리 정리** (필요 시)
   ```bash
   # BFG Repo-Cleaner 사용
   bfg --replace-text passwords.txt
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

3. **환경 변수 업데이트**
   - 모든 환경에서 새 키로 업데이트

## 추가 보안 권장 사항

### 1. Rate Limiting

```typescript
// app/api/generate-psst/route.ts에 추가
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'), // 1시간에 10회
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: '요청 한도를 초과했습니다.' },
      { status: 429 }
    );
  }
  
  // ... 기존 코드
}
```

### 2. 인증 토큰 검증

```typescript
// 결제 완료 토큰 검증
const paymentToken = req.headers.get('authorization');
if (!paymentToken || !verifyPaymentToken(paymentToken)) {
  return NextResponse.json(
    { error: '인증이 필요합니다.' },
    { status: 401 }
  );
}
```

### 3. 요청 로깅

```typescript
// 요청 로깅 (민감한 정보 제외)
console.log('PSST 생성 요청:', {
  ksicCode,
  timestamp: new Date().toISOString(),
  // userIdea는 로그에 포함하지 않음
});
```

## 참고 자료

- [Next.js 환경 변수 문서](https://nextjs.org/docs/basic-features/environment-variables)
- [OpenAI API 보안 가이드](https://platform.openai.com/docs/guides/safety-best-practices)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)

