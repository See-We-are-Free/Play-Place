import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import SongRectItemsContainer, { SongAlpaBackground } from './style';

interface ISongRectItemsProps {
	imgSrc: string;
}

function SongRectItems(props: ISongRectItemsProps) {
	const { imgSrc } = props;

	return (
		<>
			<SongRectItemsContainer>
				{/* <SongThumbnail src={HypeBoy} $height={180} $width={130} /> */}
				<SongThumbnail src={imgSrc || ''} $isFullSize />
			</SongRectItemsContainer>
			<SongAlpaBackground />
		</>
	);
}

export default SongRectItems;
