import { PlayModalType } from '@/types/play';
import { Song } from '@/types/songs';
import { YouTubePlayer } from 'react-youtube';
import { atom } from 'recoil';

/**
 * 플레이모달의 상태
 * @param none 모달 close
 * @param nowPlay 현재 재생화면
 * @param playlist 내 재생목록
 */
export const playModalState = atom<PlayModalType>({
	key: 'playModalState',
	default: 'none',
});

/**
 * 현재 노래 재생 중 상태
 */
export const isNowPlayState = atom<boolean>({
	key: 'isNowPlayState',
	default: false,
});

/**
 * 현재 재생 중인 노래 정보
 */
export const nowPlaySongState = atom<Song | null>({
	key: 'nowPlaySongState',
	default: {
		songId: 3,
		youtubeId: 'wtnC7HivieA',
		title: '작업 치과를 아세여?',
		artist: '마산대 작업치료과',
		albumImg: 'https://image.bugsm.co.kr/album/images/130/40883/4088350.jpg?version=20230706063943.0',
		playTime: 200,
	},
});

/**
 * 플레이백
 */
export const playbackState = atom<YouTubePlayer | null>({
	key: 'playbackState',
	default: null,
	dangerouslyAllowMutability: true,
});
