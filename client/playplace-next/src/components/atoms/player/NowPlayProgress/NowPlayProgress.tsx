import React from 'react';
import YouTube from 'react-youtube';
import NowPlayProgressWrapper from './style';

function NowPlayProgress() {
	return (
		<NowPlayProgressWrapper>
			<YouTube videoId="ZbWooNg4IMo" />
		</NowPlayProgressWrapper>
	);
}

export default NowPlayProgress;
