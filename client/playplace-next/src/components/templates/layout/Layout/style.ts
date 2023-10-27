import styled from 'styled-components';

export type LayoutContainerProps = {
	$padding?: string;
	$margin?: string;
	$background?: string;
};

export const LayoutContainer = styled.main<LayoutContainerProps>`
	padding: ${(props) => props.$padding || 0}px;
	margin: ${(props) => props.$margin || 0}px;
	background: ${(props) => `var(${props.$background})` || `var(--black-700)`};
`;
