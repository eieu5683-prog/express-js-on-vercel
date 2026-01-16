/**
 * AI 시스템 프롬프트 및 사용자 프롬프트 템플릿
 * 
 * 정부 지원사업 심사위원 평가 기준에 맞춘 PSST 구조 기반 사업계획서 생성
 */

/**
 * 시스템 프롬프트
 * AI에게 "너는 누구인가"와 "어떤 규칙을 지켜야 하는가"를 정의
 * 
 * Cursor AI나 OpenAI API 설정 시 System Role에 입력
 */
export const SYSTEM_PROMPT = `Persona: 당신은 대한민국 정부 지원사업(예비창업패키지, 초기창업패키지, R&D 디딤돌 등) 전문 컨설턴트입니다.

Style: 신뢰감 있고 전문적인 관공서/행정 어투를 사용합니다. 감성적인 호소보다는 통계, 수치, 논리적 근거를 바탕으로 문장을 구성합니다.

Constraint: 
1. 반드시 PSST(Problem, Solution, Scale-up, Team) 구조를 유지할 것.
2. 사용자가 제공한 '업종별 전문가 솔루션'을 핵심 키워드로 활용할 것.
3. 2026년 경제 트렌드와 정부 정책 방향(디지털 전환, AI 고도화 등)을 반영할 것.
4. 중요: 2026년 1월 23일부터 시행되는 규정에 따라, 출력물 하단에 "본 초안은 나랏돈네비 AI 기술을 활용하여 작성되었습니다"라는 문구를 반드시 포함할 것.

Output Format: JSON 형식으로 PSST 구조에 맞춰 출력하되, 각 섹션은 명확하고 구체적인 내용으로 작성할 것.`;

/**
 * 사용자 입력 프롬프트 템플릿
 * 웹사이트에서 결제 후 AI에게 전달되는 실제 데이터 구조
 */
export interface UserPromptData {
  userInput: string; // 사용자 아이디어
  ksicCode: string; // 업종코드
  industryName: string; // 업종명
  excelExpertSolution?: string; // 전문가 시크릿 솔루션 (Excel 데이터)
}

/**
 * 사용자 프롬프트 생성 함수
 */
export function generateUserPrompt(data: UserPromptData): string {
  return `# [지시사항]

아래 제공된 '사용자 아이디어'와 '전문가 시크릿 데이터'를 결합하여, 1억 원 규모의 정부 지원사업 합격을 위한 PSST 사업계획서 초안을 작성하라.

# [데이터]

1. 사용자 아이디어: ${data.userInput}

2. 업종코드: ${data.ksicCode}

3. 업종명: ${data.industryName}

4. 전문가 시크릿 솔루션 (Excel 데이터): ${data.excelExpertSolution || '없음'}

# [출력 양식]

다음 JSON 형식으로 출력하라:

{
  "problem": {
    "title": "Problem (문제 인식)",
    "marketIssues": ["현재 시장의 불편함 1", "현재 시장의 불편함 2"],
    "socialReasons": ["사회적 이유 1", "사회적 이유 2"],
    "economicReasons": ["경제적 이유 1", "경제적 이유 2"],
    "urgency": "해결의 시급성에 대한 설명"
  },
  "solution": {
    "title": "Solution (해결 방안)",
    "coreTechnology": "본 서비스의 핵심 기술",
    "keyFeatures": ["주요 기능 1", "주요 기능 2"],
    "differentiation": ["경쟁사 대비 차별화 포인트 1", "차별화 포인트 2"],
    "competitiveAdvantage": "경쟁 우위 요약"
  },
  "scaleUp": {
    "title": "Scale-up (성장 전략)",
    "revenueModel": "구체적인 수익 창출 방안",
    "revenueStreams": ["수익원 1", "수익원 2"],
    "marketEntryStrategy": "시장 진입 전략",
    "expansionPlan": "확장 계획",
    "marketShareGoal": "3년 내 시장 점유율 확보 계획",
    "milestones": [
      {
        "year": 2026,
        "quarter": 1,
        "goal": "목표",
        "metric": "측정 지표"
      }
    ]
  },
  "team": {
    "title": "Team (팀 구성)",
    "ceo": {
      "name": "대표자 이름",
      "role": "역할",
      "expertise": ["전문 분야 1", "전문 분야 2"],
      "experience": "경력 설명"
    },
    "coreTeam": [
      {
        "name": "팀원 이름",
        "role": "역할",
        "expertise": ["전문 분야"],
        "experience": "경력 설명"
      }
    ],
    "network": ["네트워크 1", "네트워크 2"],
    "capabilities": ["팀 역량 1", "팀 역량 2"]
  }
}

# [중요 사항]

1. 각 섹션은 통계, 수치, 논리적 근거를 바탕으로 작성할 것.
2. 2026년 경제 트렌드(디지털 전환, AI 고도화, ESG 등)를 반영할 것.
3. 정부 정책 방향과의 연계성을 명확히 할 것.
4. JSON 형식 외에 추가 텍스트는 출력하지 말 것.
5. 반드시 JSON 형식으로만 응답할 것.`;
}

/**
 * 2026년 경제 트렌드 키워드
 */
export const TREND_KEYWORDS_2026 = [
  '디지털 전환',
  'AI 고도화',
  'ESG 경영',
  '탄소 중립',
  '스마트 팩토리',
  '플랫폼 경제',
  '공유 경제',
  '메타버스',
  '블록체인',
  '사이버 보안',
  '헬스케어 디지털화',
  '스마트 시티',
];

/**
 * 정부 정책 방향 키워드
 */
export const POLICY_KEYWORDS_2026 = [
  '디지털 뉴딜',
  'K-디지털 트레이닝',
  'AI 반도체',
  '바이오 헬스',
  '그린 뉴딜',
  '스마트 그린 산업',
  '창업 생태계 조성',
  '중소기업 혁신',
  'R&D 투자 확대',
  '글로벌 진출 지원',
];

/**
 * AI 표기법 준수 문구
 */
export const AI_DISCLOSURE_TEXT = `
---

**본 초안은 나랏돈네비 AI 기술을 활용하여 작성되었습니다.**

(2026년 1월 23일부터 시행되는 AI 생성 콘텐츠 표기 의무화 규정 준수)
`;

