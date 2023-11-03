import { ContentLayoutSizes } from '@/types/styles.d';
import styled, { css } from 'styled-components';

interface ContentLayoutWrapperProps {
	size?: ContentLayoutSizes;
	$padding?: string;
	$margin?: string;
	$background?: string;
	$border?: string;
	$borderRadius: number;
	$width?: string;
	$height?: string;
}

export const Sizes = {
	sm: css`
		padding: 0 30px;
	`,
	md: css`
		padding: 0 20px;
	`,
	lg: css`
		padding: 0 10px;
	`,
	full: css`
		padding: 0;
	`,
};

export const ContentLayoutWrapper = styled.div<ContentLayoutWrapperProps>`
	${({ size }) => (size ? Sizes[size] : Sizes.full)};
	padding: ${({ $padding }) => $padding && $padding};
	margin: ${({ $margin }) => $margin};
	background: ${({ $background }) => $background !== 'transparent' && `var(${$background})`};
	border: ${({ $border }) => $border};
	border-radius: ${({ $borderRadius }) => $borderRadius}px;
	width: ${({ $width }) => $width};
	height: ${({ $height }) => $height};
`;
