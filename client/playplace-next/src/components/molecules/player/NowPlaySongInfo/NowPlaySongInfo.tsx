import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import NowPlayProgress from '@/components/atoms/player/NowPlayProgress/NowPlayProgress';
import NowPlaySongInfoContainer from './style';

function NowPlaySongInfo() {
	return (
		<NowPlaySongInfoContainer>
			<SongThumbnail src="" />
			<div id="song">
				<Text text="심" fontSize={24} />
				<Text text="디셈버" fontSize={18} color="gray" />
			</div>
			<NowPlayProgress />
		</NowPlaySongInfoContainer>
	);
}

export default NowPlaySongInfo;
