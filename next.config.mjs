/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ]
    },
    env: {
        BACKEND_API: process.env.BACKEND_API,
    },
};

export default nextConfig;
