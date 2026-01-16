'use client';

import { useState } from 'react';
import { PSSTGenerationRequest, PSSTDocument } from '@/src/types/psst';
import PSSTViewer from './PSSTViewer';

/**
 * PSST 사업계획서 생성 컴포넌트
 * 사용자 입력을 받아 PSST 문서를 생성하고 표시합니다.
 */
export default function PSSTGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [document, setDocument] = useState<PSSTDocument | null>(null);
  
  const [formData, setFormData] = useState<PSSTGenerationRequest>({
    userInput: '',
    ksicCode: '',
    industryName: '',
    excelExpertSolution: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // OpenAI API를 사용한 PSST 생성
      const response = await fetch('/api/generate-psst', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ksicCode: formData.ksicCode,
          userIdea: formData.userInput,
          additionalKeywords: '', // 추가 키워드 (선택사항)
          scoreFactors: '디지털 전환, 지역경제 활성화, ESG 경영', // 가점 요소
          differentiationPoint: '', // 핵심 차별 포인트 (선택사항)
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'PSST 생성에 실패했습니다.');
      }

      // OpenAI API 응답을 PSSTDocument 형식으로 변환
      if (result.data) {
        // 리포트 페이지로 리다이렉트
        const params = new URLSearchParams({
          code: formData.ksicCode,
          idea: formData.userInput,
        });
        window.location.href = `/report/view?${params.toString()}`;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof PSSTGenerationRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (document) {
    return (
      <div>
        <button
          onClick={() => setDocument(null)}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ← 새로 작성하기
        </button>
        <PSSTViewer document={document} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>PSST 사업계획서 생성</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            사용자 아이디어 *
          </label>
          <textarea
            value={formData.userInput}
            onChange={(e) => handleChange('userInput', e.target.value)}
            required
            rows={5}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
            placeholder="사업 아이디어를 입력하세요..."
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            업종코드 (KSIC) *
          </label>
          <input
            type="text"
            value={formData.ksicCode}
            onChange={(e) => handleChange('ksicCode', e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
            placeholder="예: 55101"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            업종명 *
          </label>
          <input
            type="text"
            value={formData.industryName}
            onChange={(e) => handleChange('industryName', e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
            placeholder="예: 숙박업"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            전문가 시크릿 솔루션 (선택사항)
          </label>
          <textarea
            value={formData.excelExpertSolution || ''}
            onChange={(e) => handleChange('excelExpertSolution', e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
            placeholder="Excel 데이터 또는 전문가 솔루션을 입력하세요..."
          />
        </div>

        {error && (
          <div style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            borderRadius: '4px',
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: loading ? '#ccc' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '생성 중...' : 'PSST 사업계획서 생성'}
        </button>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>PSST 구조 안내</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
          <li><strong>P (Problem):</strong> 시장의 문제점 및 해결의 시급성</li>
          <li><strong>S (Solution):</strong> 제안하는 서비스/제품의 구체적인 해결 방법과 차별성</li>
          <li><strong>S (Scale-up):</strong> 수익 모델(BM) 및 시장 진입/확장 전략</li>
          <li><strong>T (Team):</strong> 대표자 및 팀원의 역량, 네트워크</li>
        </ul>
      </div>
    </div>
  );
}

