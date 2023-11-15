import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import SongSquareItemsContainer from './style';

interface ISongSquareItemsProps {
	imgSrc: string;
}

function SongSquareItems(props: ISongSquareItemsProps) {
	const { imgSrc } = props;

	return (
		<SongSquareItemsContainer>
			<SongThumbnail src={imgSrc || ''} $isFullSize />
			{/* <SongThumbnail src={HypeBoy} $height={180} $width={130} /> */}
		</SongSquareItemsContainer>
	);
}

export default SongSquareItems;
