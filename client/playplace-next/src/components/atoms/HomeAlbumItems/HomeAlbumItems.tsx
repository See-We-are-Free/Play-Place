import React from 'react';
import { AlbumSequenceStyles } from '@/types/styles.d';
import HypeBoy from '@root/public/assets/images/hypeBoy.jpg';
import RoundPlay from '@root/public/assets/icons/RoundPlay.svg';
import HomeAlbumItemsContainer, { AlbumButton, AlbumImage, AlbumInnerRound } from './style';

interface HomeAlbumItemsProps {
	imgSrc: string;
}

function HomeAlbumItems(props: HomeAlbumItemsProps) {
	const { imgSrc } = props;

	console.log(imgSrc);
	const test = () => {
		alert('버튼');
	};

	return (
		<HomeAlbumItemsContainer>
			<AlbumImage src={HypeBoy} alt="" />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.one} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.two} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.three} />
			<AlbumInnerRound $roundSequence={AlbumSequenceStyles.four} />
			<AlbumButton type="button" onClick={test}>
				<RoundPlay />
			</AlbumButton>
		</HomeAlbumItemsContainer>
	);
}

export default HomeAlbumItems;
