'use client';

import { isNowPlayState, nowPlaySongState, playbackState } from '@/recoil/play';
import { PlaybackType } from '@/types/play';
import { BasicSong, LandmarkSong, Song } from '@/types/songs';
import { getLatestSongApi, saveNowPlaySongApi } from '@/utils/api/songs';
import { useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useRecoilState } from 'recoil';

function PlayBack() {
	const [isNowPlay, setIsNowPlay] = useRecoilState(isNowPlayState);
	const [, setPlayback] = useRecoilState(playbackState);
	const [nowPlaySong, setNowPlaySong] = useRecoilState(nowPlaySongState);
	const playbackRef = useRef<PlaybackType | null>(null); // YouTube 플레이어 참조

	const opts = {
		width: '0',
		height: '0',
		playerVar: {},
	};

	const onPlayerReady: YouTubeProps['onReady'] = (event) => {
		console.log(nowPlaySong);
		setPlayback(event.target);
		if (isNowPlay) event.target.playVideo();
	};

	const onPlay: YouTubeProps['onPlay'] = async (event) => {
		// TODO : 현재 재생중인 음악정보 서버로 보내기
		setPlayback(event.target);
		setIsNowPlay(true);

		let isLandmark = false;
		let playlistSongId = -1;

		console.log(nowPlaySong);
		if (nowPlaySong) {
			if ('landmarkSongId' in nowPlaySong) {
				isLandmark = true;
				playlistSongId = nowPlaySong.landmarkSongId as number;
			} else if ('basicSongId' in nowPlaySong) {
				isLandmark = false;
				playlistSongId = nowPlaySong.basicSongId as number;
			}
		}

		try {
			if (playlistSongId !== -1) {
				const response = await saveNowPlaySongApi({ isLandmark, playlistSongId });
				console.log(response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onPause: YouTubeProps['onPause'] = () => {
		setIsNowPlay(false);
	};

	const fetchLatestSongData = async () => {
		try {
			const response = await getLatestSongApi();

			if (response.status === 200) {
				if (response.data.landmark) {
					const song: LandmarkSong = {
						...response.data,
						landmarkSongId: response.data.playListSongId,
					};
					setNowPlaySong(song);
				} else {
					const song: BasicSong = {
						...response.data,
						basicSongId: response.data.playListSongId,
					};
					setNowPlaySong(song);
				}
			} else if (response.status === 204) {
				const emptySong: Song = {
					title: '현재 재생중인 곡이 없습니다.',
					artist: '',
					albumImg: '',
					playTime: 0,
					songId: -1,
					youtubeId: '',
				};
				setNowPlaySong(emptySong);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchLatestSongData();
	}, []);

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
