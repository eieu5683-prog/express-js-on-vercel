import { NextRequest, NextResponse } from 'next/server';
import { generatePSST } from '@/src/utils/psst-generator';
import { PSSTGenerationRequest } from '@/src/types/psst';

/**
 * PSST 사업계획서 생성 API
 * POST /api/psst/generate
 */
export async function POST(request: NextRequest) {
  try {
    const body: PSSTGenerationRequest = await request.json();

    // 필수 필드 검증
    if (!body.userInput || !body.ksicCode || !body.industryName) {
      return NextResponse.json(
        {
          success: false,
          error: '필수 필드가 누락되었습니다. (userInput, ksicCode, industryName)',
        },
        { status: 400 }
      );
    }

    // PSST 생성
    const result = await generatePSST(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'PSST 생성에 실패했습니다.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      document: result.document,
    });
  } catch (error) {
    console.error('PSST 생성 API 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

