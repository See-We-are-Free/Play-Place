'use client';

import { nowPlaySongState, playbackState } from '@/recoil/play';
import { PlaybackType } from '@/types/play';
import { useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useRecoilState } from 'recoil';

function PlayBack() {
	const [, setPlayback] = useRecoilState(playbackState);
	const [nowPlaySong] = useRecoilState(nowPlaySongState);
	const playbackRef = useRef<PlaybackType | null>(null); // YouTube 플레이어 참조

	const opts = {
		width: '0',
		height: '0',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	const onPlayerReady: YouTubeProps['onReady'] = () => {
		if (playbackRef == null) {
			setPlayback(playbackRef);
		}
	};

	return (
		<YouTube
			key={nowPlaySong?.youtubeId}
			videoId={nowPlaySong?.youtubeId}
			opts={opts}
			ref={playbackRef}
			onReady={onPlayerReady}
		/>
	);
}

export default PlayBack;
