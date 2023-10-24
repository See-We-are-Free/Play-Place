/** @type {import('next').NextConfig} */
const nextConfig = {
    output : 'standalone',
    basePath: '/pp',
    compiler: {
        styledComponents: true,
    }
}

module.exports = nextConfig
