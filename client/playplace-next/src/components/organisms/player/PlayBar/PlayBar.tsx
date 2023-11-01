'use client';

import React from 'react';
import SongInfo from '@/components/molecules/player/PlayBarSongInfo/PlayBarSongInfo';
import PlayBarPlayControl from '@/components/molecules/player/PlayBarPlayControl/PlayBarPlayControl';
import useTabbarRender from '@/hooks/useTabbarRender';
import PlayBarContainer from './style';

function PlayBar() {
	if (useTabbarRender())
		return (
			<PlayBarContainer>
				<SongInfo />
				<PlayBarPlayControl />
			</PlayBarContainer>
		);
	return <></>;
}

export default PlayBar;
