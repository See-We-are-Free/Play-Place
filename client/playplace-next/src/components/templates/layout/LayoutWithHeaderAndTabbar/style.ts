import styled from 'styled-components';

export type LayoutWithHeaderAndTabbarContainerProps = {
	$padding?: string;
	$margin?: string;
};

export const LayoutWithHeaderAndTabbarContainer = styled.main<LayoutWithHeaderAndTabbarContainerProps>`
	padding: ${(props) => props.$padding}px;
	margin: ${(props) => props.$margin}px;
	padding-top: 60px; // 헤더 높이 + 여백 10px
	padding-bottom: 20px; // 탭바 위 여백
	margin-bottom: 80px; // 탭바 높이
`;

LayoutWithHeaderAndTabbarContainer.defaultProps = {
	$padding: '0',
	$margin: '0',
};
