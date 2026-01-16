/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 이미지 최적화 설정
  images: {
    domains: ['narat-don-navi.vercel.app', 'narat-don-navi.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // 프로덕션 최적화
  compress: true,
  poweredByHeader: false,
  
  // 환경 변수 검증
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://narat-don-navi.vercel.app',
    SITE_URL: process.env.SITE_URL || 'https://narat-don-navi.vercel.app',
  },
}

module.exports = nextConfig

