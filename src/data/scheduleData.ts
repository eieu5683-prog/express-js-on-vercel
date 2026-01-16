/**
 * 2026-2028년 정부 지원사업 공고 및 세무 일정 데이터
 * 
 * 엑셀에서 추출한 공고 일정 데이터를 코드로 변환하여 저장
 * Cursor AI를 사용하여 엑셀 데이터를 이 파일로 변환할 수 있습니다.
 */

import { GrantSchedule, YearlySchedule, ScheduleInfo } from './types';
import { Grade } from './types';

// 타입 re-export (다른 파일에서 사용 가능하도록)
export type { GrantSchedule, YearlySchedule, ScheduleInfo } from './types';
export type { Grade } from './types';

/**
 * 지원금/세무 일정 데이터베이스 (새로운 형식)
 * 
 * Cursor AI 프롬프트:
 * "나랏돈네비의 src/data/scheduleData.ts 파일을 업데이트해줘. 
 *  내가 아래에 제공하는 엑셀 데이터를 바탕으로 GRANT_SCHEDULE 상수 배열을 생성해줘."
 * 
 * 데이터 변환 규칙:
 * - ID 생성: '연도-월-순번' 형식으로 고유한 ID 부여
 * - 등급 매칭: 'IT/소프트웨어' 관련 → ['S', 'A'], '일반 소상공인' → ['B', 'C']
 * - 세무 일정: 부가세, 소득세 등 → category: 'TAX'
 * - 정렬: 연도와 월 순서대로 오름차순
 * - AI 표기법: description 하단에 "본 요약은 나랏돈네비 AI 기술로 작성되었습니다" 포함
 */
export const GRANT_SCHEDULE: GrantSchedule[] = [
  // 예시 데이터 - 실제 데이터로 교체 필요
  {
    id: '2026-01-1',
    year: 2026,
    month: 1,
    title: '연말정산 및 원천징수 신고',
    targetGrade: ['S', 'A', 'B', 'C', 'D'],
    description: '2026년 1월 연말정산 및 원천징수 신고 일정입니다. 사업자는 1월 31일까지 원천징수 영수증을 발급하고, 근로소득 원천징수영수증을 발급해야 합니다.\n\n본 요약은 나랏돈네비 AI 기술로 작성되었습니다.',
    category: 'TAX',
    startDate: '2026-01-01',
    endDate: '2026-01-31',
  },
  {
    id: '2026-01-2',
    year: 2026,
    month: 1,
    title: '예비창업패키지',
    targetGrade: ['S', 'A'],
    description: 'IT/소프트웨어, 바이오, 제조업 등 혁신 창업자를 대상으로 최대 1억원을 지원합니다. 기술 기반 창업 아이디어와 사업계획서가 필요합니다.\n\n본 요약은 나랏돈네비 AI 기술로 작성되었습니다.',
    category: 'GRANT',
    startDate: '2026-01-15',
    endDate: '2026-02-28',
    amount: '최대 1억원',
    link: 'https://example.com/pre-startup',
  },
  {
    id: '2026-02-1',
    year: 2026,
    month: 2,
    title: '부가가치세 신고',
    targetGrade: ['S', 'A', 'B', 'C', 'D'],
    description: '2026년 2월 부가가치세 신고 일정입니다. 부가가치세 과세표준 신고 및 납부를 2월 25일까지 완료해야 합니다.\n\n본 요약은 나랏돈네비 AI 기술로 작성되었습니다.',
    category: 'TAX',
    startDate: '2026-02-01',
    endDate: '2026-02-25',
  },
  {
    id: '2026-02-2',
    year: 2026,
    month: 2,
    title: '창업 지원금',
    targetGrade: ['S', 'A', 'B'],
    description: '신규 창업자를 대상으로 창업 자금을 지원합니다. 업종별 차등 지원하며, IT/소프트웨어 업종은 우대합니다.\n\n본 요약은 나랏돈네비 AI 기술로 작성되었습니다.',
    category: 'GRANT',
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    amount: '최대 5천만원',
  },
  {
    id: '2026-03-1',
    year: 2026,
    month: 3,
    title: '소득세 신고',
    targetGrade: ['S', 'A', 'B', 'C', 'D'],
    description: '2026년 3월 소득세 신고 일정입니다. 종합소득세 신고 및 납부를 3월 31일까지 완료해야 합니다.\n\n본 요약은 나랏돈네비 AI 기술로 작성되었습니다.',
    category: 'TAX',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
  },
  {
    id: '2026-03-2',
    year: 2026,
    month: 3,
    title: '고용 지원금',
    targetGrade: ['A', 'B', 'C'],
    description: '일반 소상공인을 대상으로 고용 지원금을 제공합니다. 신규 채용 시 인건비의 일부를 지원합니다.\n\n본 요약은 나랏돈네비 AI 기술로 작성되었습니다.',
    category: 'GRANT',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    amount: '최대 3천만원',
  },
  // 추가 데이터는 여기에 계속 추가...
];

