import { isNowPlayState, nowPlaySongState, playbackState } from '@/recoil/play';
import { useRecoilState } from 'recoil';

const usePlayer = () => {
	const [playback] = useRecoilState(playbackState);
	const [, setNowPlaySong] = useRecoilState(nowPlaySongState);
	const [, setIsNowPlay] = useRecoilState(isNowPlayState);

	// 다음곡
	const playNextSong = () => {
		// TODO : 재생 목록에서 현재 재생 중인 곡의 다음 곡을 찾아옴. Song
		setNowPlaySong({
			youtubeId: 'dmEU6-UQSgU',
			title: '사랑이라 믿었던 것들은',
			songId: 1,
			playTime: 400,
			basicSongId: 1,
			albumImg: 'https://image.bugsm.co.kr/album/images/500/40841/4084173.jpg',
			artist: '서동현',
		});
		setIsNowPlay(true);
	};

	// 이전 곡
	const playPreviousSong = () => {
		// TODO : 재생 목록에서 현재 재생 중인 곡의 이전 곡을 찾아옴. Song
		setNowPlaySong({
			youtubeId: 'XBVauz0iN8c',
			title: 'LoveLee',
			songId: 2,
			playTime: 360,
			basicSongId: 2,
			albumImg: 'https://image.bugsm.co.kr/album/images/500/40903/4090354.jpg',
			artist: 'AKMU',
		});
		setIsNowPlay(true);
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
