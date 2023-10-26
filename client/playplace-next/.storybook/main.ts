import type { StorybookConfig } from '@storybook/nextjs';

const path = require('path');

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
		'@storybook/addon-styling',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config) => {
		if (config.resolve?.alias) {
			config.resolve.alias['@'] = path.resolve(__dirname, '../src/');
		}
		return config;
	},
};
export default config;
