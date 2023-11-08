import styled from 'styled-components';

interface MypageTemplateOverflowProps {
	$isMyMenuOpen: boolean;
}

interface MypageTemplateWrapperProps extends MypageTemplateOverflowProps {}

export const MypageTemplateOverflow = styled.div<MypageTemplateOverflowProps>`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${({ $isMyMenuOpen }) => ($isMyMenuOpen ? `100000` : '-1')};
	transition: 0.5s;

	.open {
		right: 0;
	}
	.close {
		right: -60vw;
	}
`;

export const MypageTemplateWrapper = styled.div<MypageTemplateWrapperProps>`
	background-color: var(--black-500);
	width: 60vw;
	height: 100vh;
	position: absolute;
	top: 0;
	right: -60vw;
	z-index: var(--zindex-mypage-content);
	transition: 0.5s;
`;

export const ConentContaner = styled.div`
	width: 100%;
	height: 100%;
	padding: 30px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const MypageHeader = styled.div`
	&:first-child {
		background-color: red;
	}
	&:last-child {
		background-color: blue;
	}
`;

export const BackgroundShadow = styled.div`
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	display: none;
	z-index: var(--zindex-mypage-background);
	background: var(--bg-black-alpa-75);
	transition: 1.5s;

	&.open {
		display: block;
	}
	&.close {
		display: none;
	}
`;
