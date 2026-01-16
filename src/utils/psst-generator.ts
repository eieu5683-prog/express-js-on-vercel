/**
 * PSST 사업계획서 생성 유틸리티
 * 
 * AI API를 호출하여 PSST 구조의 사업계획서를 생성합니다.
 */

import { PSSTGenerationRequest, PSSTGenerationResponse, PSSTDocument } from '@/src/types/psst';
import { SYSTEM_PROMPT, generateUserPrompt, AI_DISCLOSURE_TEXT } from '@/src/configs/ai-prompts';

/**
 * PSST 사업계획서 생성
 * 
 * @param request 생성 요청 데이터
 * @returns 생성된 PSST 문서
 */
export async function generatePSST(
  request: PSSTGenerationRequest
): Promise<PSSTGenerationResponse> {
  try {
    // 사용자 프롬프트 생성
    const userPrompt = generateUserPrompt({
      userInput: request.userInput,
      ksicCode: request.ksicCode,
      industryName: request.industryName,
      excelExpertSolution: request.excelExpertSolution,
    });

    // AI API 호출 (실제 구현 시 OpenAI, Anthropic 등 사용)
    const aiResponse = await callAIAPI(SYSTEM_PROMPT, userPrompt);

    // JSON 파싱
    let document: PSSTDocument;
    try {
      const parsed = JSON.parse(aiResponse);
      document = {
        ...parsed,
        metadata: {
          industryCode: request.ksicCode,
          industryName: request.industryName,
          userInput: request.userInput,
          expertSolution: request.excelExpertSolution,
          createdAt: new Date().toISOString(),
          aiGenerated: true,
          version: '1.0.0',
        },
      };
    } catch (parseError) {
      // JSON 파싱 실패 시 에러 반환
      return {
        success: false,
        error: 'AI 응답 파싱 실패. JSON 형식이 올바르지 않습니다.',
        promptUsed: userPrompt,
      };
    }

    return {
      success: true,
      document,
      promptUsed: userPrompt,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
}

/**
 * AI API 호출 (실제 구현 필요)
 * 
 * @param systemPrompt 시스템 프롬프트
 * @param userPrompt 사용자 프롬프트
 * @returns AI 응답 텍스트
 */
async function callAIAPI(systemPrompt: string, userPrompt: string): Promise<string> {
  // TODO: 실제 AI API 구현
  // 예시: OpenAI, Anthropic Claude, Google Gemini 등
  
  // 개발 환경에서는 모의 응답 반환
  if (process.env.NODE_ENV === 'development') {
    return JSON.stringify({
      problem: {
        title: 'Problem (문제 인식)',
        marketIssues: ['시장 문제점 1', '시장 문제점 2'],
        socialReasons: ['사회적 이유 1', '사회적 이유 2'],
        economicReasons: ['경제적 이유 1', '경제적 이유 2'],
        urgency: '해결의 시급성 설명',
      },
      solution: {
        title: 'Solution (해결 방안)',
        coreTechnology: '핵심 기술 설명',
        keyFeatures: ['주요 기능 1', '주요 기능 2'],
        differentiation: ['차별화 포인트 1', '차별화 포인트 2'],
        competitiveAdvantage: '경쟁 우위 요약',
      },
      scaleUp: {
        title: 'Scale-up (성장 전략)',
        revenueModel: '수익 창출 방안',
        revenueStreams: ['수익원 1', '수익원 2'],
        marketEntryStrategy: '시장 진입 전략',
        expansionPlan: '확장 계획',
        marketShareGoal: '3년 내 시장 점유율 목표',
        milestones: [
          {
            year: 2026,
            quarter: 1,
            goal: '목표',
            metric: '측정 지표',
          },
        ],
      },
      team: {
        title: 'Team (팀 구성)',
        ceo: {
          name: '대표자',
          role: 'CEO',
          expertise: ['전문 분야 1', '전문 분야 2'],
          experience: '경력 설명',
        },
        coreTeam: [
          {
            name: '팀원 1',
            role: '역할',
            expertise: ['전문 분야'],
            experience: '경력 설명',
          },
        ],
        network: ['네트워크 1', '네트워크 2'],
        capabilities: ['역량 1', '역량 2'],
      },
    });
  }

  // ⚠️ 보안 주의: 이 함수는 클라이언트 사이드에서 실행될 수 있으므로
  // 직접 OpenAI API를 호출하지 않습니다.
  // 대신 /api/generate-psst 엔드포인트를 사용하세요.
  //
  // 프로덕션 환경에서는 실제 API 호출
  // 예시: OpenAI API (서버 사이드에서만 사용)
  /*
  // ⚠️ 이 코드는 서버 사이드에서만 실행되어야 합니다.
  // 클라이언트 사이드에서는 절대 사용하지 마세요!
  // 
  // 올바른 방법: Next.js API 라우트를 통해 호출
  // const response = await fetch('/api/generate-psst', { ... });
  //
  // 잘못된 방법 (보안 위험):
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   headers: {
  //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // 클라이언트 노출!
  //   },
  // });
  */

  throw new Error('AI API가 설정되지 않았습니다.');
}

/**
 * PSST 문서를 마크다운 형식으로 변환
 */
export function convertPSSTToMarkdown(document: PSSTDocument): string {
  const { problem, solution, scaleUp, team, metadata } = document;

  return `# PSST 사업계획서

**업종**: ${metadata.industryName} (${metadata.industryCode})
**생성일**: ${new Date(metadata.createdAt).toLocaleDateString('ko-KR')}

---

## 1. ${problem.title}

### 시장의 문제점
${problem.marketIssues.map((issue, idx) => `${idx + 1}. ${issue}`).join('\n')}

### 사회적 이유
${problem.socialReasons.map((reason, idx) => `${idx + 1}. ${reason}`).join('\n')}

### 경제적 이유
${problem.economicReasons.map((reason, idx) => `${idx + 1}. ${reason}`).join('\n')}

### 해결의 시급성
${problem.urgency}

---

## 2. ${solution.title}

### 핵심 기술
${solution.coreTechnology}

### 주요 기능
${solution.keyFeatures.map((feature, idx) => `${idx + 1}. ${feature}`).join('\n')}

### 경쟁사 대비 차별화 포인트
${solution.differentiation.map((point, idx) => `${idx + 1}. ${point}`).join('\n')}

### 경쟁 우위
${solution.competitiveAdvantage}

---

## 3. ${scaleUp.title}

### 수익 창출 방안
${scaleUp.revenueModel}

### 수익원
${scaleUp.revenueStreams.map((stream, idx) => `${idx + 1}. ${stream}`).join('\n')}

### 시장 진입 전략
${scaleUp.marketEntryStrategy}

### 확장 계획
${scaleUp.expansionPlan}

### 3년 내 시장 점유율 목표
${scaleUp.marketShareGoal}

### 주요 마일스톤
${scaleUp.milestones
  .map(
    (m) => `**${m.year}년 ${m.quarter}분기**: ${m.goal} (${m.metric})`
  )
  .join('\n')}

---

## 4. ${team.title}

### 대표자 (CEO)
- **이름**: ${team.ceo.name}
- **역할**: ${team.ceo.role}
- **전문 분야**: ${team.ceo.expertise.join(', ')}
- **경력**: ${team.ceo.experience}
${team.ceo.education ? `- **학력**: ${team.ceo.education}` : ''}

### 핵심 팀원
${team.coreTeam
  .map(
    (member) => `#### ${member.name} (${member.role})
- **전문 분야**: ${member.expertise.join(', ')}
- **경력**: ${member.experience}
${member.education ? `- **학력**: ${member.education}` : ''}
`
  )
  .join('\n')}

### 네트워크 및 파트너십
${team.network.map((n, idx) => `${idx + 1}. ${n}`).join('\n')}

### 팀 역량
${team.capabilities.map((cap, idx) => `${idx + 1}. ${cap}`).join('\n')}

---

${AI_DISCLOSURE_TEXT}
`;
}

/**
 * PSST 문서를 HTML 형식으로 변환
 */
export function convertPSSTToHTML(document: PSSTDocument): string {
  const markdown = convertPSSTToMarkdown(document);
  // 간단한 마크다운 to HTML 변환 (실제로는 marked, markdown-it 등 라이브러리 사용 권장)
  return markdown
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

