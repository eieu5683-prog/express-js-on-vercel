'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
  content: string;
  className?: string;
}

/**
 * 리포트 전체 복사 버튼 컴포넌트
 * AI가 생성한 PSST 리포트 본문을 한 번에 복사하여 한글(HWP) 문서에 붙여넣을 수 있게 해주는 기능
 */
export default function CopyButton({
  content,
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) {
      alert('복사할 내용이 없습니다.');
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      // 2초 후 문구 복구
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // 클립보드 API가 지원되지 않는 경우 대체 방법
      try {
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        alert('복사에 실패했습니다. 내용을 직접 드래그해서 복사해주세요.');
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full font-bold shadow-2xl transition-all z-30 ${
        copied
          ? 'bg-green-600 text-white'
          : 'bg-white text-slate-900 hover:scale-105'
      } ${className}`}
    >
      {copied
        ? '✅ 복사 완료! 한글(HWP)에 붙여넣으세요'
        : '📋 리포트 내용 전체 복사하기'}
    </button>
  );
}

