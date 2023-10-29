import React from 'react';
import NowPlayHeader from '@/components/molecules/player/NowPlayHeader/NowPlayHeader';
import NowPlaySongInfo from '@/components/molecules/player/NowPlaySongInfo/NowPlaySongInfo';
import NowPlayContainer from './style';

function NowPlay() {
	return (
		<NowPlayContainer>
			<NowPlayHeader />
			<NowPlaySongInfo />
		</NowPlayContainer>
	);
}

export default NowPlay;
