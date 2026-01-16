/**
 * 데이터 타입 정의
 * 엑셀 데이터와 코드 간의 일관성을 유지하기 위한 타입 정의
 */

/**
 * 등급 타입
 */
export type Grade = 'S' | 'A' | 'B' | 'C' | 'D';

/**
 * PSST 콘텐츠 구조
 * 유료 결제 시 노출될 PSST 초안 데이터
 */
export interface PSSTContent {
  /** Problem: 문제 인식 */
  p: string;
  /** Solution: 해결 방안 */
  s: string;
  /** Scale-up: 성장 전략 */
  s_scale: string;
  /** Team: 팀 구성 */
  t: string;
}

/**
 * KSIC 업종 정보
 * 업종코드별 등급 및 PSST 데이터
 */
export interface KsicInfo {
  /** 업종코드 (5자리) */
  code: string;
  /** 업종명 */
  name: string;
  /** 등급 (S, A, B, C, D) */
  grade: Grade;
  /** 예상 지원금액 */
  maxAmount: string;
  /** 전문가 시크릿 솔루션 */
  solution: string;
  /** 유료 결제 시 노출될 PSST 초안 (선택사항) */
  psst?: PSSTContent;
}

/**
 * 공고 일정 정보 (기존 형식 - 하위 호환성 유지)
 */
export interface ScheduleInfo {
  /** 공고명 */
  name: string;
  /** 시작일 */
  startDate: string;
  /** 종료일 */
  endDate: string;
  /** 지원금액 */
  amount: string;
  /** 대상 업종 */
  targetIndustries?: string[];
  /** 링크 */
  link?: string;
  /** 비고 */
  note?: string;
}

/**
 * 연도별 공고 일정 (기존 형식 - 하위 호환성 유지)
 */
export interface YearlySchedule {
  year: number;
  schedules: ScheduleInfo[];
}

/**
 * 지원금/세무 일정 정보 (새로운 형식)
 */
export interface GrantSchedule {
  /** 고유 ID (연도-월-순번 형식) */
  id: string;
  /** 연도 (2026, 2027 등) */
  year: number;
  /** 공고 예정 월 */
  month: number;
  /** 사업명 (예: 예비창업패키지) */
  title: string;
  /** 지원 가능 등급 (예: ['S', 'A']) */
  targetGrade: Grade[];
  /** 주요 혜택 및 내용 */
  description: string;
  /** 지원금 또는 세무 일정 구분 */
  category: 'GRANT' | 'TAX';
  /** 시작일 (선택사항) */
  startDate?: string;
  /** 종료일 (선택사항) */
  endDate?: string;
  /** 지원금액 (선택사항) */
  amount?: string;
  /** 링크 (선택사항) */
  link?: string;
}

