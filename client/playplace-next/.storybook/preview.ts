import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import GlobalStyles from '../src/styles/GlobalStyles';

const customViewports = {
	GalaxyS8Plus: {
		name: 'GalaxyS8Plus',
		styles: {
			width: '360px',
			height: '740px',
		},
	},
	GalaxyS20Ultra: {
		name: 'Galaxy S20 Ultra',
		styles: {
			width: '412px',
			height: '915px',
		},
	},
};

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: {
				...MINIMAL_VIEWPORTS,
				...customViewports,
			},
		},
	},
};

export const decorators = [
	withThemeFromJSXProvider({
		GlobalStyles,
	}),
];
export default preview;
