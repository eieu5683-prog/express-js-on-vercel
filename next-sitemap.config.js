/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://narat-don-navi.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap-index.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://narat-don-navi.com/server-sitemap-index.xml',
    ],
  },
  // 동적 경로 포함
  additionalPaths: async (config) => {
    const result = [];

    // 세금 일정 페이지 (2026-2030)
    for (let year = 2026; year <= 2030; year++) {
      result.push({
        loc: `/tax-schedule/${year}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }

    // 업종별 진단 페이지 (예시)
    const industries = [
      '숙박업',
      '음식점업',
      '소매업',
      '서비스업',
      '제조업',
    ];
    industries.forEach((industry) => {
      result.push({
        loc: `/diagnosis?industry=${encodeURIComponent(industry)}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },
};

