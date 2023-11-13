import { isNowPlayState, nowPlaySongState, playQueueState, playbackState } from '@/recoil/play';
import { Song } from '@/types/songs';
import { saveSongToPlaylistApi } from '@/utils/api/songs';
import { useRecoilState } from 'recoil';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import useFetchPlaylist from './useFetchPlaylist';

const usePlayer = () => {
	const { fetchData } = useFetchPlaylist();
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

	// 검색 결과 노래 재생시
	const playNewSong = async (song: Song, landmarkId?: number) => {
		const newSong: Song = {
			title: song.title,
			youtubeId: song.youtubeId,
			albumImg: song.albumImg,
			artist: song.artist,
			playTime: -1, // 이 값을 바꾸고싶어.
			songId: -1,
		};

		console.log('newSong :: ', JSON.stringify(newSong));
		setNowPlaySong(newSong);
		setIsNowPlay(true);

		try {
			const response = await saveSongToPlaylistApi(newSong);
			if (response.status === 200) {
				setNowPlaySong((state) => {
					if (state) return { basicSongId: response.data.playListSongId, ...state };
					return state;
				});
				fetchData();
				if (landmarkId) {
					CustomToast(ToastStyles.noTabbarSuccess, '1곡이 음악 재생목록에 담겼어요.');
				} else {
					CustomToast(ToastStyles.success, '1곡이 음악 재생목록에 담겼어요.');
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return { playNextSong, playPreviousSong, playSong, pauseSong, playNewSong };
};

export default usePlayer;
