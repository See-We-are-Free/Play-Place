import styled, { keyframes } from 'styled-components';

interface SongMarkerContainerProps {
	$bottom: number;
	$left: number;
}

const fadeInAndDrop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px) translateX(-28px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(-28px);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0) translateX(-28px);
  }
  50% {
    transform: translateY(-4px) translateX(-28px);
  }
`;

export const SongMarkerListItemContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

export const SongMarkerButton = styled.button<SongMarkerContainerProps>`
	position: absolute;
	bottom: ${({ $bottom }) => $bottom}%;
	left: ${({ $left }) => $left}%;
	transform: translateX(-28px);
	z-index: 1;
	text-align: center;
	animation:
		${fadeInAndDrop} 0.5s ease-out,
		${floatAnimation} 2.5s ease-in-out infinite;

	&:focus {
		outline: none;
	}

	& > p {
		width: 100%;
	}
`;

export const SongMarkerContainer = styled.div``;

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

export const BottomContent = styled.div`
	margin-bottom: 20px;
	position: relative;
`;

export const BottomSheetImageWrapper = styled.div`
	width: 10%;
	height: 10%;
	aspect-ratio: 1/1;

	img {
		width: 100%;
		height: 100%;
	}
`;
