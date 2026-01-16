'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { GRANT_SCHEDULE, GrantSchedule } from '@/src/data/scheduleData';
import { KSIC_DB, getKsicInfo } from '@/src/data/ksicData';
import DynamicSEO from '@/src/components/DynamicSEO';
import { motion, AnimatePresence } from 'framer-motion';

export default function TimelinePage() {
  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<GrantSchedule | null>(null);
  const [activeYear, setActiveYear] = useState(2026);
  const [userKsicCode, setUserKsicCode] = useState<string | null>(null);
  const [ksicInfo, setKsicInfo] = useState(getKsicInfo(''));

  // URL 파라미터 또는 로컬스토리지에서 업종코드 가져오기
  useEffect(() => {
    // URL 파라미터에서 업종코드 가져오기
    const codeFromUrl = searchParams.get('code');
    
    // 로컬스토리지에서 업종코드 가져오기 (진단 페이지에서 저장된 경우)
    const codeFromStorage = typeof window !== 'undefined' 
      ? localStorage.getItem('diagnosis_ksic_code') 
      : null;

    const ksicCode = codeFromUrl || codeFromStorage || null;
    
    if (ksicCode) {
      setUserKsicCode(ksicCode);
      const info = getKsicInfo(ksicCode);
      if (info) {
        setKsicInfo(info);
      }
    }
  }, [searchParams]);

  // 업종코드 기반 필터링: 사용자 등급에 맞는 일정만 표시
  const getFilteredSchedules = (schedules: GrantSchedule[]) => {
    if (!ksicInfo) return schedules; // 업종코드가 없으면 모든 일정 표시
    
    // 사용자 등급이 지원 가능한 일정만 필터링
    return schedules.filter((schedule) => 
      schedule.targetGrade.includes(ksicInfo.grade)
    );
  };

  // 연도별/월별 데이터 그룹화 (등급 필터링 적용)
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const items = getFilteredSchedules(
      GRANT_SCHEDULE.filter(
        (s) => s.year === activeYear && s.month === month
      )
    );
    return { month, items };
  }).filter((group) => group.items.length > 0);

  // 현재 날짜 기준 가장 가까운 일정 찾기
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // 전문가 솔루션 가져오기
  const getExpertSolution = (item: GrantSchedule): string => {
    if (ksicInfo && ksicInfo.solution) {
      return ksicInfo.solution;
    }
    // 업종코드가 없거나 솔루션이 없는 경우 기본 메시지
    return item.category === 'TAX' 
      ? '세무 일정에 맞춰 신고 및 납부를 준비하세요. 전문가 컨설팅을 통해 세금 절감 전략을 수립할 수 있습니다.'
      : '전문화된 전략이 필요한 사업입니다. 나랏돈네비의 맞춤형 진단을 통해 최적의 지원금 전략을 확인하세요.';
  };

  return (
    <>
      <DynamicSEO
        pageType="MAIN"
        customTitle={`${activeYear}년 월별 지원금 & 세무 타임라인`}
        customDescription={`${activeYear}년 사업자용 세금 캘린더와 정부 지원금 공고 일정을 한눈에 확인하세요. 놓치면 안 되는 주요 지원금 및 세무 일정을 타임라인으로 제공합니다.`}
        path="/timeline"
      />
      <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        {/* SEO용 헤더 */}
        <div className="p-6 bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-blue-400">
            {activeYear} 나랏돈네비 타임라인
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            놓치면 안 되는 주요 지원금 & 세무 일정
          </p>
        </div>

        <div className="max-w-2xl mx-auto p-4 mt-4">
          {/* 연도 선택 탭 */}
          <div className="flex gap-2 mb-8 bg-slate-900 p-1 rounded-xl">
            {[2026, 2027, 2028].map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeYear === year
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-500'
                }`}
              >
                {year}년
              </button>
            ))}
          </div>

          {/* 타임라인 시작 */}
          <div className="relative border-l-2 border-slate-800 ml-4 space-y-12">
            {monthlyData.map((group) => {
              const isCurrentMonth =
                activeYear === currentYear && group.month === currentMonth;
              const isPastMonth =
                activeYear === currentYear && group.month < currentMonth;
              const isUpcomingMonth =
                activeYear === currentYear && group.month > currentMonth;

              return (
                <div key={group.month} className="relative pl-8">
                  {/* 월 표시 배지 */}
                  <div className="absolute -left-[41px] top-0 w-20 h-20 flex flex-col items-center justify-center bg-slate-950">
                    <div
                      className={`text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ring-4 ring-slate-950 ${
                        isCurrentMonth
                          ? 'bg-green-600 animate-pulse'
                          : isPastMonth
                          ? 'bg-slate-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      {group.month}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">
                      MONTH
                    </span>
                  </div>

                  {/* 해당 월의 아이템들 */}
                  <div className="space-y-4">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="cursor-pointer"
                      >
                        <TimelineCard
                          item={item}
                          isHighlighted={isCurrentMonth}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 데이터가 없을 때 */}
          {monthlyData.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p>{activeYear}년 일정 데이터가 없습니다.</p>
            </div>
          )}

          {/* 규제 준수 문구 (2026년 1월 23일 시행 규정) */}
          <div className="mt-12 p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-[10px] text-slate-500 leading-relaxed text-center">
            본 일정 정보의 일부 요약은 나랏돈네비 AI 기술을 활용하여 작성되었습니다.{' '}
            <br />
            실제 공고일은 주관 기관의 사정에 따라 변경될 수 있으니 반드시 공식
            공고문을 확인하시기 바랍니다.
          </div>

          {/* 업종코드 기반 맞춤 안내 */}
          {ksicInfo && (
            <div className="mt-6 p-4 bg-blue-900/20 rounded-xl border border-blue-500/30">
              <p className="text-xs text-blue-300 font-bold mb-1">
                맞춤 진단 결과
              </p>
              <p className="text-sm text-slate-200">
                <strong>{ksicInfo.name}</strong> ({ksicInfo.code}) - {ksicInfo.grade}등급
              </p>
              <p className="text-xs text-slate-400 mt-1">
                위 일정은 사장님의 업종 등급에 맞춰 필터링되었습니다.
              </p>
            </div>
          )}
        </div>

        {/* 전문가 솔루션 팝업 (모달) */}
        <AnimatePresence>
          {selectedItem && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-blue-400">
                      전문가 시크릿 솔루션
                    </h3>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-slate-500 hover:text-white text-2xl transition-colors"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30">
                      <p className="text-xs text-blue-300 font-bold mb-1">
                        대상 사업
                      </p>
                      <p className="text-sm font-bold text-slate-100">
                        {selectedItem.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {selectedItem.year}년 {selectedItem.month}월 예정
                      </p>
                      {selectedItem.amount && (
                        <p className="text-xs text-blue-400 font-bold mt-2">
                          {selectedItem.amount}
                        </p>
                      )}
                    </div>

                    {ksicInfo && (
                      <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <p className="text-xs text-slate-400 mb-1">업종 정보</p>
                        <p className="text-sm text-slate-200">
                          {ksicInfo.name} ({ksicInfo.code}) - {ksicInfo.grade}등급
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-slate-500 font-bold mb-2 uppercase">
                        Core Strategy
                      </p>
                      <p className="text-slate-200 leading-relaxed text-sm whitespace-pre-line">
                        {getExpertSolution(selectedItem)}
                      </p>
                    </div>

                    {selectedItem.description && (
                      <div className="bg-slate-800/30 p-3 rounded-lg">
                        <p className="text-xs text-slate-400 mb-1">상세 정보</p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {selectedItem.description}
                        </p>
                      </div>
                    )}

                    {selectedItem.link && (
                      <a
                        href={selectedItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-xs text-blue-400 hover:text-blue-300 underline"
                      >
                        공식 공고문 확인하기 →
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-sm transition-colors"
                  >
                    확인 완료
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

// 개별 일정 카드 컴포넌트
function TimelineCard({
  item,
  isHighlighted = false,
}: {
  item: GrantSchedule;
  isHighlighted?: boolean;
}) {
  const isTax = item.category === 'TAX';

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={`p-4 rounded-2xl border ${
        isTax
          ? 'border-amber-500/30 bg-amber-500/5'
          : 'border-slate-800 bg-slate-900/50'
      } ${
        isHighlighted ? 'ring-2 ring-green-500/50' : ''
      } shadow-sm transition-all`}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
            isTax
              ? 'bg-amber-500 text-amber-950'
              : 'bg-blue-900/50 text-blue-300'
          }`}
        >
          {isTax ? '세무 일정' : '정부 지원금'}
        </span>
        <span className="text-[10px] text-slate-500">
          {item.month}월 예정
          {item.startDate && item.endDate && (
            <span className="ml-1">
              ({item.startDate} ~ {item.endDate})
            </span>
          )}
        </span>
      </div>
      <h4 className="font-bold text-sm text-slate-100 mb-1">{item.title}</h4>
      {item.amount && (
        <div className="text-xs font-bold text-blue-400 mb-1">{item.amount}</div>
      )}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
        {item.description}
      </p>
      {item.targetGrade && item.targetGrade.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {item.targetGrade.map((grade) => (
            <span
              key={grade}
              className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded"
            >
              {grade}등급
            </span>
          ))}
        </div>
      )}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[10px] text-blue-400 hover:text-blue-300 underline"
        >
          자세히 보기 →
        </a>
      )}
    </motion.div>
  );
}

