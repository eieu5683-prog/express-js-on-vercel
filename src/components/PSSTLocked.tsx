'use client';

import { useState } from 'react';
import { KsicInfo } from '@/src/data/types';
import { PAYMENT_AMOUNT } from '@/src/lib/payment';
import TossPayment from './TossPayment';

interface PSSTLockedProps {
  ksicInfo: KsicInfo;
  onUnlock: () => void;
  userIdea?: string;
  userName?: string;
  userPhone?: string;
}

/**
 * PSST 잠금 해제 컴포넌트
 * 결제 전에 표시되는 잠금 화면
 */
export default function PSSTLocked({
  ksicInfo,
  onUnlock,
  userIdea = '',
  userName = '고객',
  userPhone,
}: PSSTLockedProps) {
  // 토스페이먼츠 결제는 결제 성공 후 리다이렉트되므로
  // onUnlock은 사용하지 않음 (결제 성공 페이지에서 처리)

  return (
    <div
      style={{
        padding: '3rem',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        border: '2px dashed #d1d5db',
        margin: '2rem 0',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
        PSST 사업계획서 초안 잠금
      </h2>
      <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.8' }}>
        <strong>{ksicInfo.name}</strong> 업종의 맞춤형 PSST 사업계획서 초안을 확인하려면
        <br />
        결제가 필요합니다.
      </p>

      <div
        style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          display: 'inline-block',
        }}
      >
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem' }}>
          {PAYMENT_AMOUNT.toLocaleString()}원
        </div>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>일회성 결제</div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <TossPayment
          userName={userName}
          userPhone={userPhone}
          ksicCode={ksicInfo.code}
          userIdea={userIdea}
        />
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#999' }}>
        <p>✅ 결제 후 즉시 PSST 초안 확인 가능</p>
        <p>✅ HWP 파일 다운로드 포함</p>
        <p>✅ 2026년 AI 표기법 규정 준수</p>
      </div>
    </div>
  );
}

