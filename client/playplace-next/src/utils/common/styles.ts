import { theme } from '@/themes';
import { Responsive } from '@/types/styles';

// Theme의 타입
export type AppTheme = typeof theme;

type SpaceThemeKeys = keyof typeof theme.space;
type ColorThemeKeys = keyof typeof theme.colors;
type FontSizeThemeKeys = keyof typeof theme.fontSizes;

// 각 Theme의 키의 타입
export type Space = SpaceThemeKeys | (string & {});
export type Color = ColorThemeKeys | (string & {});
export type FontSize = FontSizeThemeKeys | (string & {});

/**
 * Responsive 타입을 CSS 속성과 그 값으로 변환
 * @param propKey CSS 속성
 * @param prop Responsive 타입
 * @param theme AppTheme
 * @returns CSS 속성과 그 값(ex. background-color: white;)
 */
export function toPropValue<T>(propKey: string, prop?: Responsive<T>, theme?: AppTheme) {
	if (prop === undefined) return undefined;
	console.log('toPropValue', `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`);

	return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`;
}

const SPACE_KEYS = new Set([
	'margin',
	'margin-top',
	'margin-left',
	'margin-bottom',
	'margin-right',
	'padding',
	'padding-top',
	'padding-left',
	'padding-bottom',
	'padding-right',
]);
const COLOR_KEYS = new Set(['color', 'background-color']);
const FONT_SIZE_KEYS = new Set(['font-size']);

/**
 * Theme에 지정된 CSS 속성값으로 변환
 * @param propKey CSS 속성
 * @param value CSS 속성값
 * @param theme AppTheme
 * @returns CSS 속성값
 */
function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
	console.log('toThemeValueIfNeeded', propKey, value, theme);
	if (theme && theme.space && SPACE_KEYS.has(propKey) && isSpaceThemeKeys(value, theme)) {
		return theme.space[value];
	} else if (theme && theme.colors && COLOR_KEYS.has(propKey) && isColorThemeKeys(value, theme)) {
		return theme.colors[value];
	} else if (theme && theme.fontSizes && FONT_SIZE_KEYS.has(propKey) && isFontSizeThemeKeys(value, theme)) {
		return theme.fontSizes[value];
	}

	return value;
}

function isSpaceThemeKeys(prop: any, theme: AppTheme): prop is SpaceThemeKeys {
	return Object.keys(theme.space).filter((key) => key == prop).length > 0;
}

function isColorThemeKeys(prop: any, theme: AppTheme): prop is ColorThemeKeys {
	return Object.keys(theme.colors).filter((key) => key == prop).length > 0;
}

function isFontSizeThemeKeys(prop: any, theme: AppTheme): prop is FontSizeThemeKeys {
	return Object.keys(theme.fontSizes).filter((key) => key == prop).length > 0;
}