/**
 * 기존 형식의 일정 데이터 (하위 호환성 유지)
 */
export const SCHEDULE_DB: YearlySchedule[] = [
  {
    year: 2026,
    schedules: [
      {
        name: '예비창업패키지',
        startDate: '2026-01-15',
        endDate: '2026-02-28',
        amount: '최대 1억원',
        targetIndustries: ['IT/소프트웨어', '바이오', '제조업'],
        link: 'https://example.com/pre-startup',
        note: '신규 창업자 대상',
      },
      {
        name: '초기창업패키지',
        startDate: '2026-03-01',
        endDate: '2026-04-30',
        amount: '최대 2억원',
        targetIndustries: ['모든 업종'],
        link: 'https://example.com/early-startup',
        note: '창업 3년 이내 기업',
      },
      {
        name: 'R&D 디딤돌',
        startDate: '2026-05-01',
        endDate: '2026-06-30',
        amount: '최대 1.5억원',
        targetIndustries: ['IT/소프트웨어', 'AI', '로봇'],
        link: 'https://example.com/rd',
        note: 'R&D 집약적 기업 우대',
      },
      {
        name: '그린 뉴딜 지원사업',
        startDate: '2026-07-01',
        endDate: '2026-08-31',
        amount: '최대 3억원',
        targetIndustries: ['친환경', '에너지', '재생에너지'],
        link: 'https://example.com/green',
        note: 'ESG 경영 기업 우대',
      },
      {
        name: 'K-디지털 트레이닝',
        startDate: '2026-09-01',
        endDate: '2026-10-31',
        amount: '최대 5천만원',
        targetIndustries: ['IT/소프트웨어', '디지털 전환'],
        link: 'https://example.com/k-digital',
        note: '인력 양성 지원',
      },
    ],
  },
  {
    year: 2027,
    schedules: [
      {
        name: '예비창업패키지',
        startDate: '2027-01-15',
        endDate: '2027-02-28',
        amount: '최대 1억원',
        targetIndustries: ['IT/소프트웨어', '바이오', '제조업'],
        link: 'https://example.com/pre-startup',
        note: '신규 창업자 대상',
      },
      {
        name: '초기창업패키지',
        startDate: '2027-03-01',
        endDate: '2027-04-30',
        amount: '최대 2억원',
        targetIndustries: ['모든 업종'],
        link: 'https://example.com/early-startup',
        note: '창업 3년 이내 기업',
      },
    ],
  },
  {
    year: 2028,
    schedules: [
      {
        name: '예비창업패키지',
        startDate: '2028-01-15',
        endDate: '2028-02-28',
        amount: '최대 1억원',
        targetIndustries: ['IT/소프트웨어', '바이오', '제조업'],
        link: 'https://example.com/pre-startup',
        note: '신규 창업자 대상',
      },
    ],
  },
];

