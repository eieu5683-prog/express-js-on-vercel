'use client';

import { useState } from 'react';
import { PSSTDocument } from '@/src/types/psst';

interface PSSTViewerProps {
  document: PSSTDocument;
}

/**
 * PSST 사업계획서 뷰어 컴포넌트
 * PSST 구조에 맞춰 사업계획서를 표시합니다.
 */
export default function PSSTViewer({ document: psstDocument }: PSSTViewerProps) {
  const { problem, solution, scaleUp, team, metadata } = psstDocument;
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownloadHWP = async () => {
    setDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch('/api/hwp/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ document: psstDocument }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'HWP 파일 생성에 실패했습니다.');
      }

      // Blob으로 변환하여 다운로드
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Content-Disposition 헤더에서 파일명 추출
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `PSST_${metadata.industryName || '사업계획서'}.hwp`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+?)"?$/);
        if (filenameMatch) {
          filename = decodeURIComponent(filenameMatch[1]);
        }
      }
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : '다운로드 중 오류가 발생했습니다.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* 헤더 */}
      <header style={{ marginBottom: '3rem', borderBottom: '2px solid #333', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>PSST 사업계획서</h1>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              <p><strong>업종:</strong> {metadata.industryName} ({metadata.industryCode})</p>
              <p><strong>생성일:</strong> {new Date(metadata.createdAt).toLocaleDateString('ko-KR')}</p>
            </div>
          </div>
          <button
            onClick={handleDownloadHWP}
            disabled={downloading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: downloading ? '#ccc' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: downloading ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {downloading ? '생성 중...' : '📄 HWP 다운로드'}
          </button>
        </div>
        {downloadError && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            borderRadius: '4px',
            fontSize: '0.9rem',
          }}>
            {downloadError}
          </div>
        )}
      </header>

      {/* 1. Problem */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2563eb' }}>
          1. {problem.title}
        </h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>시장의 문제점</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            {problem.marketIssues.map((issue, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{issue}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>사회적 이유</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            {problem.socialReasons.map((reason, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{reason}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>경제적 이유</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            {problem.economicReasons.map((reason, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{reason}</li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>해결의 시급성</h3>
          <p>{problem.urgency}</p>
        </div>
      </section>

      {/* 2. Solution */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2563eb' }}>
          2. {solution.title}
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>핵심 기술</h3>
          <p style={{ lineHeight: '1.8' }}>{solution.coreTechnology}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>주요 기능</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            {solution.keyFeatures.map((feature, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{feature}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>경쟁사 대비 차별화 포인트</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            {solution.differentiation.map((point, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{point}</li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#dbeafe', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>경쟁 우위</h3>
          <p>{solution.competitiveAdvantage}</p>
        </div>
      </section>

      {/* 3. Scale-up */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2563eb' }}>
          3. {scaleUp.title}
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>수익 창출 방안</h3>
          <p style={{ lineHeight: '1.8' }}>{scaleUp.revenueModel}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>수익원</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            {scaleUp.revenueStreams.map((stream, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{stream}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>시장 진입 전략</h3>
          <p style={{ lineHeight: '1.8' }}>{scaleUp.marketEntryStrategy}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>확장 계획</h3>
          <p style={{ lineHeight: '1.8' }}>{scaleUp.expansionPlan}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>3년 내 시장 점유율 목표</h3>
          <p style={{ lineHeight: '1.8' }}>{scaleUp.marketShareGoal}</p>
        </div>

        <div style={{ backgroundColor: '#f3e8ff', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>주요 마일스톤</h3>
          <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
            {scaleUp.milestones.map((milestone, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: 'white', borderRadius: '4px' }}>
                <strong>{milestone.year}년 {milestone.quarter}분기:</strong> {milestone.goal} ({milestone.metric})
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Team */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2563eb' }}>
          4. {team.title}
        </h2>

        <div style={{ marginBottom: '1.5rem', backgroundColor: '#ecfdf5', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>대표자 (CEO)</h3>
          <p><strong>이름:</strong> {team.ceo.name}</p>
          <p><strong>역할:</strong> {team.ceo.role}</p>
          <p><strong>전문 분야:</strong> {team.ceo.expertise.join(', ')}</p>
          <p><strong>경력:</strong> {team.ceo.experience}</p>
          {team.ceo.education && <p><strong>학력:</strong> {team.ceo.education}</p>}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>핵심 팀원</h3>
          {team.coreTeam.map((member, idx) => (
            <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{member.name} ({member.role})</h4>
              <p><strong>전문 분야:</strong> {member.expertise.join(', ')}</p>
              <p><strong>경력:</strong> {member.experience}</p>
              {member.education && <p><strong>학력:</strong> {member.education}</p>}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>네트워크 및 파트너십</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            {team.network.map((n, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{n}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>팀 역량</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
            {team.capabilities.map((cap, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{cap}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI 표기법 준수 문구 */}
      <section style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px', borderTop: '2px solid #333' }}>
        <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
          <strong>본 초안은 나랏돈네비 AI 기술을 활용하여 작성되었습니다.</strong>
        </p>
        <p style={{ fontSize: '0.8rem', color: '#999', textAlign: 'center', marginTop: '0.5rem' }}>
          (2026년 1월 23일부터 시행되는 AI 생성 콘텐츠 표기 의무화 규정 준수)
        </p>
      </section>
    </div>
  );
}

