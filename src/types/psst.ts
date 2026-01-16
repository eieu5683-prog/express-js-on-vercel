/**
 * PSST 사업계획서 구조 타입 정의
 * 
 * P (Problem): 시장의 문제점 및 해결의 시급성
 * S (Solution): 제안하는 서비스/제품의 구체적인 해결 방법과 차별성
 * S (Scale-up): 수익 모델(BM) 및 시장 진입/확장 전략
 * T (Team): 대표자 및 팀원의 역량, 네트워크
 */

export interface PSSTDocument {
  problem: ProblemSection;
  solution: SolutionSection;
  scaleUp: ScaleUpSection;
  team: TeamSection;
  metadata: PSSTMetadata;
}

export interface ProblemSection {
  title: string;
  marketIssues: string[]; // 시장의 불편함
  socialReasons: string[]; // 사회적 이유
  economicReasons: string[]; // 경제적 이유
  urgency: string; // 해결의 시급성
}

export interface SolutionSection {
  title: string;
  coreTechnology: string; // 핵심 기술
  keyFeatures: string[]; // 주요 기능
  differentiation: string[]; // 경쟁사 대비 차별화 포인트
  competitiveAdvantage: string; // 경쟁 우위
}

export interface ScaleUpSection {
  title: string;
  revenueModel: string; // 수익 창출 방안
  revenueStreams: string[]; // 수익원
  marketEntryStrategy: string; // 시장 진입 전략
  expansionPlan: string; // 확장 계획
  marketShareGoal: string; // 3년 내 시장 점유율 목표
  milestones: Milestone[]; // 주요 마일스톤
}

export interface Milestone {
  year: number;
  quarter: number;
  goal: string;
  metric: string;
}

export interface TeamSection {
  title: string;
  ceo: TeamMember; // 대표자
  coreTeam: TeamMember[]; // 핵심 팀원
  advisors?: TeamMember[]; // 자문위원
  network: string[]; // 네트워크 및 파트너십
  capabilities: string[]; // 팀 역량
}

export interface TeamMember {
  name: string;
  role: string;
  expertise: string[]; // 전문 분야
  experience: string; // 경력
  education?: string; // 학력
}

export interface PSSTMetadata {
  industryCode: string; // 업종코드 (KSIC)
  industryName: string; // 업종명
  userInput: string; // 사용자 원본 아이디어
  expertSolution?: string; // 전문가 시크릿 솔루션
  createdAt: string; // 생성 일시
  aiGenerated: boolean; // AI 생성 여부
  version: string; // 버전
}

/**
 * PSST 생성 요청 데이터
 */
export interface PSSTGenerationRequest {
  userInput: string; // 사용자 아이디어
  ksicCode: string; // 업종코드
  industryName: string; // 업종명
  excelExpertSolution?: string; // 전문가 시크릿 솔루션 (Excel 데이터)
  additionalContext?: Record<string, any>; // 추가 컨텍스트
}

/**
 * PSST 생성 응답 데이터
 */
export interface PSSTGenerationResponse {
  success: boolean;
  document?: PSSTDocument;
  error?: string;
  promptUsed?: string; // 사용된 프롬프트 (디버깅용)
}

