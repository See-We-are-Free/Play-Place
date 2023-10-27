import React from 'react';
import SongThumbnailWrapper from './style';

interface ISongThumbnailProps {
	src: string;
	alt?: string;
}

function SongThumbnail(props: ISongThumbnailProps) {
	const { src, alt = '' } = props;
	return <SongThumbnailWrapper src={src} alt={alt} />;
}

export default SongThumbnail;
