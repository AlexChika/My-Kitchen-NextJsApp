/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["www.themealdb.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