/**
 * 특정 연도의 일정 조회 (기존 함수)
 */
export function getScheduleByYear(year: number): YearlySchedule | undefined {
  return SCHEDULE_DB.find((schedule) => schedule.year === year);
}

/**
 * 현재 진행 중인 공고 목록 조회 (기존 함수)
 */
export function getCurrentSchedules(): YearlySchedule[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  return SCHEDULE_DB.map((yearlySchedule) => {
    if (yearlySchedule.year === currentYear) {
      return {
        ...yearlySchedule,
        schedules: yearlySchedule.schedules.filter((schedule) => {
          const startDate = new Date(schedule.startDate);
          const endDate = new Date(schedule.endDate);
          return today >= startDate && today <= endDate;
        }),
      };
    }
    return yearlySchedule;
  }).filter((schedule) => schedule.schedules.length > 0);
}

/**
 * 특정 업종에 해당하는 공고 목록 조회 (기존 함수)
 */
export function getSchedulesByIndustry(industry: string): YearlySchedule[] {
  return SCHEDULE_DB.map((yearlySchedule) => {
    return {
      ...yearlySchedule,
      schedules: yearlySchedule.schedules.filter((schedule) => {
        return (
          !schedule.targetIndustries ||
          schedule.targetIndustries.includes(industry) ||
          schedule.targetIndustries.includes('모든 업종')
        );
      }),
    };
  }).filter((schedule) => schedule.schedules.length > 0);
}

/**
 * 새로운 형식의 일정 조회 함수들
 */

/**
 * 특정 등급에 지원 가능한 일정 조회
 */
export function getSchedulesByGrade(grade: Grade): GrantSchedule[] {
  return GRANT_SCHEDULE.filter((schedule) => schedule.targetGrade.includes(grade));
}

/**
 * 특정 연도의 일정 조회
 */
export function getGrantSchedulesByYear(year: number): GrantSchedule[] {
  return GRANT_SCHEDULE.filter((schedule) => schedule.year === year);
}

/**
 * 특정 월의 일정 조회
 */
export function getGrantSchedulesByMonth(year: number, month: number): GrantSchedule[] {
  return GRANT_SCHEDULE.filter(
    (schedule) => schedule.year === year && schedule.month === month
  );
}

/**
 * 지원금 일정만 조회
 */
export function getGrantSchedules(): GrantSchedule[] {
  return GRANT_SCHEDULE.filter((schedule) => schedule.category === 'GRANT');
}

/**
 * 세무 일정만 조회
 */
export function getTaxSchedules(): GrantSchedule[] {
  return GRANT_SCHEDULE.filter((schedule) => schedule.category === 'TAX');
}

/**
 * 현재 진행 중인 일정 조회
 */
export function getCurrentGrantSchedules(): GrantSchedule[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  return GRANT_SCHEDULE.filter((schedule) => {
    if (schedule.year !== currentYear) return false;
    if (schedule.month !== currentMonth) return false;
    
    // 시작일과 종료일이 있는 경우 추가 확인
    if (schedule.startDate && schedule.endDate) {
      const startDate = new Date(schedule.startDate);
      const endDate = new Date(schedule.endDate);
      return today >= startDate && today <= endDate;
    }
    
    return true;
  });
}

/**
 * 특정 등급과 연도에 지원 가능한 일정 개수 조회
 * SEO 및 사용자 경험 개선용
 */
export function getAvailableScheduleCount(grade: Grade, year: number): number {
  return GRANT_SCHEDULE.filter(
    (schedule) =>
      schedule.year === year &&
      schedule.targetGrade.includes(grade) &&
      schedule.category === 'GRANT'
  ).length;
}

/**
 * ID로 일정 조회
 */
export function getGrantScheduleById(id: string): GrantSchedule | undefined {
  return GRANT_SCHEDULE.find((schedule) => schedule.id === id);
}
