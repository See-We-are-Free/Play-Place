import { LandmarkGroup } from '@/types/play';
import { BasicSong } from '@/types/songs';
import { atom } from 'recoil';

/**
 * 기본 그룹의 노래 목록
 */
export const basicSongsState = atom<BasicSong[]>({
	key: 'basicSongsState',
	default: [],
});

export const landmarkGroupsState = atom<LandmarkGroup[]>({
	key: 'landmarkGroupsState',
	default: [],
});
