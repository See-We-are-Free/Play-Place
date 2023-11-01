import React from 'react';
import { AlbumSequenceStyles } from '@/types/styles.d';
import RoundPlay from '@root/public/assets/icons/RoundPlay.svg';
import HypeBoy from '@root/public/assets/images/hypeBoy.jpg';
import HomeAlbumItemsContainer, { AlbumButton, AlbumImage, AlbumInnerRound } from './style';

interface HomeAlbumItemsProps {
	imgSrc: string;
}

function HomeAlbumItems(props: HomeAlbumItemsProps) {
	const { imgSrc } = props;

	const test = () => {
		alert('버튼');
	};
	console.log(imgSrc);

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
