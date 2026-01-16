import { NextRequest, NextResponse } from 'next/server';
import { PSSTDocument } from '@/src/types/psst';

/**
 * HWP 파일 생성 API (Python 백엔드 프록시)
 * POST /api/hwp/generate
 */
export async function POST(request: NextRequest) {
  try {
    const body: { document: PSSTDocument } = await request.json();

    if (!body.document) {
      return NextResponse.json(
        { success: false, error: 'PSST 문서가 필요합니다.' },
        { status: 400 }
      );
    }

    // Python 백엔드 API URL
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
    const pythonApiEndpoint = `${pythonApiUrl}/api/generate-hwp`;

    // Python 백엔드에 요청 전달
    const response = await fetch(pythonApiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        problem: body.document.problem,
        solution: body.document.solution,
        scale_up: body.document.scaleUp,
        team: body.document.team,
        metadata: body.document.metadata,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Python API 오류: ${errorText}`);
    }

    // HWP 파일을 Blob으로 변환
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 파일명 생성
    const industryName = body.document.metadata.industryName || '사업계획서';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `PSST_${industryName}_${timestamp}.hwp`;

    // 파일 응답 반환
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/x-hwp',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      },
    });
  } catch (error) {
    console.error('HWP 생성 API 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

