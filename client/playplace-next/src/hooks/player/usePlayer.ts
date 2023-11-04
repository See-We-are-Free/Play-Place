import { isNowPlayState, nowPlaySongState, playQueueState, playbackState } from '@/recoil/play';
import { useRecoilState } from 'recoil';

const usePlayer = () => {
	const [playback] = useRecoilState(playbackState);
	const [nowPlaySong, setNowPlaySong] = useRecoilState(nowPlaySongState);
	const [, setIsNowPlay] = useRecoilState(isNowPlayState);
	const [playQueue] = useRecoilState(playQueueState);

	// 다음곡
	const playNextSong = () => {
		if (!nowPlaySong) return;

		const nowIdx = playQueue.findIndex((e) => {
			if ('basicSongId' in e && 'basicSongId' in nowPlaySong) {
				return e.basicSongId === nowPlaySong.basicSongId;
			}
			if ('landmarkSongId' in e && 'landmarkSongId' in nowPlaySong) {
				return e.landmarkSongId === nowPlaySong.landmarkSongId;
			}
			return -1;
		});

		setNowPlaySong(playQueue[(nowIdx + 1) % playQueue.length]);
		setIsNowPlay(true);
		playback.seekTo(0);
	};

	// 이전 곡
	const playPreviousSong = () => {
		if (!nowPlaySong) return;

		const nowIdx = playQueue.findIndex((e) => {
			if ('basicSongId' in e && 'basicSongId' in nowPlaySong) {
				return e.basicSongId === nowPlaySong.basicSongId;
			}
			if ('landmarkSongId' in e && 'landmarkSongId' in nowPlaySong) {
				return e.landmarkSongId === nowPlaySong.landmarkSongId;
			}
			return -1;
		});

		setNowPlaySong(playQueue[nowIdx === 0 ? playQueue.length - 1 : nowIdx - 1]);
		setIsNowPlay(true);
		playback.seekTo(0);
	};

	// 재생
	const playSong = () => {
		playback.playVideo();
	};

	// 일시정지
	const pauseSong = () => {
		playback.pauseVideo();
	};

	return { playNextSong, playPreviousSong, playSong, pauseSong };
};

export default usePlayer;
