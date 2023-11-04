import styled from 'styled-components';

interface SongMarkerContainerProps {
	$bottom: number;
	$left: number;
}

export const SongMarkerListItemContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	button {
		position: relative;
		width: 100%;
		height: 100%;
	}
`;

export const SongMarkerContainer = styled.div<SongMarkerContainerProps>`
	position: absolute;
	bottom: ${({ $bottom }) => $bottom}%; // 랜덤으로 변경될 값 (0 ~ 100%)
	left: ${({ $left }) => $left}%; // 랜덤으로 변경될 값 (0 ~ 100%)
	transform: translateX(-28px);
	z-index: 1; // 변수로 만들기
	text-align: center;
`;

export const ImageWrapper = styled.div`
	width: 50px;
	height: 50px;
	position: absolute;
	top: 4px;
	left: 50%;
	transform: translateX(-51%);

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
`;
