import React from 'react';
import thumbnail from '@root/public/assets/images/thumbnail.png';
import SongThumbnailWrapper from './style';

interface ISongThumbnailProps {
	src: string;
	alt?: string;
}
function SongThumbnail(props: ISongThumbnailProps) {
	const { src, alt = '' } = props;

	return <SongThumbnailWrapper src={src || thumbnail} alt={alt} width={1000} height={1000} />;
}

export default SongThumbnail;
