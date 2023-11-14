import styled from 'styled-components';

interface MypageViewOverflowProps {
	$isMyMenuOpen: boolean;
}

interface MypageViewWrapperProps extends MypageViewOverflowProps {}

export const MypageViewOverflow = styled.div<MypageViewOverflowProps>`
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

export const MypageViewWrapper = styled.div<MypageViewWrapperProps>`
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
	width: 100%;
	border-bottom: 0.3px solid var(--white-800);
`;

export const Greeting = styled.div`
	& > div:first-child {
		font-size: 16px;
		color: var(--white-100);
	}
	& > div:last-child {
		font-size: 14px;
		color: var(--white-500);
	}
`;

export const Profile = styled.button`
	width: 100%;
	margin: 20px 4px 14px;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 6px;

	img {
		width: 30px;
		height: 30px;
	}

	& > div {
		font-size: 14px;
		text-align: left;
	}

	svg {
		width: 14px;
		height: 14px;
		fill: var(--white-500);
	}
`;

export const MypageBody = styled.div`
	padding: 20px 4px 0;

	ul {
		display: flex;
		flex-direction: column;
		gap: 16px;

		li {
			button {
				font-size: 14px;
				display: flex;
				flex-direction: row;
				gap: 10px;

				svg {
					height: 24px;
					fill: var(--white-300);
				}

				& > div {
					font-size: 16px;
				}
			}
		}
	}
`;

export const MypageFooter = styled.div`
	position: absolute;
	left: 50%;
	bottom: 20px;
	transform: translateX(-50%);
	font-size: 10px;
	color: var(--white-600);
	text-wrap: nowrap;
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
