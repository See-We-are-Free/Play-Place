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
		width: '70',
		height: '70',
	};

	const onPlayerReady: YouTubeProps['onReady'] = (event) => {
		setPlayback(event.target);
		event.target.playVideo();
	};

	const onPlay: YouTubeProps['onPlay'] = (event) => {};

	const onPause: YouTubeProps['onPause'] = (event) => {};

	return (
		<YouTube
			key={nowPlaySong?.youtubeId}
			videoId={nowPlaySong?.youtubeId}
			opts={opts}
			ref={playbackRef}
			onReady={onPlayerReady}
			onPlay={onPlay}
			onPause={onPause}
		/>
	);
}

export default PlayBack;
