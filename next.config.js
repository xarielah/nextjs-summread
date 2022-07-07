/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        LOCAL: 'http://localhost:3000',
        PROD: 'https://nextjs-summread.vercel.app',
        NEXTAUTH_SECRET: '4CA7E2EAF98ED497E0DBF2014CE870957E4122050659D964F98EF56B58199D75'
    }
};

module.exports = nextConfig;
