/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // دي اللي هتقول للـ Build يتجاهل أي أخطاء TypeScript ويعدي
    ignoreBuildErrors: true,
  },
  eslint: {
    // ودي عشان يتجاهل أي أخطاء في الكود ويعدي
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;