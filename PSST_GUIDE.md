# PSST 사업계획서 구조 가이드

## 개요

PSST는 정부 지원사업 심사위원들이 가장 중요하게 평가하는 4가지 항목의 논리적 연결성을 나타냅니다:

- **P (Problem)**: 시장의 문제점 및 해결의 시급성
- **S (Solution)**: 제안하는 서비스/제품의 구체적인 해결 방법과 차별성
- **S (Scale-up)**: 수익 모델(BM) 및 시장 진입/확장 전략
- **T (Team)**: 대표자 및 팀원의 역량, 네트워크

## 구조 상세

### 1. Problem (문제 인식)

시장의 불편함과 이를 해결해야 하는 사회적/경제적 이유를 명확히 제시합니다.

**포함 내용:**
- 현재 시장의 불편함 (marketIssues)
- 사회적 이유 (socialReasons)
- 경제적 이유 (economicReasons)
- 해결의 시급성 (urgency)

**작성 팁:**
- 통계와 수치를 활용하여 문제의 심각성을 입증
- 정부 정책과의 연계성 강조
- 2026년 경제 트렌드 반영

### 2. Solution (해결 방안)

본 서비스의 핵심 기술 및 기존 경쟁사 대비 차별화 포인트를 제시합니다.

**포함 내용:**
- 핵심 기술 (coreTechnology)
- 주요 기능 (keyFeatures)
- 경쟁사 대비 차별화 포인트 (differentiation)
- 경쟁 우위 (competitiveAdvantage)

**작성 팁:**
- 기술적 우위를 구체적으로 설명
- 경쟁사와의 차별점을 명확히 제시
- 사용자 제공 업종별 전문가 솔루션을 핵심 키워드로 활용

### 3. Scale-up (성장 전략)

구체적인 수익 창출 방안 및 3년 내 시장 점유율 확보 계획을 제시합니다.

**포함 내용:**
- 수익 창출 방안 (revenueModel)
- 수익원 (revenueStreams)
- 시장 진입 전략 (marketEntryStrategy)
- 확장 계획 (expansionPlan)
- 3년 내 시장 점유율 목표 (marketShareGoal)
- 주요 마일스톤 (milestones)

**작성 팁:**
- 구체적인 수치와 목표 제시
- 단계별 성장 계획 명시
- 시장 진입 및 확장 전략의 실현 가능성 강조

### 4. Team (팀 구성)

사업을 완수할 수 있는 대표자의 전문성과 인적 자원 구성 방향을 제시합니다.

**포함 내용:**
- 대표자 정보 (ceo)
- 핵심 팀원 (coreTeam)
- 자문위원 (advisors, 선택사항)
- 네트워크 및 파트너십 (network)
- 팀 역량 (capabilities)

**작성 팁:**
- 대표자 및 팀원의 전문성 강조
- 관련 경력과 성과 구체적으로 제시
- 네트워크와 파트너십을 통한 사업 성공 가능성 입증

## AI 시스템 프롬프트

AI에게 "너는 누구인가"와 "어떤 규칙을 지켜야 하는가"를 정의하는 시스템 프롬프트는 `src/configs/ai-prompts.ts`에 정의되어 있습니다.

**주요 특징:**
- Persona: 정부 지원사업 전문 컨설턴트
- Style: 신뢰감 있고 전문적인 관공서/행정 어투
- Constraint: PSST 구조 유지, 업종별 전문가 솔루션 활용, 2026년 트렌드 반영, AI 표기법 준수

## 사용자 입력 프롬프트 템플릿

웹사이트에서 결제 후 AI에게 전달되는 실제 데이터 구조:

```typescript
{
  userInput: string;        // 사용자 아이디어
  ksicCode: string;         // 업종코드
  industryName: string;    // 업종명
  excelExpertSolution?: string; // 전문가 시크릿 솔루션 (선택사항)
}
```

## API 사용법

### PSST 생성 API

```typescript
POST /api/psst/generate

Request Body:
{
  "userInput": "사용자 아이디어",
  "ksicCode": "55101",
  "industryName": "숙박업",
  "excelExpertSolution": "전문가 솔루션 데이터 (선택사항)"
}

Response:
{
  "success": true,
  "document": {
    "problem": { ... },
    "solution": { ... },
    "scaleUp": { ... },
    "team": { ... },
    "metadata": { ... }
  }
}
```

