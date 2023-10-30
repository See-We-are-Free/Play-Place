import styled from 'styled-components';

export type LayoutWithTabbarContainerProps = {
	$padding?: string;
	$margin?: string;
};

export const LayoutWithTabbarContainer = styled.main<LayoutWithTabbarContainerProps>`
	padding: ${(props) => props.$padding || '0'}px;
	margin: ${(props) => props.$margin || '0'}px;
	padding-bottom: 20px; // 탭바 위 여백
	margin-bottom: 140px; // 탭바 + 플레이바 높이
`;
