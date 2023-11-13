import React from 'react';
import thumbnail from '@root/public/assets/images/thumbnail.png';
import SongThumbnailWrapper, { SongThumbnailImage } from './style';

interface ISongThumbnailProps {
	src: string;
	alt?: string;
	$width?: number;
	$height?: number;
	$isFullSize?: boolean;
}
function SongThumbnail(props: ISongThumbnailProps) {
	const { src, alt = '', $width = 45, $height = 45, $isFullSize = false } = props;

	return (
		<SongThumbnailWrapper $width={$width} $height={$height} $isFullSize={$isFullSize}>
			<SongThumbnailImage
				src={src || thumbnail}
				alt={alt}
				width={$width}
				height={$height}
				placeholder="blur"
				blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+x8AAr8B3gzOjaQAAAAASUVORK5CYII="
			/>
		</SongThumbnailWrapper>
	);
}

export default SongThumbnail;
