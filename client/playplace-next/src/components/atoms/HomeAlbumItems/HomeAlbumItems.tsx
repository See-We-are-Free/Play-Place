import React from 'react';
import { AlbumSequenceStyles } from '@/types/styles.d';
import HypeBoy from '@root/public/assets/images/hypeBoy.jpg';
import HomeAlbumItemsContainer, { AlbumImage, AlbumInnerRound } from './style';

interface HomeAlbumItemsProps {
	imgSrc: string;
}

function HomeAlbumItems(props: HomeAlbumItemsProps) {
	const { imgSrc } = props;

	return (
		<HomeAlbumItemsContainer>
			<p>{imgSrc}</p>
			<AlbumImage src={HypeBoy} alt="" />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.one} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.two} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.three} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.four} />
		</HomeAlbumItemsContainer>
	);
}

export default HomeAlbumItems;
