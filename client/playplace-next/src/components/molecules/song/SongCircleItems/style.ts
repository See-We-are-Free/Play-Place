import { CircleSequenceStyles } from '@/types/styles.d';
import Image from 'next/image';
import styled, { css } from 'styled-components';

interface ISongCircleStyleProps {
	$roundSequence: CircleSequenceStyles;
}

const SongCircleItemsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;
	border: 2px solid transparent;
	background-image: linear-gradient(#222222, #222222), linear-gradient(90deg, #feac5e 0%, #c779d0 25.52%, #4bc0c8 100%);
	background-origin: border-box;
	background-clip: content-box, border-box;
	border-radius: 70%;
	position: relative;
	margin: 10px 0;
`;

export const CircleImage = styled(Image)`
	width: 90%;
	height: 90%;
	border-radius: 70%;
`;

const RoundTypes = {
	one: css`
		width: 30%;
		height: 30%;
	`,
	two: css`
		width: 20%;
		height: 20%;
	`,
	three: css`
		width: 18%;
		height: 18%;
		border: none;
		background-color: var(--black-500);
	`,
	four: css`
		width: 16%;
		height: 16%;
		border: 1px solid transparent;
		background-image: linear-gradient(#222222, #222222),
			linear-gradient(90deg, #feac5e 0%, #c779d0 25.52%, #4bc0c8 100%);
		background-origin: border-box;
		background-clip: content-box, border-box;
	`,
};

export const SongInnerCircle = styled.div<ISongCircleStyleProps>`
	position: absolute;
	border: 0.3px solid var(--black-500);
	border-radius: 70%;
	${({ $roundSequence }) => RoundTypes[$roundSequence]};
`;

export const SongCircleButton = styled.button`
	position: absolute;
	border: none;
	border-radius: 70%;
	display: flex;
	justify-content: center;
	align-items: center;

	svg {
		width: 16%;
		height: 16%;
	}
`;

export default SongCircleItemsContainer;
