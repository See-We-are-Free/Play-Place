import { NowPlayInfoType, PlayModalType } from '@/types/play';
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
 * 현재 노래 재생 상태
 */
export const nowPlayInfoState = atom<NowPlayInfoType>({
	key: 'nowPlayState',
	default: {
		isPlaying: false,
		songPlaying: null,
	},
});
