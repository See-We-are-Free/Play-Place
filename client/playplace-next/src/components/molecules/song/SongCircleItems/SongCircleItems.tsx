import React from 'react';
import { CircleSequenceStyles } from '@/types/styles.d';
import RoundPlay from '@root/public/assets/icons/RoundPlay.svg';
import DefaultThumbnail from '@root/public/assets/images/thumbnail.png';
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
			<CircleImage
				src={imgSrc || DefaultThumbnail}
				alt="앨범 커버"
				width="100"
				placeholder="blur"
				blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+x8AAr8B3gzOjaQAAAAASUVORK5CYII="
				height="100"
			/>
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
