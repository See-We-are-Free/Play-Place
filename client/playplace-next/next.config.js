/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	basePath: '/pp',
	compiler: {
		styledComponents: true,
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
