'use client';

import { isNowPlayState, nowPlaySongState, playbackState } from '@/recoil/play';
import { PlaybackType } from '@/types/play';
import { useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useRecoilState } from 'recoil';

function PlayBack() {
	const [isNowPlay, setIsNowPlay] = useRecoilState(isNowPlayState);
	const [, setPlayback] = useRecoilState(playbackState);
	const [nowPlaySong] = useRecoilState(nowPlaySongState);
	const playbackRef = useRef<PlaybackType | null>(null); // YouTube 플레이어 참조

	const opts = {
		width: '0',
		height: '0',
		playerVar: {},
	};

	const onPlayerReady: YouTubeProps['onReady'] = (event) => {
		setPlayback(event.target);
		if (isNowPlay) event.target.playVideo();
	};

	const onPlay: YouTubeProps['onPlay'] = () => {
		// TODO : 현재 재생중인 음악정보 서버로 보내기
		setIsNowPlay(true);
	};

	const onPause: YouTubeProps['onPause'] = () => {
		setIsNowPlay(false);
	};

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
