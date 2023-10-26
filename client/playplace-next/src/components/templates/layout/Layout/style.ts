import styled from 'styled-components';

export type LayoutContainerProps = {
	$padding?: string;
	$margin?: string;
	$background?: string;
};

export const LayoutContainer = styled.main<LayoutContainerProps>`
	padding: ${(props) => props.$padding}px;
	margin: ${(props) => props.$margin}px;
	background: ${(props) => `var(${props.$background})`};
`;

LayoutContainer.defaultProps = {
	$padding: '0',
	$margin: '0',
	$background: '--black-700',
};
