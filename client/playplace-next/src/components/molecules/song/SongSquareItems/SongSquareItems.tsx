import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import SongSquareItemsContainer from './style';

interface ISongSquareItemsProps {
	imgSrc: string;
	onClick: () => void;
}

function SongSquareItems(props: ISongSquareItemsProps) {
	const { imgSrc, onClick } = props;
	console.log(imgSrc);
	return (
		<SongSquareItemsContainer onClick={onClick}>
			<SongThumbnail src="" $height={130} $width={130} />
			{/* <SongThumbnail src={HypeBoy} $height={180} $width={130} /> */}
		</SongSquareItemsContainer>
	);
}

export default SongSquareItems;
