// استيراد الحزمة next-pwa
import withPWA from 'next-pwa';

// تطبيق إعدادات PWA
const pwaConfig = withPWA({
  pwa: {
    dest: 'public',  // مجلد الـ public الذي سيتم تخزين ملفات PWA فيه
    disable: process.env.NODE_ENV === 'development',  // تعطيل في بيئة التطوير
  }
});

// إعدادات Next.js الأساسية
const baseConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  }
};

// دمج الإعدادات مع بعضها
const nextConfig = {
  ...baseConfig,
  ...pwaConfig
};

export default nextConfig;
