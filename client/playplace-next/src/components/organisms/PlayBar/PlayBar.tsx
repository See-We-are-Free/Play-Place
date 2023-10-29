'use client';

import React from 'react';
import SongInfo from '@/components/molecules/SongInfo/SongInfo';
import PlayBarMenu from '@/components/molecules/PlayBarMenu/PlayBarMenu';
import PlayBarContainer from './style';

function PlayBar() {
	return (
		<PlayBarContainer>
			<SongInfo />
			<PlayBarMenu />
		</PlayBarContainer>
	);
}

export default PlayBar;
