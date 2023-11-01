/** @type {import('next').NextConfig} */
const nextConfig = {
	serverRuntimeConfig: {
		googleLoginPath: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_PATH || '',
	},
	output: 'standalone',
	basePath: '/pp',
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['image.bugsm.co.kr'],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	images: {
		domains: ['i.ytimg.com', 'image.bugsm.co.kr'],
	},
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/',
	// 			destination: '/pp',
	// 			permanent: true,
	// 			basePath: false,
	// 		},
	// 	];
	// },
};

module.exports = nextConfig;
