import React from 'react';
import { CircleSequenceStyles } from '@/types/styles.d';
import RoundPlay from '@root/public/assets/icons/RoundPlay.svg';
import HypeBoy from '@root/public/assets/images/hypeBoy.jpg';
import SongCircleItemsContainer, { SongCircleButton, CircleImage, SongInnerCircle } from './style';

interface ISongCircleItemsProps {
	imgSrc: string;
}

function SongCircleItems(props: ISongCircleItemsProps) {
	const { imgSrc } = props;

	const test = () => {
		alert('버튼');
	};

	return (
		<SongCircleItemsContainer>
			<CircleImage src={HypeBoy || imgSrc} alt="" />
			<SongInnerCircle $roundSequence={CircleSequenceStyles.one} />
			<SongInnerCircle $roundSequence={CircleSequenceStyles.two} />
			<SongInnerCircle $roundSequence={CircleSequenceStyles.three} />
			<SongInnerCircle $roundSequence={CircleSequenceStyles.four} />
			<SongCircleButton type="button" onClick={test}>
				<RoundPlay />
			</SongCircleButton>
		</SongCircleItemsContainer>
	);
}

export default SongCircleItems;
