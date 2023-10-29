import React from 'react';
import NowPlayHeader from '@/components/molecules/player/NowPlayHeader/NowPlayHeader';
import NowPlayContainer from './style';

function NowPlay() {
	return (
		<NowPlayContainer>
			<NowPlayHeader />
		</NowPlayContainer>
	);
}

export default NowPlay;
