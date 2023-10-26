import styled from 'styled-components';

export type LayoutWithTabbarContainerProps = {
	$padding?: string;
	$margin?: string;
};

export const LayoutWithTabbarContainer = styled.main<LayoutWithTabbarContainerProps>`
	padding: ${(props) => props.$padding}px;
	margin: ${(props) => props.$margin}px;
	padding-bottom: 20px; // 탭바 위 여백
	margin-bottom: 80px; // 탭바 높이
`;

LayoutWithTabbarContainer.defaultProps = {
	$padding: '0',
	$margin: '0',
};
