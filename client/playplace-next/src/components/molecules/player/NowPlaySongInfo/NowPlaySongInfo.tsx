import React, { useState, useEffect, useRef } from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import NowPlayProgress from '@/components/atoms/player/NowPlayProgress/NowPlayProgress';
import { useRecoilState } from 'recoil';
import { nowPlaySongState } from '@/recoil/play';
import { checkTextOverflow } from '@/components/atoms/Text/style';
import NowPlaySongInfoContainer, { NowPlaySongTitle } from './style';

function NowPlaySongInfo() {
	const [nowPlaySong] = useRecoilState(nowPlaySongState);
	const textRef = useRef(null);
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setAnimate(checkTextOverflow(textRef));
	}, []);

	return (
		<NowPlaySongInfoContainer>
			<div id="song">
				<SongThumbnail src={nowPlaySong?.albumImg || ''} $width={100} $isFullSize />
				<div id="text">
					<NowPlaySongTitle>
						<Text ref={textRef} text={nowPlaySong?.title || ''} fontSize={24} $textSlide={animate} />
					</NowPlaySongTitle>
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
