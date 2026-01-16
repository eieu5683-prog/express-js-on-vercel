import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { KSIC_DB } from '@/src/data/ksicData';
import {
  MASTER_SYSTEM_PROMPT,
  generateMasterUserPrompt,
} from '@/src/configs/master-prompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * PSST 리포트 생성 API
 * POST /api/generate-psst
 * 
 * 요청 본문:
 * {
 *   ksicCode: string,  // 업종코드
 *   userIdea: string   // 사용자 아이디어
 * }
 */
export async function POST(req: Request) {
  try {
    const {
      ksicCode,
      userIdea,
      additionalKeywords,
      scoreFactors,
      differentiationPoint,
    } = await req.json();

    // 필수 파라미터 검증
    if (!ksicCode || !userIdea) {
      return NextResponse.json(
        { error: '업종코드와 사용자 아이디어가 필요합니다.' },
        { status: 400 }
      );
    }

    // OpenAI API 키 확인 (서버 사이드 전용)
    if (!process.env.OPENAI_API_KEY) {
      // 서버 로그에만 기록 (클라이언트에 노출하지 않음)
      console.error('[SECURITY] OPENAI_API_KEY가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: 'AI 서비스 설정 오류입니다.' },
        { status: 500 }
      );
    }

    // API 키가 클라이언트에 노출되지 않았는지 확인
    // NEXT_PUBLIC_ 접두사가 있으면 경고
    if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      console.warn('[SECURITY WARNING] NEXT_PUBLIC_OPENAI_API_KEY가 설정되어 있습니다. 이는 보안 위험입니다!');
    }

    // 1. 사장님의 엑셀 데이터(전문가 솔루션) 가져오기
    const expertData = KSIC_DB[ksicCode];
    if (!expertData) {
      return NextResponse.json(
        { error: '해당 업종 데이터를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 2. 고성능 마스터 프롬프트 조립
    const systemPrompt = MASTER_SYSTEM_PROMPT;

    // 추가 입력 데이터 기본값 설정
    const finalAdditionalKeywords =
      additionalKeywords || '디지털 전환, AI 고도화, ESG 경영';
    const finalScoreFactors =
      scoreFactors || '디지털 전환, 지역경제 활성화, ESG 경영';
    const finalDifferentiationPoint =
      differentiationPoint || '기술·운영·BM 중 핵심 차별 포인트';

    // 사용자 프롬프트 생성
    const userPrompt = generateMasterUserPrompt({
      ksicCode,
      industryName: expertData.name,
      userIdea,
      expertSolution: expertData.solution,
      maxAmount: expertData.maxAmount,
      grade: expertData.grade,
      additionalKeywords: finalAdditionalKeywords,
      scoreFactors: finalScoreFactors,
      differentiationPoint: finalDifferentiationPoint,
    });

    // 3. OpenAI API 호출 (GPT-4o)
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000, // 더 긴 리포트 생성을 위해 토큰 수 증가
    });

    const generatedPsst = response.choices[0].message.content;

    if (!generatedPsst) {
      return NextResponse.json(
        { error: '리포트 생성에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: generatedPsst,
      notice:
        '본 초안은 나랏돈네비 AI 기술(GPT-4o)을 활용하여 작성되었습니다.\n(2026년 1월 23일부터 시행되는 AI 생성 콘텐츠 표기 의무화 규정 준수)',
      metadata: {
        ksicCode,
        industryName: expertData.name,
        grade: expertData.grade,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    // 서버 로그에만 상세 오류 기록 (클라이언트에는 노출하지 않음)
    console.error('AI API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      // 민감한 정보는 로그에 포함하지 않음
    });

    // OpenAI API 오류 처리
    if (error instanceof OpenAI.APIError) {
      // 클라이언트에는 일반적인 오류 메시지만 반환
      // 상세 오류 정보는 서버 로그에만 기록
      return NextResponse.json(
        {
          error: 'AI 서비스 오류가 발생했습니다.',
          // details는 프로덕션에서 제거 (보안)
          ...(process.env.NODE_ENV === 'development' && {
            details: error.message,
          }),
        },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: '리포트 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
