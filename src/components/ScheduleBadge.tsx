'use client';

import { GrantSchedule } from '@/src/data/types';
import { getAvailableScheduleCount } from '@/src/data/scheduleData';
import { Grade } from '@/src/data/types';

interface ScheduleBadgeProps {
  grade: Grade;
  year?: number;
}

/**
 * 지원 가능한 공고 개수를 표시하는 배지 컴포넌트
 * SEO 및 사용자 경험 개선용
 */
export default function ScheduleBadge({ grade, year = 2026 }: ScheduleBadgeProps) {
  const count = getAvailableScheduleCount(grade, year);

  if (count === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginTop: '1rem',
      }}
    >
      <span style={{ marginRight: '0.5rem' }}>📅</span>
      <span>
        사장님의 업종코드로 지원 가능한 {year}년 공고가 <strong>{count}개</strong> 있습니다
      </span>
    </div>
  );
}

interface ScheduleListProps {
  schedules: GrantSchedule[];
  showDescription?: boolean;
}

/**
 * 일정 목록을 표시하는 컴포넌트
 */
export function ScheduleList({ schedules, showDescription = false }: ScheduleListProps) {
  if (schedules.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        해당하는 일정이 없습니다.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          style={{
            padding: '1.5rem',
            backgroundColor: schedule.category === 'GRANT' ? '#f0f9ff' : '#fef3c7',
            borderRadius: '8px',
            border: `2px solid ${schedule.category === 'GRANT' ? '#3b82f6' : '#f59e0b'}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {schedule.title}
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>
                {schedule.year}년 {schedule.month}월
                {schedule.startDate && schedule.endDate && (
                  <span> ({schedule.startDate} ~ {schedule.endDate})</span>
                )}
              </div>
            </div>
            <div
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: schedule.category === 'GRANT' ? '#3b82f6' : '#f59e0b',
                color: 'white',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}
            >
              {schedule.category === 'GRANT' ? '지원금' : '세무'}
            </div>
          </div>

          {schedule.amount && (
            <div style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 'bold', color: '#2563eb' }}>
              {schedule.amount}
            </div>
          )}

          {showDescription && (
            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                backgroundColor: 'white',
                borderRadius: '4px',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-line',
              }}
            >
              {schedule.description}
            </div>
          )}

          <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#666' }}>
            지원 가능 등급: {schedule.targetGrade.join(', ')}
          </div>

          {schedule.link && (
            <a
              href={schedule.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '0.75rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '0.9rem',
              }}
            >
              자세히 보기 →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

