import React from 'react';
import thumbnail from '@root/public/assets/images/thumbnail.png';
import SongThumbnailWrapper, { SongThumbnailImage } from './style';

interface ISongThumbnailProps {
	src: string;
	alt?: string;
	$width?: number;
	$height?: number;
}
function SongThumbnail(props: ISongThumbnailProps) {
	const { src, alt = '', $width = 45, $height = 45 } = props;

	return (
		<SongThumbnailWrapper $width={$width} $height={$height}>
			<SongThumbnailImage src={src || thumbnail} alt={alt} width={$width} height={$height} />
		</SongThumbnailWrapper>
	);
}

export default SongThumbnail;
