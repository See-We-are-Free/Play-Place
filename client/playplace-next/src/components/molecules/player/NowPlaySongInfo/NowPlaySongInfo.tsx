import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import NowPlayProgress from '@/components/atoms/player/NowPlayProgress/NowPlayProgress';
import { useRecoilState } from 'recoil';
import { nowPlaySongState } from '@/recoil/play';
import NowPlaySongInfoContainer from './style';

function NowPlaySongInfo() {
	const [nowPlaySong] = useRecoilState(nowPlaySongState);

	return (
		<NowPlaySongInfoContainer>
			<div id="song">
				<SongThumbnail src={nowPlaySong?.albumImg || ''} $width={100} $isFullSize />
				<div id="text">
					<Text text={nowPlaySong?.title || ''} fontSize={24} />
					<Text text={nowPlaySong?.artist || ''} fontSize={18} color="gray" />
				</div>
			</div>
			<div id="progress">
				<NowPlayProgress />
			</div>
		</NowPlaySongInfoContainer>
	);
}

export default NowPlaySongInfo;
