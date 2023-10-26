/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	basePath: '/pp',
	compiler: {
		styledComponents: true,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
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