## 컴포넌트 사용법

### PSSTGenerator 컴포넌트

사용자 입력을 받아 PSST 문서를 생성하는 폼 컴포넌트입니다.

```tsx
import PSSTGenerator from '@/src/components/PSSTGenerator';

export default function MyPage() {
  return <PSSTGenerator />;
}
```

### PSSTViewer 컴포넌트

생성된 PSST 문서를 표시하는 뷰어 컴포넌트입니다.

```tsx
import PSSTViewer from '@/src/components/PSSTViewer';
import { PSSTDocument } from '@/src/types/psst';

export default function MyPage() {
  const document: PSSTDocument = { ... };
  
  return <PSSTViewer document={document} />;
}
```

## 유틸리티 함수

### generatePSST

PSST 문서를 생성하는 함수입니다.

```typescript
import { generatePSST } from '@/src/utils/psst-generator';
import { PSSTGenerationRequest } from '@/src/types/psst';

const request: PSSTGenerationRequest = {
  userInput: '사용자 아이디어',
  ksicCode: '55101',
  industryName: '숙박업',
};

const result = await generatePSST(request);
```

### convertPSSTToMarkdown

PSST 문서를 마크다운 형식으로 변환합니다.

```typescript
import { convertPSSTToMarkdown } from '@/src/utils/psst-generator';

const markdown = convertPSSTToMarkdown(document);
```

### convertPSSTToHTML

PSST 문서를 HTML 형식으로 변환합니다.

```typescript
import { convertPSSTToHTML } from '@/src/utils/psst-generator';

const html = convertPSSTToHTML(document);
```

## 2026년 트렌드 반영

PSST 생성 시 다음 트렌드 키워드가 자동으로 반영됩니다:

**경제 트렌드:**
- 디지털 전환
- AI 고도화
- ESG 경영
- 탄소 중립
- 스마트 팩토리
- 플랫폼 경제
- 공유 경제
- 메타버스
- 블록체인
- 사이버 보안
- 헬스케어 디지털화
- 스마트 시티

**정부 정책 방향:**
- 디지털 뉴딜
- K-디지털 트레이닝
- AI 반도체
- 바이오 헬스
- 그린 뉴딜
- 스마트 그린 산업
- 창업 생태계 조성
- 중소기업 혁신
- R&D 투자 확대
- 글로벌 진출 지원

## AI 표기법 준수

2026년 1월 23일부터 시행되는 'AI 생성 콘텐츠 표기 의무화' 규정에 따라:

1. 생성된 PSST 문서 하단에 자동으로 AI 표기 문구가 포함됩니다.
2. 리포트 페이지에 AI 관련 메타 태그가 자동으로 추가됩니다.
3. 본문에도 AI 생성 콘텐츠임을 명시하는 섹션이 포함됩니다.

**표기 문구:**
> 본 초안은 나랏돈네비 AI 기술을 활용하여 작성되었습니다.
> 
> (2026년 1월 23일부터 시행되는 AI 생성 콘텐츠 표기 의무화 규정 준수)

## 실제 AI API 연동

현재는 개발 환경용 모의 응답을 반환합니다. 실제 AI API를 연동하려면 `src/utils/psst-generator.ts`의 `callAIAPI` 함수를 수정하세요.

**예시: OpenAI API 연동**

```typescript
async function callAIAPI(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
```

## 파일 구조

```
src/
├── types/
│   └── psst.ts                    # PSST 타입 정의
├── configs/
│   └── ai-prompts.ts             # AI 프롬프트 템플릿
├── utils/
│   └── psst-generator.ts         # PSST 생성 유틸리티
└── components/
    ├── PSSTGenerator.tsx          # PSST 생성 폼
    └── PSSTViewer.tsx            # PSST 뷰어
app/
└── api/
    └── psst/
        └── generate/
            └── route.ts          # PSST 생성 API
```

## 주의사항

1. **JSON 형식 준수**: AI 응답은 반드시 JSON 형식이어야 합니다.
2. **필수 필드**: userInput, ksicCode, industryName은 필수입니다.
3. **AI API 키**: 프로덕션 환경에서는 환경 변수로 API 키를 관리하세요.
4. **에러 처리**: AI API 호출 실패 시 적절한 에러 메시지를 사용자에게 표시하세요.

