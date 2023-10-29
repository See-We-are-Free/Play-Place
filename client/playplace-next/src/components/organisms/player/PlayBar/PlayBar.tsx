'use client';

import React from 'react';
import SongInfo from '@/components/molecules/player/PlayBarSongInfo/PlayBarSongInfo';
import PlayBarPlayControl from '@/components/molecules/player/PlayBarPlayControl/PlayBarPlayControl';
import PlayBarContainer from './style';

function PlayBar() {
	return (
		<PlayBarContainer>
			<SongInfo />
			<PlayBarPlayControl />
		</PlayBarContainer>
	);
}

export default PlayBar;
