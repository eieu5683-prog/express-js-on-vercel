/**
 * KSIC 업종코드 데이터베이스
 * 
 * 엑셀 데이터를 코드로 변환하여 저장하는 곳
 * Cursor AI를 사용하여 엑셀 데이터를 이 파일로 변환할 수 있습니다.
 * 
 * 사용법:
 * 1. 엑셀 데이터를 복사
 * 2. Cursor AI 채팅창에 아래 프롬프트 입력:
 *    "내가 제공하는 엑셀 데이터를 바탕으로 src/data/ksicData.ts 파일의 KSIC_DB 객체를 업데이트해줘.
 *     데이터 형식은 우리가 정의한 KsicInfo 인터페이스를 엄격히 따라야 해.
 *     엑셀의 각 행을 객체의 키(업종코드)와 값으로 변환해줘."
 * 3. 엑셀 데이터 붙여넣기
 */

import { KsicInfo } from './types';

/**
 * KSIC 업종코드 데이터베이스
 * 키: 업종코드 (5자리)
 * 값: 업종 정보
 */
export const KSIC_DB: Record<string, KsicInfo> = {
  // 예시 데이터 - 실제 데이터로 교체 필요
  '58221': {
    code: '58221',
    name: '시스템 소프트웨어 개발',
    grade: 'S',
    maxAmount: '최대 1.5억',
    solution: 'R&D 가점 높음',
    psst: {
      p: '기존 수작업 비효율로 인한 생산성 저하 문제가 지속되고 있습니다. 디지털 전환의 필요성이 높아지고 있으며, 2026년 AI 고도화 정책과 연계하여 시급한 해결이 요구됩니다.',
      s: 'AI 기반 자동화 시스템을 도입하여 업무 프로세스를 혁신합니다. 기존 대비 80% 이상의 생산성 향상을 목표로 하며, 머신러닝 알고리즘을 활용한 지능형 솔루션을 제공합니다.',
      s_scale: '3년 내 매출 50억 원 달성 및 시장 점유율 15% 확보를 목표로 합니다. 1년차: 시장 진입 및 초기 고객 확보, 2년차: 제품 고도화 및 시장 확대, 3년차: 해외 진출 및 IPO 준비를 진행합니다.',
      t: 'AI/ML 전문가 3명, 소프트웨어 엔지니어 5명, 비즈니스 개발 전문가 2명으로 구성된 핵심 팀을 보유하고 있습니다. 대표자는 10년 이상의 IT 업계 경력과 3건의 성공적인 스타트업 경험이 있습니다.',
    },
  },
  '47110': {
    code: '47110',
    name: '슈퍼마켓 소매업',
    grade: 'D',
    maxAmount: '0원',
    solution: '업종코드 변경 필수',
    // D등급은 PSST 데이터 없음
  },
  '55101': {
    code: '55101',
    name: '일반 숙박업',
    grade: 'A',
    maxAmount: '최대 5천만원',
    solution: '관광 특화 지역 우대',
    psst: {
      p: '전통적인 숙박업의 디지털 전환 필요성이 증가하고 있습니다. 특히 2026년 그린 뉴딜 정책과 연계하여 친환경 숙박 시설에 대한 정부 지원이 확대되고 있습니다.',
      s: '스마트 호텔 시스템을 도입하여 무인 체크인/아웃, IoT 기반 에너지 관리, AI 맞춤형 서비스를 제공합니다. 친환경 인증을 획득하여 ESG 경영을 실현합니다.',
      s_scale: '3년 내 객실 점유율 70% 달성 및 연매출 20억 원을 목표로 합니다. 1년차: 시스템 구축 및 초기 마케팅, 2년차: 브랜드 확장 및 프랜차이즈 모델 개발, 3년차: 지역 대표 숙박 브랜드로 성장합니다.',
      t: '호텔 경영 전문가 2명, IT 시스템 개발자 2명, 마케팅 전문가 1명으로 구성된 팀입니다. 대표자는 15년 이상의 호텔 경영 경력과 2건의 성공적인 리모델링 프로젝트 경험이 있습니다.',
    },
  },
  // 추가 업종 데이터는 여기에 계속 추가...
};

/**
 * 업종코드로 정보 조회
 */
export function getKsicInfo(code: string): KsicInfo | undefined {
  return KSIC_DB[code];
}

/**
 * 업종명으로 정보 조회
 */
export function getKsicInfoByName(name: string): KsicInfo | undefined {
  return Object.values(KSIC_DB).find((info) => info.name === name);
}

/**
 * 등급별 업종 목록 조회
 */
export function getKsicByGrade(grade: Grade): KsicInfo[] {
  return Object.values(KSIC_DB).filter((info) => info.grade === grade);
}

/**
 * 모든 업종 목록 조회
 */
export function getAllKsicInfo(): KsicInfo[] {
  return Object.values(KSIC_DB);
}

/**
 * PSST 데이터가 있는 업종 목록 조회
 */
export function getKsicWithPSST(): KsicInfo[] {
  return Object.values(KSIC_DB).filter((info) => info.psst !== undefined);
}

