import React from 'react';
import { AlbumSequenceStyles } from '@/types/styles.d';
import { StaticImageData } from 'next/image';
import HomeAlbumItemsContainer, { AlbumImage, AlbumInnerRound } from './style';

interface HomeAlbumItemsProps {
	imgSrc: StaticImageData;
}

function HomeAlbumItems(props: HomeAlbumItemsProps) {
	const { imgSrc } = props;

	return (
		<HomeAlbumItemsContainer>
			<AlbumImage src={imgSrc} alt="" />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.one} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.two} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.three} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.four} />
		</HomeAlbumItemsContainer>
	);
}

export default HomeAlbumItems;
