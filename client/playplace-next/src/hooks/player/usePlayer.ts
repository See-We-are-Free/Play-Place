import { isNowPlayState, nowPlaySongState, playQueueState, playbackState } from '@/recoil/play';
import { useRecoilState } from 'recoil';

const usePlayer = () => {
	const [playback] = useRecoilState(playbackState);
	const [nowPlaySong, setNowPlaySong] = useRecoilState(nowPlaySongState);
	const [, setIsNowPlay] = useRecoilState(isNowPlayState);
	const [playQueue] = useRecoilState(playQueueState);

	// PlayQueue에서 현재 재생 중인 곡의 인덱스 찾기
	const findnowIdx = () => {
		if (!nowPlaySong) return -1;
		const nowIdx = playQueue.findIndex((e) => {
			if ('basicSongId' in e && 'basicSongId' in nowPlaySong) {
				return e.basicSongId === nowPlaySong.basicSongId;
			}
			if ('landmarkSongId' in e && 'landmarkSongId' in nowPlaySong) {
				return e.landmarkSongId === nowPlaySong.landmarkSongId;
			}
			return false;
		});

		return nowIdx;
	};

	// 다음 곡 재생
	const playNextSong = () => {
		if (!nowPlaySong) return;
		const nowIdx = findnowIdx();

		if (nowIdx !== -1) {
			setNowPlaySong(playQueue[(nowIdx + 1) % playQueue.length]);
			setIsNowPlay(true);
			playback.seekTo(0);
		}
	};

	// 이전 곡 재생
	const playPreviousSong = () => {
		if (!nowPlaySong) return;
		const nowIdx = findnowIdx();

		if (nowIdx !== -1) {
			setNowPlaySong(playQueue[nowIdx === 0 ? playQueue.length - 1 : nowIdx - 1]);
			setIsNowPlay(true);
			playback.seekTo(0);
		}
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
