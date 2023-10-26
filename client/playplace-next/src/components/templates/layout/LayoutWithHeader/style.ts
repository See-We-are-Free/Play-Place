import styled from 'styled-components';

export type LayoutWithHeaderContainerProps = {
	$padding?: string;
	$margin?: string;
};

export const LayoutWithHeaderContainer = styled.main<LayoutWithHeaderContainerProps>`
	padding: ${(props) => props.$padding}px;
	margin: ${(props) => props.$margin}px;
	padding-top: 60px; // 헤더 높이 + 여백 10px
	padding-bottom: 20px; // 콘텐츠 아래 여백
`;

LayoutWithHeaderContainer.defaultProps = {
	$padding: '0',
	$margin: '0',
};
