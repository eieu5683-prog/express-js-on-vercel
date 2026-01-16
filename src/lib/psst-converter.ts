/**
 * PSST 데이터 변환 유틸리티
 * KsicInfo의 PSSTContent를 PSSTDocument 형식으로 변환
 */

import { PSSTContent, KsicInfo } from '@/src/data/types';
import { PSSTDocument } from '@/src/types/psst';

/**
 * PSSTContent를 PSSTDocument로 변환
 */
export function convertPSSTContentToDocument(
  psstContent: PSSTContent,
  ksicInfo: KsicInfo
): PSSTDocument {
  return {
    problem: {
      title: 'Problem (문제 인식)',
      marketIssues: psstContent.p.split('\n').filter((line) => line.trim()),
      socialReasons: [],
      economicReasons: [],
      urgency: psstContent.p,
    },
    solution: {
      title: 'Solution (해결 방안)',
      coreTechnology: psstContent.s,
      keyFeatures: psstContent.s.split('\n').filter((line) => line.trim()),
      differentiation: [],
      competitiveAdvantage: psstContent.s,
    },
    scaleUp: {
      title: 'Scale-up (성장 전략)',
      revenueModel: psstContent.s_scale,
      revenueStreams: psstContent.s_scale.split('\n').filter((line) => line.trim()),
      marketEntryStrategy: psstContent.s_scale,
      expansionPlan: psstContent.s_scale,
      marketShareGoal: psstContent.s_scale,
      milestones: [],
    },
    team: {
      title: 'Team (팀 구성)',
      ceo: {
        name: '대표자',
        role: 'CEO',
        expertise: [],
        experience: psstContent.t,
      },
      coreTeam: [],
      network: [],
      capabilities: [],
    },
    metadata: {
      industryCode: ksicInfo.code,
      industryName: ksicInfo.name,
      userInput: '',
      expertSolution: ksicInfo.solution,
      createdAt: new Date().toISOString(),
      aiGenerated: true,
      version: '1.0.0',
    },
  };
}

/**
 * AI 표기법 준수 문구 추가
 */
export function addAIDisclosure(text: string): string {
  return `${text}\n\n---\n\n**본 초안은 나랏돈네비 AI 기술을 활용하여 작성되었습니다.**\n\n(2026년 1월 23일부터 시행되는 AI 생성 콘텐츠 표기 의무화 규정 준수)`;
}

