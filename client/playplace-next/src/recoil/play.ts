import { PlayModalType, PlaybackType } from '@/types/play';
import { Song } from '@/types/songs';
import { MutableRefObject } from 'react';
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
	default: null,
});

/**
 * 플레이백
 */
export const playbackState = atom<MutableRefObject<PlaybackType | null> | null>({
	key: 'playbackState',
	default: null,
});
